// src/design/tokens.ts
export const clampRem = (min: number, max: number) =>
  `clamp(${min}rem, calc(${min}rem + (${max - min}) * ((100vw - 360px) / 1040)), ${max}rem)`

export const TYPOGRAPHY = {
  fontFamily: {
    primary: "'Geist','Inter','Segoe UI',Arial,sans-serif",
    secondary: "'Geist','Inter','Segoe UI',Arial,sans-serif",
    button: "'Geist','Inter','Segoe UI',Arial,sans-serif",
  },
  fontSize: {
    h1: clampRem(2.05, 2.9),
    h2: clampRem(1.58, 2.08),
    h3: clampRem(1.2, 1.5),
    h4: clampRem(1.08, 1.2),
    body: clampRem(1.0, 1.08),
    small: clampRem(0.9, 0.98),
    subtitle: clampRem(0.98, 1.08),
    caption: clampRem(0.84, 0.92),
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
  },
  lineHeight: {
    tight: 1.12,
    normal: 1.56,
    relaxed: 1.72,
  },
  letterSpacing: {
    tighter: '-0.026em',
    tight: '-0.018em',
    normal: '0',
    wide: '0.024em',
  },
  measure: {
    compact: '18ch',
    title: '22ch',
    prose: '64ch',
    wide: '72ch',
  },
} as const

export const SPACING = (factor = 1) => `${8 * factor}px`
export const SPACING_HALF = (factor = 1) => `${4 * factor}px`

export const RADIUS = {
  none: '0',
  small: '0.25rem',
  medium: '0.5rem',
  large: '0.9rem',
  pill: '9999px',
} as const

export const SHADOWS = {
  light: {
    xs: '0 1px 2px rgba(14, 18, 21, 0.05)',
    sm: '0 10px 24px rgba(14, 18, 21, 0.08)',
    md: '0 18px 40px rgba(14, 18, 21, 0.14)',
    lg: '0 28px 64px rgba(14, 18, 21, 0.18)',
    glow: '0 0 0 2px rgba(96, 72, 31, 0.14), 0 18px 40px rgba(14, 18, 21, 0.08)',
  },
  dark: {
    xs: '0 1px 3px rgba(0, 0, 0, 0.26)',
    sm: '0 10px 22px rgba(0, 0, 0, 0.34)',
    md: '0 18px 38px rgba(0, 0, 0, 0.46)',
    lg: '0 28px 58px rgba(0, 0, 0, 0.58)',
    glow: '0 0 0 2px rgba(174, 132, 68, 0.18), 0 16px 34px rgba(0, 0, 0, 0.24)',
  },
} as const

export const BREAKPOINTS = {
  xs: '360px',
  sm: '600px',
  md: '900px',
  lg: '1200px',
  xl: '1440px',
  xxl: '1720px',
} as const

export const LAYOUT = {
  containers: {
    narrow: '44rem',
    content: '72rem',
    page: '96rem',
    default: '72rem',
    wide: '96rem',
  },
  section: {
    compact: { gap: SPACING(1), pad: SPACING(1.05) },
    default: { gap: SPACING(1.8), pad: SPACING(1.65) },
    spacious: { gap: SPACING(2.55), pad: SPACING(2.8) },
  },
  surfacePadding: {
    none: '0',
    sm: 'clamp(0.62rem, 1.35vw, 0.82rem)',
    md: 'clamp(0.78rem, 1.7vw, 1.08rem)',
    lg: 'clamp(0.94rem, 2.2vw, 1.4rem)',
  },
  containerInset: 'clamp(0.75rem, 3vw, 1.5rem)',
} as const

export const FOUNDATION_STATUS = {
  light: {
    success: {
      soft: '#E7F1EB',
      main: '#4E7A64',
      strong: '#214231',
    },
    warning: {
      soft: '#F6EEDC',
      main: '#9B7440',
      strong: '#5E421A',
    },
    danger: {
      soft: '#F4E6E6',
      main: '#9C5B61',
      strong: '#5C282D',
    },
  },
  dark: {
    success: {
      soft: '#17211B',
      main: '#88B098',
      strong: '#D8E7DE',
    },
    warning: {
      soft: '#241D15',
      main: '#C9A26D',
      strong: '#F0DFC0',
    },
    danger: {
      soft: '#241718',
      main: '#CB8B92',
      strong: '#F1DCDD',
    },
  },
} as const

