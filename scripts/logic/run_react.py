#!/usr/bin/env python
# (C) 2025 Jonas Zeihe, MIT License. Developer: Jonas Zeihe. Contact: JonasZeihe@gmail.com

import csv
import datetime
import io
import json
import os
import platform
import re
import shutil
import socket
import subprocess
import sys


def resolve_npm_command():
    return "npm.cmd" if platform.system() == "Windows" else "npm"


def find_project_root():
    current = os.path.abspath(os.path.dirname(__file__))

    while True:
        if os.path.isfile(os.path.join(current, "package.json")):
            return current

        parent = os.path.dirname(current)

        if parent == current:
            return None

        current = parent


def load_package_json(root):
    package_json_path = os.path.join(root, "package.json")

    try:
        with open(package_json_path, "r", encoding="utf-8") as file:
            return json.load(file)
    except (OSError, json.JSONDecodeError):
        return None


def resolve_run_command(package_json):
    scripts = package_json.get("scripts", {})

    if "dev" in scripts:
        return ["run", "dev"], "dev", scripts["dev"]

    if "start" in scripts:
        return ["run", "start"], "start", scripts["start"]

    return None, None, None


def is_port_free(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.settimeout(0.2)
        return sock.connect_ex(("127.0.0.1", port)) != 0


def resolve_preferred_port():
    value = os.environ.get("PORT", "3000")

    try:
        port = int(value)
        return port if 1 <= port <= 65535 else 3000
    except ValueError:
        return 3000


def inspect_port_windows(port):
    try:
        result = subprocess.run(
            ["netstat", "-ano", "-p", "tcp"],
            capture_output=True,
            text=True,
            check=False,
        )
    except OSError:
        return []

    matches = []

    for raw_line in result.stdout.splitlines():
        line = raw_line.strip()

        if "LISTENING" not in line.upper():
            continue

        parts = re.split(r"\s+", line)

        if len(parts) < 5:
            continue

        local_address = parts[1]
        pid = parts[-1]

        if not re.search(rf":{port}$", local_address):
            continue

        process_name = "unknown"

        try:
            tasklist = subprocess.run(
                ["tasklist", "/FI", f"PID eq {pid}", "/FO", "CSV", "/NH"],
                capture_output=True,
                text=True,
                check=False,
            )
            rows = list(csv.reader(io.StringIO(tasklist.stdout.strip())))
            if rows and rows[0] and "No tasks are running" not in rows[0][0]:
                process_name = rows[0][0]
        except OSError:
            process_name = "unknown"

        matches.append(f"PID {pid} ({process_name})")

    return list(dict.fromkeys(matches))


def inspect_port_macos(port):
    try:
        result = subprocess.run(
            ["lsof", "-nP", f"-iTCP:{port}", "-sTCP:LISTEN"],
            capture_output=True,
            text=True,
            check=False,
        )
    except OSError:
        return []

    matches = []

    for index, raw_line in enumerate(result.stdout.splitlines()):
        if index == 0:
            continue

        parts = re.split(r"\s+", raw_line.strip())

        if len(parts) < 2:
            continue

        command = parts[0]
        pid = parts[1]
        matches.append(f"PID {pid} ({command})")

    return list(dict.fromkeys(matches))


def inspect_port(port):
    system_name = platform.system()

    if system_name == "Windows":
        return inspect_port_windows(port)

    if system_name == "Darwin":
        return inspect_port_macos(port)

    return []


def resolve_port():
    port = resolve_preferred_port()
    occupied = []

    while not is_port_free(port):
        details = inspect_port(port)
        reason = ", ".join(details) if details else "occupied by unknown process"
        occupied.append((port, reason))
        port += 1

        if port > 65535:
            raise RuntimeError("No free port available.")

    return port, occupied


def build_command(npm_cmd, npm_args, script_command, port):
    command = [npm_cmd, *npm_args]
    lowered = script_command.lower()

    if "next " in lowered or lowered.startswith("next"):
        return [*command, "--", "--port", str(port)]

    if "vite" in lowered:
        return [*command, "--", "--port", str(port)]

    return command


def extract_port(line):
    patterns = (
        r"http://(?:localhost|127\.0\.0\.1):(\d+)",
        r"https://(?:localhost|127\.0\.0\.1):(\d+)",
        r"\blocalhost:(\d+)\b",
        r"\b127\.0\.0\.1:(\d+)\b",
        r"\bport\s+(\d+)\b",
    )

    for pattern in patterns:
        match = re.search(pattern, line, re.IGNORECASE)
        if match:
            return match.group(1)

    return None


def main():
    root = find_project_root()

    if root is None:
        print("package.json not found.")
        sys.exit(1)

    os.chdir(root)

    package_json = load_package_json(root)

    if package_json is None:
        print("Failed to read package.json.")
        sys.exit(1)

    npm_cmd = resolve_npm_command()

    if shutil.which(npm_cmd) is None:
        print("npm not found in PATH. Please install Node.js or add npm to PATH.")
        sys.exit(1)

    npm_args, script_name, script_command = resolve_run_command(package_json)

    if npm_args is None:
        print(
            'No supported npm script found. Expected "dev" or "start" in package.json.'
        )
        sys.exit(1)

    timestamp = datetime.datetime.now().strftime("%Y-%m-%dT%H-%M")
    logfile = f"01_start_log_{timestamp}.txt"
    project_name = os.path.basename(root.rstrip(os.sep)) or root

    try:
        selected_port, occupied_ports = resolve_port()
    except RuntimeError as error:
        print(str(error))
        sys.exit(1)

    env = os.environ.copy()
    env["PORT"] = str(selected_port)
    command = build_command(npm_cmd, npm_args, script_command, selected_port)

    with open(logfile, "w", encoding="utf-8", buffering=1) as log:
        header = [
            f"Starting App: {project_name}",
            "========================",
            timestamp,
            f"Root: {root}",
            f"Log: {logfile}",
            f"Script: {script_name}",
            f"Command: {' '.join(command)}",
            f"Selected port: {selected_port}",
            "========================",
        ]

        for line in header:
            print(line)
            log.write(f"{line}\n")

        if occupied_ports:
            print("Occupied ports before start:")
            log.write("Occupied ports before start:\n")

            for port, reason in occupied_ports:
                line = f"  {port} -> {reason}"
                print(line)
                log.write(f"{line}\n")

            print("========================")
            log.write("========================\n")

        try:
            process = subprocess.Popen(
                command,
                cwd=root,
                env=env,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                bufsize=1,
            )
        except OSError:
            print("Failed to start npm.")
            log.write("Failed to start npm.\n")
            sys.exit(1)

        detected_port = None

        if process.stdout is None:
            print("Failed to capture process output.")
            log.write("Failed to capture process output.\n")
            process.terminate()
            sys.exit(1)

        print(f"Active port: {selected_port}")
        log.write(f"Active port: {selected_port}\n")

        for line in process.stdout:
            print(line, end="")
            log.write(line)

            if detected_port is None:
                port = extract_port(line)

                if port is not None:
                    detected_port = port

                    if str(selected_port) != detected_port:
                        port_line = f"Active port: {detected_port}"
                        print(port_line)
                        log.write(f"{port_line}\n")

        return_code = process.wait()

        if return_code == 0:
            print("App stopped successfully.")
            log.write("App stopped successfully.\n")
            return

        print(
            f"Error occurred while starting or running the app. Check the log file: {logfile}"
        )
        log.write("Error occurred while starting or running the app.\n")
        sys.exit(return_code)


if __name__ == "__main__":
    main()
