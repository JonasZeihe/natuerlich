// src/errorhandling/errorTypes.ts
import type { LogCause, LogFields } from '@/logging'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object'

const toJsonValue = (value: unknown): LogFields[string] => {
  if (value === undefined) return undefined
  if (value === null) return null
  if (typeof value === 'string') return value
  if (typeof value === 'number')
    return Number.isFinite(value) ? value : String(value)
  if (typeof value === 'boolean') return value

  if (Array.isArray(value)) {
    return value.map((item) => toJsonValue(item) ?? null)
  }

  if (isRecord(value)) {
    const result: Record<string, string | number | boolean | null | unknown[]> =
      {}
    Object.keys(value).forEach((key) => {
      result[key] = (toJsonValue(value[key]) ?? null) as
        | string
        | number
        | boolean
        | null
        | unknown[]
    })
    return result as LogFields[string]
  }

  return String(value)
}

const sanitizeFields = (value: unknown): LogFields | undefined => {
  if (!isRecord(value)) return undefined

  const result: LogFields = {}
  Object.keys(value).forEach((key) => {
    result[key] = toJsonValue(value[key])
  })
  return result
}

const errorName = (error: unknown): string => {
  if (error instanceof Error) return error.name
  if (isRecord(error) && typeof error.name === 'string') return error.name
  return 'NonError'
}

const errorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message
  if (isRecord(error) && typeof error.message === 'string') return error.message
  return String(error)
}

export const classifyErrorToCauses = (
  error: unknown,
  detail?: unknown
): LogCause[] => {
  const name = errorName(error)
  const message = errorMessage(error)
  const normalized = message.toLowerCase()
  const safeDetail = sanitizeFields(detail)

  if (name === 'SecurityError' || normalized.includes('security')) {
    return [
      {
        code: 'SECURITY_ERROR',
        name,
        message,
        hint: 'check browser security context',
        detail: safeDetail,
      },
    ]
  }

  if (name === 'TypeError') {
    return [
      {
        code: 'TYPE_ERROR',
        name,
        message,
        hint: 'inspect runtime state',
        detail: safeDetail,
      },
    ]
  }

  if (name === 'RangeError') {
    return [
      {
        code: 'RANGE_ERROR',
        name,
        message,
        hint: 'inspect value bounds',
        detail: safeDetail,
      },
    ]
  }

  return [
    {
      code: 'UNKNOWN_ERROR',
      name,
      message,
      hint: 'inspect stack and component state',
      detail: safeDetail,
    },
  ]
}
