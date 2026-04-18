// src/design/Providers.tsx
'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import styled from 'styled-components'
import { ThemeProvider, type DefaultTheme } from 'styled-components'
import GlobalStyles from '@/design/global'
import { darkTheme, lightTheme } from '@/design/theme'
import type { Mode } from '@/design/tokens'

const STORAGE_KEY = 'natuerlichkeit:theme'

type ThemeApi = {
  mode: Mode
  isDarkMode: boolean
  setMode: (mode: Mode) => void
  toggleMode: () => void
  clearStoredMode: () => void
  theme: DefaultTheme
}

const ThemeApiContext = createContext<ThemeApi | null>(null)

export function useNatuerlichkeitTheme(): ThemeApi {
  const context = useContext(ThemeApiContext)

  if (!context) {
    throw new Error('useNatuerlichkeitTheme must be used within <Providers />')
  }

  return context
}

const safeGetItem = (key: string): string | null => {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

const safeSetItem = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value)
  } catch {}
}

const safeRemoveItem = (key: string) => {
  try {
    localStorage.removeItem(key)
  } catch {}
}

const readStoredMode = (): Mode | null => {
  const value = safeGetItem(STORAGE_KEY)
  return value === 'dark' || value === 'light' ? value : null
}

const getSystemMode = (): Mode => {
  if (!window.matchMedia) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

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

const applyModeToDom = (mode: Mode) => {
  document.documentElement.dataset.theme = mode

  const meta =
    document.querySelector('meta[name="color-scheme"]') ??
    (() => {
      const tag = document.createElement('meta')
      tag.setAttribute('name', 'color-scheme')
      document.head.appendChild(tag)
      return tag
    })()

  meta.setAttribute('content', mode === 'dark' ? 'dark light' : 'light dark')
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
  const [hydrated, setHydrated] = useState(false)
  const [mode, setModeState] = useState<Mode>('light')
  const [userLocked, setUserLocked] = useState(false)

  useEffect(() => {
    const stored = readStoredMode()
    const nextMode = stored ?? getSystemMode()
    setModeState(nextMode)
    setUserLocked(stored !== null)
    applyModeToDom(nextMode)
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return

    applyModeToDom(mode)

    if (userLocked) {
      safeSetItem(STORAGE_KEY, mode)
    }
  }, [hydrated, mode, userLocked])

  useEffect(() => {
    if (!hydrated || userLocked || !window.matchMedia) return

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => setModeState(media.matches ? 'dark' : 'light')

    if (media.addEventListener) {
      media.addEventListener('change', onChange)
    } else {
      media.addListener(onChange)
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', onChange)
      } else {
        media.removeListener(onChange)
      }
    }
  }, [hydrated, userLocked])

  const baseTheme = useMemo(
    () => (mode === 'dark' ? darkTheme : lightTheme),
    [mode]
  )

  const theme = useMemo<DefaultTheme>(() => {
    const nextTheme = { ...baseTheme, mode }
    return process.env.NODE_ENV === 'production'
      ? nextTheme
      : failLoudProxy(nextTheme)
  }, [baseTheme, mode])

  const setMode = useCallback((nextMode: Mode) => {
    setUserLocked(true)
    safeSetItem(STORAGE_KEY, nextMode)
    setModeState(nextMode)
    applyModeToDom(nextMode)
  }, [])

  const toggleMode = useCallback(() => {
    setMode(mode === 'dark' ? 'light' : 'dark')
  }, [mode, setMode])

  const clearStoredMode = useCallback(() => {
    safeRemoveItem(STORAGE_KEY)
    setUserLocked(false)
    const nextMode = getSystemMode()
    setModeState(nextMode)
    applyModeToDom(nextMode)
  }, [])

  const api = useMemo<ThemeApi>(
    () => ({
      mode,
      isDarkMode: mode === 'dark',
      setMode,
      toggleMode,
      clearStoredMode,
      theme,
    }),
    [clearStoredMode, mode, setMode, theme, toggleMode]
  )

  return (
    <ThemeApiContext.Provider value={api}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AppRoot>
          <ContentLayer>{children}</ContentLayer>
        </AppRoot>
      </ThemeProvider>
    </ThemeApiContext.Provider>
  )
}