export const NEUTRAL = {
  light: {
    background: '#F4EFE7',
    surface: '#FBF7F0',
    surfaceAlt: '#F2EBE1',
    elevated: '#FEFBF7',
    inset: '#ECE3D7',
    text: '#171818',
    textSoft: '#606567',
    textStrong: '#111315',
    borderSoft: '#D7CCBE',
    borderStrong: '#B7A997',
    inverse: '#FCFAF7',
    backdrop: '#0F1315',
  },
  dark: {
    background: '#101416',
    surface: '#181D1F',
    surfaceAlt: '#20272A',
    elevated: '#1B2023',
    inset: '#14191B',
    text: '#ECE3D8',
    textSoft: '#A89D90',
    textStrong: '#F8F3EC',
    borderSoft: '#30393D',
    borderStrong: '#48545B',
    inverse: '#111416',
    backdrop: '#07090A',
  },
} as const

export const PROJECT_ENERGY = {
  light: {
    axisOpening: {
      soft: '#F5E2CC',
      main: '#C16A1F',
      strong: '#7C3500',
    },
    axisTension: {
      soft: '#E8DDD7',
      main: '#7E4B43',
      strong: '#4A211C',
    },
    axisDensity: {
      soft: '#E6EDF4',
      main: '#2D5B8A',
      strong: '#12314F',
    },
    axisFlow: {
      soft: '#DDEEE8',
      main: '#2D7A62',
      strong: '#114B3C',
    },
  },
  dark: {
    axisOpening: {
      soft: '#2A180B',
      main: '#E39A4D',
      strong: '#FFE1BE',
    },
    axisTension: {
      soft: '#241715',
      main: '#C28479',
      strong: '#F4D7D1',
    },
    axisDensity: {
      soft: '#13212E',
      main: '#76AEDD',
      strong: '#D8ECFF',
    },
    axisFlow: {
      soft: '#10211C',
      main: '#67B597',
      strong: '#D8F4EA',
    },
  },
} as const

export const PROTO_STATES = {
  approachable: {
    rhythm: 'spacious',
    edge: 0.18,
    line: 0,
    wash: 0.52,
  },
  resonance: {
    rhythm: 'default',
    edge: 0.32,
    line: 0.24,
    wash: 0.66,
  },
  density: {
    rhythm: 'default',
    edge: 0.46,
    line: 0.36,
    wash: 0.74,
  },
  proof: {
    rhythm: 'compact',
    edge: 0.58,
    line: 0.46,
    wash: 0.68,
  },
  pressure: {
    rhythm: 'compact',
    edge: 0.68,
    line: 0.56,
    wash: 0.78,
  },
  reopen: {
    rhythm: 'default',
    edge: 0.26,
    line: 0.18,
    wash: 0.24,
  },
  flow: {
    rhythm: 'compact',
    edge: 0.34,
    line: 0.24,
    wash: 0.46,
  },
} as const

export const SECTION_TONE_MAP = {
  default: 'approachable',
  opening: 'approachable',
  clarify: 'resonance',
  expand: 'resonance',
  deepen: 'density',
  threshold: 'proof',
  pressure: 'pressure',
  relief: 'reopen',
  arrival: 'flow',
} as const

export type Mode = 'light' | 'dark'
export type AxisKey = 'axisOpening' | 'axisTension' | 'axisDensity' | 'axisFlow'
export type EnergyKey = 'opening' | 'tension' | 'density' | 'flow'
export type EnergyInput = AxisKey | EnergyKey
export type EnergyMix = readonly [EnergyInput, EnergyInput]
export type ProtoStateKey =
  | 'approachable'
  | 'resonance'
  | 'density'
  | 'proof'
  | 'pressure'
  | 'reopen'
  | 'flow'
export type SurfaceToneKey =
  | 'open'
  | 'soft'
  | 'panel'
  | 'elevated'
  | 'inset'
  | 'band'
  | 'accent'
  | 'neutral'
  | 'subtle'
  | 'none'
  | 'intense'
export type SectionToneKey =
  | 'default'
  | 'opening'
  | 'clarify'
  | 'expand'
  | 'deepen'
  | 'threshold'
  | 'pressure'
  | 'relief'
  | 'arrival'

export type PaletteMode = {
  neutral: (typeof NEUTRAL)[Mode]
  energy: (typeof PROJECT_ENERGY)[Mode]
  status: (typeof FOUNDATION_STATUS)[Mode]
}

export const ENERGY_ALIASES: Record<EnergyKey, AxisKey> = {
  opening: 'axisOpening',
  tension: 'axisTension',
  density: 'axisDensity',
  flow: 'axisFlow',
} as const
