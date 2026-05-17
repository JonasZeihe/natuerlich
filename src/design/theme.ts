// src/design/theme.ts
import {
  BREAKPOINTS,
  LAYOUT,
  MATERIAL_COLORS,
  MOVEMENT_COLORS,
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
  type MovementKey,
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
  type MovementRole,
  type StateToneRole,
  type SurfaceToneRole,
} from './semantic'

const mixHex = (first: string, second: string, weight = 0.5) =>
  `color-mix(in srgb, ${first} ${Math.round(weight * 100)}%, ${second})`

const createTheme = () => {
  const roles = buildSemantic()
  const material = MATERIAL_COLORS
  const energy = PROJECT_ENERGY
  const movement = MOVEMENT_COLORS
  const boxShadow = SHADOWS

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
    resolveAxisMix(mix) ?? getNeutralRole()

  const getEnergyRole = (input?: EnergyInput, mix?: EnergyMix): AxisRole => {
    if (mix) return getMixedAxisRole(mix)
    if (!input) return getNeutralRole()
    return getAxisRole(resolveAxisKey(input))
  }

  const getMovementRole = (key: MovementKey): MovementRole =>
    roles.movement[key]

  const getIntentRole = (
    key: 'neutral' | 'info' | 'success' | 'warning' | 'danger'
  ): IntentRole => roles.intent[key]

  const getSurfaceTone = (
    tone: SurfaceToneKey,
    movementKey: MovementKey = 'arrival'
  ): SurfaceToneRole => {
    const role = getMovementRole(movementKey)

    if (tone === 'bare') {
      return {
        bg: 'transparent',
        fg: role.text,
        border: 'transparent',
        shadow: 'none',
        backdrop: 'none',
      }
    }

    if (tone === 'deep') {
      return {
        bg: role.deep,
        fg: role.textInverse,
        border: mixHex(role.deep, role.accent, 0.64),
        shadow: 'none',
        backdrop: 'none',
      }
    }

    if (tone === 'threshold') {
      return {
        bg: role.threshold,
        fg: role.text,
        border: mixHex(role.threshold, role.accent, 0.58),
        shadow: 'none',
        backdrop: 'none',
      }
    }

    return {
      bg: role[tone],
      fg: role.text,
      border:
        tone === 'stage' || tone === 'quiet' ? 'transparent' : role.border,
      shadow: 'none',
      backdrop: 'none',
    }
  }

  const getSurfaceRole = (
    tone:
      | 'canvas'
      | 'chrome'
      | 'stage'
      | 'field'
      | 'quiet'
      | 'card'
      | 'note'
      | 'threshold'
      | 'deep'
  ) => ({
    bg: roles.surface[tone],
    fg:
      tone === 'deep'
        ? MOVEMENT_COLORS.arrival.textInverse
        : roles.text.primary,
    border:
      tone === 'stage' || tone === 'quiet'
        ? 'transparent'
        : tone === 'deep'
          ? mixHex(
              MOVEMENT_COLORS.arrival.deep,
              MOVEMENT_COLORS.arrival.accent,
              0.64
            )
          : MOVEMENT_COLORS.arrival.border,
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
        state.base,
        energyRole.surface,
        0.22 + state.washOpacity * 0.08
      ),
      edge: mixHex(
        state.edge,
        energyRole.border,
        0.18 + state.overlayOpacity * 0.24
      ),
      line: mixHex(
        state.line,
        energyRole.border,
        0.14 + state.lineOpacity * 0.24
      ),
      wash: mixHex(
        state.wash,
        energyRole.surface,
        0.28 + state.washOpacity * 0.14
      ),
      overlayOpacity: state.overlayOpacity,
      lineOpacity: state.lineOpacity,
      washOpacity: state.washOpacity,
      gapScale: state.gapScale,
      padScale: state.padScale,
    }
  }

  return {
    foundations: {
      material,
      energy,
      movement,
      typography: TYPOGRAPHY,
      spacing: SPACING,
      spacingHalf: SPACING_HALF,
      radius: RADIUS,
      breakpoints: BREAKPOINTS,
      shadows: SHADOWS,
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
    getMovementRole,
    getIntentRole,
    getSurfaceRole,
    getSurfaceTone,
    getStateTone,
    getSectionTone,
  }
}

export const experienceTheme = createTheme()

export default experienceTheme

export type {
  AxisKey,
  EnergyInput,
  EnergyMix,
  MovementKey,
  SectionToneKey,
  SurfaceToneKey,
} from './tokens'
export type AppTheme = typeof experienceTheme

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
