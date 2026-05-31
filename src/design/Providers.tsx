// src/design/Providers.tsx
'use client'

import React, { useMemo } from 'react'
import { ThemeProvider, type DefaultTheme } from 'styled-components'
import GlobalStyles from '@/design/global'
import experienceTheme from '@/design/theme'

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (value === null || typeof value !== 'object') return false
  const prototype = Object.getPrototypeOf(value)
  return prototype === Object.prototype || prototype === null
}

const failLoudProxy = <T extends object>(source: T, prefix = ''): T =>
  new Proxy(source, {
    get(target, property, receiver) {
      if (typeof property === 'symbol') {
        return Reflect.get(target, property, receiver)
      }

      if (property in target) {
        const value = Reflect.get(target, property, receiver)

        if (
          typeof value === 'function' ||
          Array.isArray(value) ||
          value instanceof Date ||
          value === null
        ) {
          return value
        }

        if (isPlainObject(value)) {
          return failLoudProxy(value, `${prefix}${String(property)}.`)
        }

        return value
      }

      throw new Error(`Missing design key: ${prefix}${String(property)}`)
    },
  }) as T

export default function Providers({ children }: { children: React.ReactNode }) {
  const theme = useMemo<DefaultTheme>(
    () =>
      process.env.NODE_ENV === 'production'
        ? experienceTheme
        : failLoudProxy(experienceTheme),
    []
  )

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  )
}
