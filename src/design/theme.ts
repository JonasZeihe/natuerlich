// src/design/theme.ts
import {
  BREAKPOINTS,
  LAYOUT,
  NEUTRAL,
  PROJECT_ENERGY,
  RADIUS,
  SECTION_TONE_MAP,
  SHADOWS,
  SPACING,
  SPACING_HALF,
  TYPOGRAPHY,
  type AxisKey,
  type EnergyInput,
  type EnergyMix,
  type Mode,
  type SectionToneKey,
  type SurfaceToneKey,
} from './tokens'
import motion from './motion'
import {
  buildSemantic,
  resolveAxisKey,
  resolveAxisMix,
  type AxisRole,
  type IntentRole,
  type StateToneRole,
  type SurfaceToneRole,
} from './semantic'

const mixHex = (first: string, second: string, weight = 0.5) =>
  `color-mix(in srgb, ${first} ${Math.round(weight * 100)}%, ${second})`

const createTheme = (mode: Mode) => {
  const roles = buildSemantic(mode)
  const neutral = NEUTRAL[mode]
  const energy = PROJECT_ENERGY[mode]
  const boxShadow = SHADOWS[mode]

  const getNeutralRole = (): AxisRole => ({
    text: roles.intent.neutral.text,
    fill: roles.intent.neutral.text,
    fillHover: roles.intent.neutral.text,
    fillActive: roles.intent.neutral.text,
    surface: roles.intent.neutral.surface,
    surfaceStrong: roles.intent.neutral.surfaceStrong,
    border: roles.intent.neutral.border,
    contrast: roles.intent.neutral.contrast,
    focusRing: roles.intent.neutral.focusRing,
  })

  const getAxisRole = (key: AxisKey): AxisRole => roles.axis[key]

  const getMixedAxisRole = (mix: EnergyMix): AxisRole =>
    resolveAxisMix(mode, mix) ?? getNeutralRole()

  const getEnergyRole = (input?: EnergyInput, mix?: EnergyMix): AxisRole => {
    if (mix) return getMixedAxisRole(mix)
    if (!input) return getNeutralRole()
    return getAxisRole(resolveAxisKey(input))
  }

  const getIntentRole = (
    key: 'neutral' | 'info' | 'success' | 'warning' | 'danger'
  ): IntentRole => roles.intent[key]

  const getSurfaceTone = (
    tone: SurfaceToneKey,
    input?: EnergyInput,
    mix?: EnergyMix
  ): SurfaceToneRole => {
    if (tone === 'none') return roles.surfaceTone.open
    if (tone === 'neutral') return roles.surfaceTone.panel
    if (tone === 'subtle') return roles.surfaceTone.soft

    const energyRole = getEnergyRole(input, mix)

    if (tone === 'accent') {
      return {
        bg: energyRole.surface,
        fg: energyRole.text,
        border: energyRole.border,
        shadow: 'none',
        backdrop: 'none',
      }
    }

    if (tone === 'intense') {
      return {
        bg: energyRole.fill,
        fg: energyRole.contrast,
        border: energyRole.fillHover,
        shadow: 'none',
        backdrop: 'none',
      }
    }

    const base = roles.surfaceTone[tone]

    if (!input && !mix) {
      return base
    }

    if (tone === 'soft') {
      return {
        bg: energyRole.surface,
        fg: energyRole.text,
        border: energyRole.border,
        shadow: 'none',
        backdrop: 'none',
      }
    }

    return {
      bg: base.bg,
      fg: base.fg,
      border: energyRole.border,
      shadow: 'none',
      backdrop: 'none',
    }
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
          ? roles.axis.axisFlow.border
          : roles.border.strong,
  })

  const getStateTone = (state: keyof typeof roles.stateTone): StateToneRole =>
    roles.stateTone[state]

  const getSectionTone = (
    tone: SectionToneKey,
    input?: EnergyInput,
    mix?: EnergyMix
  ): StateToneRole => {
    const state = roles.sectionTone[tone]

    if (!input && !mix) {
      return state
    }

    const energyRole = getEnergyRole(input, mix)

    return {
      base: mixHex(
        neutral.surface,
        energyRole.surface,
        0.34 + state.washOpacity * 0.12
      ),
      edge: mixHex(
        neutral.borderStrong,
        energyRole.border,
        0.28 + state.overlayOpacity * 0.34
      ),
      line: mixHex(
        neutral.borderSoft,
        energyRole.border,
        0.22 + state.lineOpacity * 0.36
      ),
      wash: mixHex(
        neutral.surface,
        energyRole.surface,
        0.44 + state.washOpacity * 0.22
      ),
      overlayOpacity: state.overlayOpacity,
      lineOpacity: state.lineOpacity,
      washOpacity: state.washOpacity,
      gapScale: state.gapScale,
      padScale: state.padScale,
    }
  }

  return {
    mode,
    foundations: {
      neutral,
      energy,
      typography: TYPOGRAPHY,
      spacing: SPACING,
      spacingHalf: SPACING_HALF,
      radius: RADIUS,
      breakpoints: BREAKPOINTS,
      shadows: SHADOWS[mode],
      layout: LAYOUT,
      sectionToneMap: SECTION_TONE_MAP,
    },
    roles,
    gradients: {
      primary: energy.axisDensity.main,
      secondary: energy.axisOpening.main,
      accent: energy.axisFlow.main,
      highlight: energy.axisTension.main,
    },
    typography: TYPOGRAPHY,
    spacing: SPACING,
    spacingHalf: SPACING_HALF,
    borderRadius: RADIUS,
    breakpoints: BREAKPOINTS,
    boxShadow,
    layout: LAYOUT,
    motion,
    resolveAxisKey,
    getAxisRole,
    getMixedAxisRole,
    getEnergyRole,
    getIntentRole,
    getSurfaceRole,
    getSurfaceTone,
    getStateTone,
    getSectionTone,
  }
}

export const lightTheme = createTheme('light')
export const darkTheme = createTheme('dark')

export default lightTheme

export type {
  AxisKey,
  EnergyInput,
  EnergyMix,
  Mode,
  SectionToneKey,
  SurfaceToneKey,
} from './tokens'
export type AppTheme = typeof lightTheme

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
