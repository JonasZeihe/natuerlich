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

const hasMessagePart = (value: string, parts: string[]) =>
  parts.some((part) => value.includes(part))

export const classifyErrorToCauses = (
  error: unknown,
  detail?: unknown
): LogCause[] => {
  const name = errorName(error)
  const message = errorMessage(error)
  const normalizedName = name.toLowerCase()
  const normalizedMessage = message.toLowerCase()
  const safeDetail = sanitizeFields(detail)
  const componentStack =
    safeDetail && typeof safeDetail.componentStack === 'string'
      ? safeDetail.componentStack
      : ''

  if (
    name === 'SecurityError' ||
    normalizedName.includes('security') ||
    normalizedMessage.includes('security')
  ) {
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

  if (
    hasMessagePart(normalizedMessage, [
      'missing theme key',
      'must be used within',
    ]) ||
    hasMessagePart(normalizedName, ['invariant', 'context'])
  ) {
    return [
      {
        code: 'CONTEXT_ERROR',
        name,
        message,
        hint: 'inspect provider composition and missing context assumptions',
        detail: safeDetail,
      },
    ]
  }

  if (
    hasMessagePart(normalizedMessage, [
      'target',
      'scroll',
      'replaceState'.toLowerCase(),
      'replace state',
      'history',
      'navigation',
    ])
  ) {
    return [
      {
        code: 'NAVIGATION_ERROR',
        name,
        message,
        hint: 'inspect target lookup, scroll fallback and history sync',
        detail: safeDetail,
      },
    ]
  }

  if (componentStack) {
    return [
      {
        code: 'BOUNDARY_ERROR',
        name,
        message,
        hint: 'inspect component stack and failing render branch',
        detail: safeDetail,
      },
    ]
  }

  if (name === 'TypeError') {
    return [
      {
        code: 'INTEGRITY_ERROR',
        name,
        message,
        hint: 'inspect missing values, invalid access or broken assumptions',
        detail: safeDetail,
      },
    ]
  }

  if (name === 'RangeError') {
    return [
      {
        code: 'INTEGRITY_ERROR',
        name,
        message,
        hint: 'inspect bounds and derived values',
        detail: safeDetail,
      },
    ]
  }

  if (
    hasMessagePart(normalizedMessage, [
      'hydrate',
      'hydration',
      'render',
      'hook',
      'hooks',
    ]) ||
    hasMessagePart(normalizedName, ['render'])
  ) {
    return [
      {
        code: 'RENDER_ERROR',
        name,
        message,
        hint: 'inspect render branch, hydration state and hook usage',
        detail: safeDetail,
      },
    ]
  }

  return [
    {
      code: 'RUNTIME_ERROR',
      name,
      message,
      hint: 'inspect stack and local runtime state',
      detail: safeDetail,
    },
  ]
}
