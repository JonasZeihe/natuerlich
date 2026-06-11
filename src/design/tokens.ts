// src/design/tokens.ts
import { FONT_FAMILY } from './fonts'

const FLUID_MIN_WIDTH = 360
const FLUID_MAX_WIDTH = 1440

const round = (value: number) => Number(value.toFixed(4))

export const fluidRem = (min: number, max: number) => {
  const range = FLUID_MAX_WIDTH - FLUID_MIN_WIDTH
  const delta = max - min

  return `clamp(${round(min)}rem, calc(${round(min)}rem + ${round(delta)} * ((100vw - ${FLUID_MIN_WIDTH}px) / ${range})), ${round(max)}rem)`
}

export const space = (step = 1) => fluidRem(0.42 * step, 0.62 * step)

export const PALETTE = {
  ink: '#0C141A',
  inkSoft: '#334348',
  inkMuted: '#586366',

  ivory: '#F8F1E5',
  paper: '#FCF7EF',
  bone: '#FFF4E3',
  canvas: '#ECEBE5',

  stone: '#8D8B84',
  stoneSoft: '#D4D1C8',
  ash: '#D8E3E5',

  morningDeep: '#B87336',
  morning: '#E2B06B',
  morningLight: '#FFF4E3',

  jade: '#3D7D62',
  jadeDeep: '#173F34',
  jadeLight: '#C9DEC3',

  moss: '#2F6E58',
  mossDeep: '#133B31',
  mossLight: '#D1E6C8',

  blue: '#315D70',
  blueDeep: '#142B35',
  blueLight: '#DCE7E9',

  sand: '#D3B17E',
  sandDeep: '#755537',
  sandLight: '#F1D4A1',

  danger: '#8D5A51',
  dangerDeep: '#4B241F',
  dangerLight: '#EEDAD4',

  backdrop: '#0B0F12',
} as const

export const RADIUS = {
  none: '0',
  sm: '0.35rem',
  md: '0.7rem',
  lg: '1.35rem',
  pill: '9999px',
} as const

export const SHADOW = {
  xs: '0 1px 2px rgba(12, 18, 20, 0.04)',
  sm: '0 10px 24px rgba(12, 18, 20, 0.07)',
  md: '0 18px 40px rgba(12, 18, 20, 0.10)',
  lg: '0 28px 64px rgba(12, 18, 20, 0.14)',
  focus: '0 0 0 2px rgba(184, 115, 54, 0.35)',
  glow: '0 0 0 2px rgba(47, 110, 88, 0.14), 0 18px 40px rgba(12, 18, 20, 0.08)',
} as const

export const BREAKPOINT = {
  xs: '360px',
  sm: '640px',
  md: '900px',
  lg: '1200px',
  xl: '1440px',
  xxl: '1720px',
} as const

export const FONT = {
  family: FONT_FAMILY,
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  size: {
    xs: fluidRem(0.875, 0.95),
    sm: fluidRem(0.9, 0.98),
    md: fluidRem(1, 1.07),
    lg: fluidRem(1.18, 1.5),
    xl: fluidRem(1.52, 2.08),
    '2xl': fluidRem(1.72, 2.9),
    '3xl': fluidRem(2.15, 3.8),
  },
  lineHeight: {
    tight: 1.08,
    title: 1.16,
    normal: 1.56,
    relaxed: 1.68,
  },
  letterSpacing: {
    tight: '-0.018em',
    normal: '0',
  },
  measure: {
    title: '22ch',
    text: '64ch',
    wide: '72ch',
  },
} as const

export const TEXT_STYLE = {
  hero: {
    fontFamily: FONT.family.main,
    fontSize: FONT.size['3xl'],
    fontWeight: FONT.weight.bold,
    lineHeight: FONT.lineHeight.tight,
    letterSpacing: FONT.letterSpacing.tight,
    maxWidth: FONT.measure.title,
  },
  h1: {
    fontFamily: FONT.family.main,
    fontSize: FONT.size['2xl'],
    fontWeight: FONT.weight.bold,
    lineHeight: FONT.lineHeight.tight,
    letterSpacing: FONT.letterSpacing.tight,
    maxWidth: FONT.measure.title,
  },
  h2: {
    fontFamily: FONT.family.main,
    fontSize: FONT.size.xl,
    fontWeight: FONT.weight.bold,
    lineHeight: FONT.lineHeight.title,
    letterSpacing: FONT.letterSpacing.tight,
    maxWidth: FONT.measure.title,
  },
  h3: {
    fontFamily: FONT.family.main,
    fontSize: FONT.size.lg,
    fontWeight: FONT.weight.semibold,
    lineHeight: 1.32,
    letterSpacing: FONT.letterSpacing.normal,
    maxWidth: FONT.measure.title,
  },
  body: {
    fontFamily: FONT.family.main,
    fontSize: FONT.size.md,
    fontWeight: FONT.weight.regular,
    lineHeight: FONT.lineHeight.normal,
    letterSpacing: FONT.letterSpacing.normal,
    maxWidth: FONT.measure.text,
  },
  small: {
    fontFamily: FONT.family.main,
    fontSize: FONT.size.sm,
    fontWeight: FONT.weight.medium,
    lineHeight: 1.42,
    letterSpacing: FONT.letterSpacing.normal,
    maxWidth: FONT.measure.text,
  },
} as const

