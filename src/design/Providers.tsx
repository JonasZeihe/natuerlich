// src/design/Providers.tsx
'use client'

import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { ThemeProvider, type DefaultTheme } from 'styled-components'
import GlobalStyles from '@/design/global'
import experienceTheme from '@/design/theme'
import { initClientLogging } from '@/logging'

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

      throw new Error(`Missing theme key: ${prefix}${String(property)}`)
    },
  }) as T

const applyExperienceThemeToDom = () => {
  document.documentElement.dataset.theme = 'experience'

  const meta =
    document.querySelector('meta[name="color-scheme"]') ??
    (() => {
      const tag = document.createElement('meta')
      tag.setAttribute('name', 'color-scheme')
      document.head.appendChild(tag)
      return tag
    })()

  meta.setAttribute('content', 'light')
}

const AppRoot = styled.div`
  position: relative;
  min-height: 100vh;
  isolation: isolate;
`

const ContentLayer = styled.div`
  position: relative;
  z-index: 1;
  min-height: 100vh;
`

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const { logger } = initClientLogging({
      app: 'natuerlich',
    })

    applyExperienceThemeToDom()

    logger
      .withContext({
        cat: 'theme',
        phase: 'init',
      })
      .info('experience_theme_ready', {
        theme: 'experience',
      })
  }, [])

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
      <AppRoot>
        <ContentLayer>{children}</ContentLayer>
      </AppRoot>
    </ThemeProvider>
  )
}
