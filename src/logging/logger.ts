// src/logging/logger.ts
export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export type LogCategory =
  | 'app'
  | 'theme'
  | 'ui'
  | 'navigation'
  | 'modal'
  | 'runtime'
  | 'performance'

export type LogPhase =
  | 'init'
  | 'enter'
  | 'toggle'
  | 'open'
  | 'close'
  | 'scroll'
  | 'fail'
  | 'done'
  | 'note'

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue }

export type LogFields = Record<string, JsonValue | undefined>

export type LogCause = {
  code: 'TYPE_ERROR' | 'RANGE_ERROR' | 'SECURITY_ERROR' | 'UNKNOWN_ERROR'
  name?: string
  message?: string
  hint?: string
  detail?: LogFields
}

export type ErrorShape = {
  name: string
  message: string
  stack?: string
}

export type LogContext = {
  app: string
  sessionId: string
  renderId?: string
  cat: LogCategory
  phase: LogPhase
  fields?: LogFields
}

export type LogEvent = {
  t: string
  lvl: LogLevel
  ctx: LogContext
  msg: string
  err?: ErrorShape
  causes?: LogCause[]
}

export type LogFormatter = {
  toLine: (event: LogEvent) => string
}

export type LogSink = {
  write: (event: LogEvent, line: string) => void
}

export type LoggerConfig = {
  app: string
  sessionId: string
  minLevel?: LogLevel
  formatter: LogFormatter
  sinks: LogSink[]
  baseContext?: Partial<Omit<LogContext, 'app' | 'sessionId'>>
}

const levelOrder: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
}

const mergeContext = (
  base: LogContext,
  patch?: Partial<LogContext>
): LogContext => ({
  ...base,
  ...(patch ?? {}),
  fields: {
    ...(base.fields ?? {}),
    ...(patch?.fields ?? {}),
  },
})

export const toErrorShape = (err: unknown): ErrorShape | undefined => {
  if (!err) return undefined

  if (err instanceof Error) {
    return {
      name: err.name,
      message: err.message,
      stack: err.stack,
    }
  }

  if (typeof err === 'object' && err !== null) {
    const record = err as Record<string, unknown>
    return {
      name: typeof record.name === 'string' ? record.name : 'NonError',
      message:
        typeof record.message === 'string'
          ? record.message
          : JSON.stringify(record),
      stack: typeof record.stack === 'string' ? record.stack : undefined,
    }
  }

  return {
    name: 'NonError',
    message: String(err),
  }
}

export type Logger = {
  withContext: (patch: Partial<LogContext>) => Logger
  setRenderId: (renderId?: string) => void
  debug: (msg: string, fields?: LogFields) => void
  info: (msg: string, fields?: LogFields) => void
  warn: (msg: string, fields?: LogFields) => void
  error: (
    msg: string,
    err?: unknown,
    fields?: LogFields,
    causes?: LogCause[]
  ) => void
  event: (args: {
    lvl: LogLevel
    msg: string
    ctx?: Partial<LogContext>
    fields?: LogFields
    err?: unknown
    causes?: LogCause[]
  }) => void
}

export const createLogger = (config: LoggerConfig): Logger => {
  const minLevel = config.minLevel ?? 'info'
  let baseContext: LogContext = {
    app: config.app,
    sessionId: config.sessionId,
    cat: 'app',
    phase: 'note',
    ...(config.baseContext ?? {}),
  }

  const shouldEmit = (lvl: LogLevel) => levelOrder[lvl] >= levelOrder[minLevel]

  const emit = (event: LogEvent) => {
    if (!shouldEmit(event.lvl)) return
    const line = config.formatter.toLine(event)
    for (const sink of config.sinks) {
      sink.write(event, line)
    }
  }

  const build = (localContext?: Partial<LogContext>): Logger => {
    const childBase = mergeContext(baseContext, localContext)

    return {
      withContext: (patch) => build(mergeContext(childBase, patch)),
      setRenderId: (renderId) => {
        baseContext = mergeContext(baseContext, { renderId })
      },
      debug: (msg, fields) =>
        emit({
          t: new Date().toISOString(),
          lvl: 'debug',
          msg,
          ctx: mergeContext(childBase, { fields }),
        }),
      info: (msg, fields) =>
        emit({
          t: new Date().toISOString(),
          lvl: 'info',
          msg,
          ctx: mergeContext(childBase, { fields }),
        }),
      warn: (msg, fields) =>
        emit({
          t: new Date().toISOString(),
          lvl: 'warn',
          msg,
          ctx: mergeContext(childBase, { fields }),
        }),
      error: (msg, err, fields, causes) =>
        emit({
          t: new Date().toISOString(),
          lvl: 'error',
          msg,
          ctx: mergeContext(childBase, { fields }),
          err: toErrorShape(err),
          causes,
        }),
      event: ({ lvl, msg, ctx, fields, err, causes }) =>
        emit({
          t: new Date().toISOString(),
          lvl,
          msg,
          ctx: mergeContext(childBase, { ...(ctx ?? {}), fields }),
          err: toErrorShape(err),
          causes,
        }),
    }
  }

  return build()
}