export const COLOR = {
  text: {
    default: PALETTE.ink,
    soft: PALETTE.inkSoft,
    muted: PALETTE.inkMuted,
    inverse: PALETTE.ivory,
    danger: PALETTE.dangerDeep,
  },

  surface: {
    page: PALETTE.canvas,
    paper: PALETTE.paper,
    card: PALETTE.paper,
    field: PALETTE.bone,
    quiet: 'color-mix(in srgb, #FCF7EF 76%, transparent)',
    note: PALETTE.jadeLight,
    inverse: PALETTE.blueDeep,
    backdrop: PALETTE.backdrop,
  },

  border: {
    default: 'color-mix(in srgb, #8D8B84 42%, transparent)',
    strong: PALETTE.stone,
    inverse: PALETTE.ivory,
  },

  focus: {
    ring: PALETTE.morningDeep,
    shadow: SHADOW.focus,
  },

  link: {
    default: PALETTE.blue,
    hover: PALETTE.blueDeep,
  },

  intent: {
    info: {
      text: PALETTE.blueDeep,
      surface: PALETTE.blueLight,
      border: PALETTE.blue,
    },
    success: {
      text: PALETTE.jadeDeep,
      surface: PALETTE.jadeLight,
      border: PALETTE.jade,
    },
    warning: {
      text: PALETTE.sandDeep,
      surface: PALETTE.sandLight,
      border: PALETTE.sand,
    },
    danger: {
      text: PALETTE.dangerDeep,
      surface: PALETTE.dangerLight,
      border: PALETTE.danger,
    },
  },
} as const

export const DOMAIN_COLOR = {
  practice: {
    breath: PALETTE.morningDeep,
    stone: PALETTE.inkSoft,
    daoyin: PALETTE.jade,
    qigong: PALETTE.blue,
    yoga: PALETTE.sandDeep,
    taiji: PALETTE.blueDeep,
  },

  phase: {
    arrival: PALETTE.morningLight,
    relation: '#D17F37',
    clarify: '#E8E7E1',
    expand: '#F0E2D0',
    deepen: '#E8E7E1',
    pressure: '#E2E4DF',
    relief: '#E7F0DF',
    threshold: '#E8EDEE',
  },
} as const

export const LAYOUT = {
  container: {
    narrow: '44rem',
    default: '72rem',
    wide: '96rem',
    full: 'none',
  },

  inset: {
    page: fluidRem(1, 2),
    rail: fluidRem(1, 1.5),
  },

  gap: {
    grid: space(2.8),
    text: space(1.55),
    block: space(2.25),
    cluster: space(3.65),
    region: space(6),
    chapter: space(9),
  },

  section: {
    compact: space(6.5),
    default: space(9.75),
    spacious: space(13.25),
  },

  surfacePadding: {
    none: '0',
    sm: space(1.7),
    md: space(2.35),
    lg: space(3.4),
  },
} as const

export const COMPONENT = {
  button: {
    primary: {
      default: {
        text: COLOR.text.inverse,
        background: COLOR.surface.inverse,
        border: COLOR.surface.inverse,
      },
      hover: {
        text: COLOR.text.inverse,
        background: COLOR.text.default,
        border: COLOR.text.default,
      },
      disabled: {
        text: COLOR.text.muted,
        background: PALETTE.stoneSoft,
        border: PALETTE.stoneSoft,
      },
    },

    secondary: {
      default: {
        text: COLOR.text.inverse,
        background: PALETTE.morningDeep,
        border: PALETTE.morningDeep,
      },
      hover: {
        text: COLOR.text.inverse,
        background: PALETTE.sandDeep,
        border: PALETTE.sandDeep,
      },
      disabled: {
        text: COLOR.text.muted,
        background: PALETTE.stoneSoft,
        border: PALETTE.stoneSoft,
      },
    },

    ghost: {
      default: {
        text: PALETTE.mossDeep,
        background: PALETTE.mossLight,
        border: 'color-mix(in srgb, #2F6E58 54%, transparent)',
      },
      hover: {
        text: PALETTE.mossDeep,
        background: 'color-mix(in srgb, #D1E6C8 72%, #FCF7EF)',
        border: PALETTE.moss,
      },
      disabled: {
        text: COLOR.text.muted,
        background: PALETTE.stoneSoft,
        border: PALETTE.stoneSoft,
      },
    },

    link: {
      default: {
        text: COLOR.link.default,
        background: 'transparent',
        border: 'transparent',
      },
      hover: {
        text: COLOR.link.hover,
        background: 'transparent',
        border: 'transparent',
      },
      disabled: {
        text: COLOR.text.muted,
        background: 'transparent',
        border: 'transparent',
      },
    },

    danger: {
      default: {
        text: COLOR.intent.danger.text,
        background: COLOR.intent.danger.surface,
        border: 'color-mix(in srgb, #8D5A51 56%, transparent)',
      },
      hover: {
        text: COLOR.text.inverse,
        background: COLOR.intent.danger.border,
        border: COLOR.intent.danger.border,
      },
      disabled: {
        text: COLOR.text.muted,
        background: PALETTE.stoneSoft,
        border: PALETTE.stoneSoft,
      },
    },
  },
} as const

export type PaletteKey = keyof typeof PALETTE
export type RadiusKey = keyof typeof RADIUS
export type ShadowKey = keyof typeof SHADOW
export type BreakpointKey = keyof typeof BREAKPOINT
export type TextStyleKey = keyof typeof TEXT_STYLE
export type DomainPracticeKey = keyof typeof DOMAIN_COLOR.practice
export type DomainPhaseKey = keyof typeof DOMAIN_COLOR.phase
export type ButtonVariantKey = keyof typeof COMPONENT.button
export type SpaceFn = typeof space
