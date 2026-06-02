// src/design/theme.ts
import {
  BREAKPOINTS,
  COLOR,
  ENERGY,
  ENERGY_ALIASES,
  LAYOUT,
  MATERIAL_COLORS,
  MOVEMENT_COLORS,
  PALETTE,
  RADIUS,
  SECTION_TONE_MAP,
  SHADOWS,
  SPACING,
  SPACING_HALF,
  TYPOGRAPHY,
  type ActionKey,
  type AxisKey,
  type EnergyInput,
  type EnergyMix,
  type HighlightKey,
  type MovementKey,
  type SectionToneKey,
  type SurfaceToneKey,
} from './tokens'
import motion from './motion'

type ShadowKey = keyof typeof SHADOWS

export type SurfaceToneRole = {
  bg: string
  fg: string
  fgSoft: string
  border: string
  shadow: ShadowKey | 'none'
  backdrop: 'none'
}

export type SectionToneRole = {
  base: string
  gapScale: number
  padScale: number
}

export type AxisRole = {
  text: string
  fill: string
  fillHover: string
  fillActive: string
  surface: string
  surfaceStrong: string
  border: string
  contrast: string
  focusRing: string
}

export type IntentRole = {
  text: string
  surface: string
  surfaceStrong: string
  border: string
  contrast: string
  focusRing: string
}

const resolveAxisKey = (input: EnergyInput): AxisKey => {
  if (
    input === 'axisOpening' ||
    input === 'axisTension' ||
    input === 'axisDensity' ||
    input === 'axisFlow'
  ) {
    return input
  }

  return ENERGY_ALIASES[input]
}

const axisRole = (key: AxisKey): AxisRole => {
  if (key === 'axisDensity') {
    return {
      text: ENERGY.qigong.deep,
      fill: ENERGY.qigong.main,
      fillHover: ENERGY.qigong.deep,
      fillActive: PALETTE.ink,
      surface: ENERGY.qigong.light,
      surfaceStrong: 'color-mix(in srgb, #DCE7E9 72%, #FCF7EF)',
      border: 'color-mix(in srgb, #315D70 56%, transparent)',
      contrast: PALETTE.ivory,
      focusRing: ENERGY.qigong.main,
    }
  }

  if (key === 'axisFlow') {
    return {
      text: ENERGY.contact.deep,
      fill: ENERGY.contact.main,
      fillHover: ENERGY.contact.deep,
      fillActive: PALETTE.ink,
      surface: ENERGY.contact.light,
      surfaceStrong: 'color-mix(in srgb, #D1E6C8 72%, #FCF7EF)',
      border: 'color-mix(in srgb, #2F6E58 56%, transparent)',
      contrast: PALETTE.ivory,
      focusRing: ENERGY.contact.main,
    }
  }

  if (key === 'axisTension') {
    return {
      text: ENERGY.taiji.deep,
      fill: ENERGY.taiji.deep,
      fillHover: PALETTE.ink,
      fillActive: PALETTE.ink,
      surface: PALETTE.stoneSoft,
      surfaceStrong: 'color-mix(in srgb, #D4D1C8 72%, #FCF7EF)',
      border: 'color-mix(in srgb, #142B35 44%, transparent)',
      contrast: PALETTE.ivory,
      focusRing: PALETTE.blueDeep,
    }
  }

  return {
    text: ENERGY.arrival.deep,
    fill: ENERGY.arrival.deep,
    fillHover: PALETTE.sandDeep,
    fillActive: PALETTE.ink,
    surface: ENERGY.arrival.light,
    surfaceStrong: 'color-mix(in srgb, #FFF4E3 72%, #FCF7EF)',
    border: 'color-mix(in srgb, #B87336 54%, transparent)',
    contrast: PALETTE.ivory,
    focusRing: ENERGY.arrival.deep,
  }
}

const intentRole = (axis: AxisKey): IntentRole => {
  const role = axisRole(axis)

  return {
    text: role.text,
    surface: role.surface,
    surfaceStrong: role.surfaceStrong,
    border: role.border,
    contrast: role.contrast,
    focusRing: role.focusRing,
  }
}

