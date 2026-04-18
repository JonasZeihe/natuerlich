// src/design/hooks/useAccent.ts
'use client'

import { useTheme } from 'styled-components'
import type { AxisKey, AppTheme } from '@/design/theme'

export type AccentKey = AxisKey | 'neutral'
export type AccentInfo = ReturnType<AppTheme['getAxisRole']>

export type AccentStyles = {
  background: string
  color: string
  borderColor: string
  focusRing: string
}

export default function useAccent(key: AccentKey): AccentInfo {
  const theme = useTheme() as AppTheme
  return theme.getAxisRole(key)
}

export function useAccentStyles(key: AccentKey): AccentStyles {
  const accent = useAccent(key)

  return {
    background: accent.surface,
    color: accent.contrast,
    borderColor: accent.border,
    focusRing: accent.focusRing,
  }
}
