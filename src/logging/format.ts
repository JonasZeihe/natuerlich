// src/logging/format.ts
import type { JsonValue, LogEvent, LogFormatter } from './logger'

const encodeValue = (value: JsonValue): string => {
  if (typeof value === 'string') {
    return value.includes(' ') ? JSON.stringify(value) : value
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }

  if (value === null) {
    return 'null'
  }

  return JSON.stringify(value)
}

export const canonicalFormatter: LogFormatter = {
  toLine: (event: LogEvent) => {
    const parts: string[] = [
      '[portfolio]',
      `t=${event.t}`,
      `lvl=${event.lvl.toUpperCase()}`,
      `app=${event.ctx.app}`,
      `session=${event.ctx.sessionId}`,
      `cat=${event.ctx.cat}`,
      `phase=${event.ctx.phase}`,
      `msg=${event.msg.includes(' ') ? JSON.stringify(event.msg) : event.msg}`,
    ]

    if (event.ctx.renderId) {
      parts.push(`render=${event.ctx.renderId}`)
    }

    if (event.err) {
      parts.push(`err=${event.err.name}`)
      parts.push(
        `errMsg=${event.err.message.includes(' ') ? JSON.stringify(event.err.message) : event.err.message}`
      )
    }

    if (event.causes?.length) {
      event.causes.forEach((cause, index) => {
        parts.push(`cause${index}=${cause.code}`)
        if (cause.hint) {
          parts.push(`hint${index}=${cause.hint}`)
        }
      })
    }

    const fields = event.ctx.fields ?? {}
    Object.keys(fields)
      .sort()
      .forEach((key) => {
        const value = fields[key]
        if (value === undefined) return
        parts.push(`${key}=${encodeValue(value)}`)
      })

    return parts.join(' ')
  },
}