const surfaceTone = {
  bare: {
    bg: 'transparent',
    fg: COLOR.text.primary,
    fgSoft: COLOR.text.soft,
    border: 'transparent',
    shadow: 'none',
    backdrop: 'none',
  },
  stage: {
    bg: COLOR.surface.canvas,
    fg: COLOR.text.primary,
    fgSoft: COLOR.text.soft,
    border: 'transparent',
    shadow: 'none',
    backdrop: 'none',
  },
  field: {
    bg: COLOR.surface.field,
    fg: COLOR.text.primary,
    fgSoft: COLOR.text.soft,
    border: COLOR.border.subtle,
    shadow: 'none',
    backdrop: 'none',
  },
  quiet: {
    bg: COLOR.surface.quiet,
    fg: COLOR.text.primary,
    fgSoft: COLOR.text.soft,
    border: 'transparent',
    shadow: 'none',
    backdrop: 'none',
  },
  card: {
    bg: COLOR.surface.card,
    fg: COLOR.text.primary,
    fgSoft: COLOR.text.soft,
    border: COLOR.border.subtle,
    shadow: 'none',
    backdrop: 'none',
  },
  note: {
    bg: COLOR.surface.note,
    fg: COLOR.text.primary,
    fgSoft: COLOR.text.soft,
    border: 'color-mix(in srgb, #3D7D62 42%, transparent)',
    shadow: 'none',
    backdrop: 'none',
  },
  threshold: {
    bg: PALETTE.jade,
    fg: COLOR.text.inverse,
    fgSoft: 'color-mix(in srgb, #F8F1E5 78%, transparent)',
    border: PALETTE.jade,
    shadow: 'none',
    backdrop: 'none',
  },
  deep: {
    bg: PALETTE.blueDeep,
    fg: COLOR.text.inverse,
    fgSoft: 'color-mix(in srgb, #F8F1E5 78%, transparent)',
    border: PALETTE.blueDeep,
    shadow: 'none',
    backdrop: 'none',
  },
} satisfies Record<SurfaceToneKey, SurfaceToneRole>

const actionToButtonRole = (key: ActionKey) => {
  const action = COLOR.action[key]

  return {
    fg: action.text,
    bg: action.background,
    border: action.border,
    shadow: 'none' as const,
    hoverFg: action.hoverText,
    hoverBg: action.hoverBackground,
    hoverBorder: action.hoverBorder,
    hoverShadow: 'none' as const,
    activeFg: action.hoverText,
    activeBg: action.hoverBackground,
    activeBorder: action.hoverBorder,
    activeShadow: 'none' as const,
    disabledFg: action.disabledText,
    disabledBg: action.disabledBackground,
    disabledBorder: action.disabledBorder,
  }
}

