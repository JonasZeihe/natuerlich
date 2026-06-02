// src/design/hooks/useAccent.ts
'use client'

import { useTheme } from 'styled-components'
import type { AxisKey } from '@/design/theme'

export default function useAccent(key: AxisKey = 'axisOpening') {
  const theme = useTheme()
  const role = theme.getAxisRole(key)

  return {
    key,
    text: role.text,
    fill: role.fill,
    fillHover: role.fillHover,
    fillActive: role.fillActive,
    surface: role.surface,
    surfaceStrong: role.surfaceStrong,
    border: role.border,
    contrast: role.contrast,
    focusRing: role.focusRing,
  }
}
