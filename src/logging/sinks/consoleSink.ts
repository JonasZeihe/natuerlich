// src/logging/sinks/consoleSink.ts
import type { LogEvent, LogSink } from '../logger'

const getConsole = (): Console | undefined => {
  return (globalThis as { console?: Console }).console
}

const pickWriter = (
  level: LogEvent['lvl'],
  consoleObject: Console
): ((...args: unknown[]) => void) => {
  if (level === 'error') return consoleObject.error.bind(consoleObject)
  if (level === 'warn') return consoleObject.warn.bind(consoleObject)
  return consoleObject.log.bind(consoleObject)
}

export const createConsoleSink = (): LogSink => ({
  write: (event: LogEvent, line: string) => {
    const consoleObject = getConsole()
    if (!consoleObject) return

    const writer = pickWriter(event.lvl, consoleObject)
    writer(line)
  },
})