const createTheme = () => {
  const roles = {
    palette: PALETTE,
    energy: ENERGY,
    text: COLOR.text,
    surface: COLOR.surface,
    surfaceTone,
    border: COLOR.border,
    section: COLOR.section,
    movement: MOVEMENT_COLORS,
    axis: {
      axisOpening: axisRole('axisOpening'),
      axisTension: axisRole('axisTension'),
      axisDensity: axisRole('axisDensity'),
      axisFlow: axisRole('axisFlow'),
    },
    intent: {
      neutral: intentRole('axisTension'),
      info: intentRole('axisDensity'),
      success: intentRole('axisFlow'),
      warning: intentRole('axisOpening'),
      danger: {
        text: PALETTE.dangerDeep,
        surface: PALETTE.dangerLight,
        surfaceStrong: 'color-mix(in srgb, #EEDAD4 72%, #FCF7EF)',
        border: 'color-mix(in srgb, #8D5A51 56%, transparent)',
        contrast: PALETTE.ivory,
        focusRing: PALETTE.danger,
      },
    },
    interactive: {
      button: {
        primary: actionToButtonRole('primary'),
        secondary: actionToButtonRole('secondary'),
        ghost: actionToButtonRole('ghost'),
        link: actionToButtonRole('link'),
        danger: actionToButtonRole('danger'),
      },
    },
  } as const

  const getAxisRole = (key: AxisKey): AxisRole => roles.axis[key]

  const getMixedAxisRole = (mix: EnergyMix): AxisRole =>
    axisRole(resolveAxisKey(mix[0]))

  const getEnergyRole = (input?: EnergyInput, mix?: EnergyMix): AxisRole => {
    if (mix) return getMixedAxisRole(mix)
    if (!input) return roles.axis.axisTension
    return getAxisRole(resolveAxisKey(input))
  }

  const getMovementRole = (key: MovementKey) => roles.movement[key]

  const getIntentRole = (
    key: 'neutral' | 'info' | 'success' | 'warning' | 'danger'
  ) => roles.intent[key]

  const getSurfaceTone = (
    tone: SurfaceToneKey,
    movementKey?: MovementKey
  ): SurfaceToneRole => {
    if (!movementKey) return roles.surfaceTone[tone]

    const movement = roles.movement[movementKey]

    if (tone === 'bare') {
      return {
        bg: 'transparent',
        fg: movement.text,
        fgSoft: movement.textSoft,
        border: 'transparent',
        shadow: 'none',
        backdrop: 'none',
      }
    }

    if (tone === 'deep') {
      return {
        bg: movement.deep,
        fg: movement.textInverse,
        fgSoft: `color-mix(in srgb, ${movement.textInverse} 78%, transparent)`,
        border: movement.deep,
        shadow: 'none',
        backdrop: 'none',
      }
    }

    return {
      bg: movement[tone],
      fg: movement.text,
      fgSoft: movement.textSoft,
      border:
        tone === 'stage' || tone === 'quiet' ? 'transparent' : movement.border,
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
    bg:
      tone === 'stage'
        ? roles.surface.canvas
        : tone === 'threshold'
          ? PALETTE.jade
          : roles.surface[tone],
    fg:
      tone === 'deep' || tone === 'threshold'
        ? roles.text.inverse
        : roles.text.primary,
    border:
      tone === 'stage' || tone === 'quiet'
        ? 'transparent'
        : tone === 'deep'
          ? PALETTE.blueDeep
          : roles.border.subtle,
  })

  const getSectionTone = (tone: SectionToneKey): SectionToneRole => ({
    base: COLOR.section[tone],
    gapScale: 1,
    padScale: 1,
  })

  const getStateTone = (): SectionToneRole => ({
    base: roles.surface.canvas,
    gapScale: 1,
    padScale: 1,
  })

  const getHighlightRole = (key: HighlightKey) => COLOR.highlight[key]

  return {
    foundations: {
      material: MATERIAL_COLORS,
      palette: PALETTE,
      energy: ENERGY,
      color: COLOR,
      typography: TYPOGRAPHY,
      spacing: SPACING,
      spacingHalf: SPACING_HALF,
      radius: RADIUS,
      breakpoints: BREAKPOINTS,
      shadows: SHADOWS,
      layout: LAYOUT,
      sectionToneMap: SECTION_TONE_MAP,
    },
    color: {
      palette: PALETTE,
      energy: ENERGY,
      ...COLOR,
    },
    roles,
    gradients: {
      primary: ENERGY.qigong.main,
      secondary: ENERGY.arrival.deep,
      accent: ENERGY.contact.main,
      highlight: ENERGY.taiji.deep,
    },
    typography: TYPOGRAPHY,
    spacing: SPACING,
    spacingHalf: SPACING_HALF,
    borderRadius: RADIUS,
    breakpoints: BREAKPOINTS,
    boxShadow: SHADOWS,
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
    getHighlightRole,
  }
}

export const experienceTheme = createTheme()

export default experienceTheme

export type {
  ActionKey,
  AxisKey,
  EnergyInput,
  EnergyMix,
  HighlightKey,
  MovementKey,
  SectionToneKey,
  SurfaceToneKey,
} from './tokens'
export type AppTheme = typeof experienceTheme

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
