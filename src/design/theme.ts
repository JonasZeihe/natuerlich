// src/design/theme.ts
import {
  AXIS_META,
  BREAKPOINTS,
  LAYOUT,
  PALETTE,
  RADIUS,
  SECTION_TONES,
  SHADOWS,
  SPACING,
  SPACING_HALF,
  TYPOGRAPHY,
  type AxisKey,
  type Mode,
  type PaletteMode,
  type SectionToneKey,
  type SurfaceToneKey,
} from './tokens'
import {
  buildSemantic,
  type AxisRole,
  type IntentRole,
  type SectionToneRole,
  type SurfaceToneRole,
} from './semantic'

const createTheme = (mode: Mode) => {
  const palette: PaletteMode = PALETTE[mode]
  const roles = buildSemantic(mode)
  const boxShadow = SHADOWS[mode]

  const gradients = {
    primary: palette.axisClarity.base,
    secondary: palette.axisEnergy.base,
    accent: palette.axisResonance.base,
    highlight: palette.axisEnergy.hover,
  } as const

  const grid = {
    defaults: { min: '18rem', gap: 2, columns: 'auto' as const },
  }

  const motifs = {
    spotlight: { insetScale: 1, washAlpha: 0.08 },
    zebra: { altSurface: roles.surface.panelAlt },
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

  const getSurfaceTone = (
    tone: SurfaceToneKey,
    axis: AxisKey | 'neutral' = 'neutral'
  ): SurfaceToneRole => {
    const axisRole = getAxisRole(axis)

    if (tone === 'none') return roles.surfaceTone.open
    if (tone === 'neutral') return roles.surfaceTone.panel
    if (tone === 'subtle') return roles.surfaceTone.soft

    if (tone === 'accent') {
      return {
        bg: axisRole.surface,
        fg: axisRole.text,
        border: axisRole.border,
        shadow: 'none',
        backdrop: 'none',
      }
    }

    if (tone === 'intense') {
      return {
        bg: axisRole.fill,
        fg: axisRole.contrast,
        border: axisRole.fillHover,
        shadow: 'none',
        backdrop: 'none',
      }
    }

    const base = roles.surfaceTone[tone]

    if (axis === 'neutral') {
      return base
    }

    if (tone === 'soft') {
      return {
        bg: axisRole.surface,
        fg: axisRole.text,
        border: axisRole.border,
        shadow: 'none',
        backdrop: 'none',
      }
    }

    if (
      tone === 'panel' ||
      tone === 'elevated' ||
      tone === 'inset' ||
      tone === 'band'
    ) {
      return {
        bg: base.bg,
        fg: base.fg,
        border: axisRole.border,
        shadow: 'none',
        backdrop: 'none',
      }
    }

    return base
  }

  const getSurfaceRole = (
    tone:
      | 'canvas'
      | 'chrome'
      | 'panel'
      | 'panelAlt'
      | 'panelSubtle'
      | 'elevated'
      | 'inset'
      | 'soft'
      | 'band'
  ) => ({
    bg: roles.surface[tone],
    fg: roles.text.primary,
    border:
      tone === 'panelSubtle' || tone === 'inset' || tone === 'soft'
        ? roles.border.subtle
        : tone === 'band'
          ? roles.axis.axisResonance.border
          : roles.border.strong,
  })

  const getSectionTone = (tone: SectionToneKey): SectionToneRole =>
    roles.sectionTone[tone]

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
      sectionTones: SECTION_TONES,
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
    getSurfaceTone,
    getSectionTone,
  }
}

export const lightTheme = createTheme('light')
export const darkTheme = createTheme('dark')

export default lightTheme

export type { AxisKey, SectionToneKey, SurfaceToneKey } from './tokens'
export type AppTheme = typeof lightTheme

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
