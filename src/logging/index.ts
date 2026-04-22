// src/logging/index.ts
import { canonicalFormatter } from './format'
import {
  createLogger,
  type LogCause,
  type LogEvent,
  type LogLevel,
  type Logger,
} from './logger'
import { getOrCreateBrowserSessionId } from './context/ids'
import { createConsoleSink } from './sinks/consoleSink'

export * from './logger'
export * from './format'
export * from './context/ids'
export * from './sinks/consoleSink'

type ClientLogging = {
  logger: Logger
  sessionId: string
}

let client: ClientLogging | null = null
let hooksInstalled = false

const noop: Logger = {
  withContext: () => noop,
  setRenderId: () => {},
  debug: () => {},
  info: () => {},
  warn: () => {},
  error: () => {},
  event: () => {},
}

const toRuntimeCauses = (
  error: unknown,
  detail?: Record<string, unknown>
): LogCause[] => {
  const fields =
    detail &&
    Object.fromEntries(
      Object.entries(detail).map(([key, value]) => [
        key,
        value === undefined
          ? undefined
          : value === null ||
              typeof value === 'string' ||
              typeof value === 'number' ||
              typeof value === 'boolean'
            ? value
            : String(value),
      ])
    )

  if (error instanceof Error) {
    if (error.name === 'SecurityError') {
      return [
        {
          code: 'SECURITY_ERROR',
          name: error.name,
          message: error.message,
          hint: 'check browser security context',
          detail: fields,
        },
      ]
    }

    if (error.name === 'TypeError') {
      return [
        {
          code: 'RUNTIME_ERROR',
          name: error.name,
          message: error.message,
          hint: 'inspect runtime state and failing callsite',
          detail: fields,
        },
      ]
    }

    if (error.name === 'RangeError') {
      return [
        {
          code: 'RUNTIME_ERROR',
          name: error.name,
          message: error.message,
          hint: 'inspect runtime bounds and derived values',
          detail: fields,
        },
      ]
    }

    return [
      {
        code: 'RUNTIME_ERROR',
        name: error.name,
        message: error.message,
        hint: 'inspect stack and runtime context',
        detail: fields,
      },
    ]
  }

  return [
    {
      code: 'RUNTIME_ERROR',
      name: 'NonError',
      message: String(error),
      hint: 'inspect rejection payload or thrown runtime value',
      detail: fields,
    },
  ]
}

export const initClientLogging = (options: {
  app: string
  minLevel?: LogLevel
}): ClientLogging => {
  if (typeof window === 'undefined') {
    return {
      logger: noop,
      sessionId: 'server',
    }
  }

  if (client) return client

  const sessionId = getOrCreateBrowserSessionId()

  const logger = createLogger({
    app: options.app,
    sessionId,
    minLevel:
      options.minLevel ??
      (process.env.NODE_ENV === 'production' ? 'error' : 'debug'),
    formatter: canonicalFormatter,
    sinks: [createConsoleSink()],
    baseContext: {
      cat: 'app',
      phase: 'init',
    },
  })

  client = { logger, sessionId }

  if (!hooksInstalled) {
    hooksInstalled = true

    const runtimeLogger = logger.withContext({
      cat: 'runtime',
      phase: 'fail',
    })

    const onError = (event: ErrorEvent) => {
      const runtimeError = event.error ?? event.message

      runtimeLogger.error(
        'runtime_window_error',
        runtimeError,
        {
          source: 'window.error',
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
        toRuntimeCauses(runtimeError, {
          source: 'window.error',
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        })
      )
    }

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      runtimeLogger.error(
        'runtime_unhandled_rejection',
        event.reason,
        {
          source: 'window.unhandledrejection',
          reasonType:
            event.reason !== null && typeof event.reason === 'object'
              ? 'object'
              : typeof event.reason,
        },
        toRuntimeCauses(event.reason, {
          source: 'window.unhandledrejection',
          reasonType:
            event.reason !== null && typeof event.reason === 'object'
              ? 'object'
              : typeof event.reason,
        })
      )
    }

    window.addEventListener('error', onError)
    window.addEventListener('unhandledrejection', onUnhandledRejection)

    if (process.env.NODE_ENV !== 'production') {
      ;(
        globalThis as { __portfolioLogs?: { emit: (event: LogEvent) => void } }
      ).__portfolioLogs = {
        emit: (event: LogEvent) => {
          const line = canonicalFormatter.toLine(event)
          createConsoleSink().write(event, line)
        },
      }
    }
  }

  logger.info('client_logging_ready', {
    sessionId,
    minLevel:
      options.minLevel ??
      (process.env.NODE_ENV === 'production' ? 'error' : 'debug'),
  })

  return client
}

export const getClientLogger = (): Logger => client?.logger ?? noop
export const getClientSessionId = (): string | undefined => client?.sessionId
