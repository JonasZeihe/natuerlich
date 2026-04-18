// src/design/theme.ts
import {
  AXIS_META,
  BREAKPOINTS,
  LAYOUT,
  PALETTE,
  RADIUS,
  SHADOWS,
  SPACING,
  SPACING_HALF,
  TYPOGRAPHY,
  type AxisKey,
  type Mode,
  type PaletteMode,
} from './tokens'
import { buildSemantic, type AxisRole, type IntentRole } from './semantic'

const createTheme = (mode: Mode) => {
  const palette: PaletteMode = PALETTE[mode]
  const roles = buildSemantic(mode)
  const boxShadow = SHADOWS[mode]

  const gradients = {
    primary: `linear-gradient(135deg, ${palette.axisClarity[3]}, ${palette.axisClarity.main})`,
    secondary: `linear-gradient(135deg, ${palette.axisEnergy[3]}, ${palette.axisEnergy.main})`,
    accent: `linear-gradient(135deg, ${palette.axisResonance[3]}, ${palette.axisResonance.main})`,
    highlight: `linear-gradient(135deg, ${palette.axisClarity.main}, ${palette.axisEnergy.main})`,
  } as const

  const grid = {
    defaults: { min: '18rem', gap: 2, columns: 'auto' as const },
  }

  const motifs = {
    spotlight: { insetScale: 0.96, washAlpha: mode === 'light' ? 0.04 : 0.08 },
    zebra: { altSurface: palette.surface[2] },
    edgeToEdge: { container: 'wide' as const },
  }

  const getAxisRole = (key: AxisKey | 'neutral') => {
    if (key === 'neutral') {
      return {
        text: roles.intent.neutral.text,
        fill: roles.intent.neutral.text,
        fillHover: roles.intent.neutral.text,
        fillActive: roles.intent.neutral.text,
        surface: roles.intent.neutral.surface,
        surfaceStrong: roles.intent.neutral.surfaceStrong,
        border: roles.intent.neutral.border,
        contrast: roles.intent.neutral.contrast,
        focusRing: roles.intent.neutral.focusRing,
      } satisfies AxisRole
    }

    return roles.axis[key]
  }

  const getIntentRole = (
    key: 'neutral' | 'info' | 'success' | 'warning' | 'danger'
  ): IntentRole => roles.intent[key]

  const getSurfaceRole = (
    tone:
      | 'canvas'
      | 'chrome'
      | 'panel'
      | 'panelAlt'
      | 'panelSubtle'
      | 'elevated'
      | 'inset'
  ) => ({
    bg: roles.surface[tone],
    fg: roles.text.primary,
    border:
      tone === 'panelSubtle' || tone === 'inset'
        ? roles.border.subtle
        : roles.border.strong,
  })

  return {
    mode,
    foundations: {
      palette,
      typography: TYPOGRAPHY,
      spacing: SPACING,
      spacingHalf: SPACING_HALF,
      radius: RADIUS,
      breakpoints: BREAKPOINTS,
      shadows: SHADOWS[mode],
      layout: LAYOUT,
    },
    roles,
    gradients,
    typography: TYPOGRAPHY,
    spacing: SPACING,
    spacingHalf: SPACING_HALF,
    borderRadius: RADIUS,
    breakpoints: BREAKPOINTS,
    boxShadow,
    layout: LAYOUT,
    grid,
    motifs,
    axisMeta: AXIS_META,
    motionSafe: true,
    getAxisRole,
    getIntentRole,
    getSurfaceRole,
  }
}

export const lightTheme = createTheme('light')
export const darkTheme = createTheme('dark')

export default lightTheme

export type { AxisKey } from './tokens'
export type AppTheme = typeof lightTheme

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
