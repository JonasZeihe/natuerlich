// src/logging/index.ts
import { canonicalFormatter } from './format'
import {
  createLogger,
  type LogLevel,
  type Logger,
  type LogEvent,
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
      (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
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
    })

    const onError = (event: ErrorEvent) => {
      runtimeLogger.error('window_error', event.error ?? event.message, {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      })
    }

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      runtimeLogger.error('unhandled_rejection', event.reason, {
        reasonType:
          event.reason !== null && typeof event.reason === 'object'
            ? 'object'
            : typeof event.reason,
      })
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

  logger.info('logging_ready', { sessionId })

  return client
}

export const getClientLogger = (): Logger => client?.logger ?? noop
export const getClientSessionId = (): string | undefined => client?.sessionId
