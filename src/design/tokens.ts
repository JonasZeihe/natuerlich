// src/design/tokens.ts
export const clampRem = (min: number, max: number) =>
  `clamp(${min}rem, calc(${min}rem + (${max - min}) * ((100vw - 350px) / 1000)), ${max}rem)`

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
    xs: '0 1px 2px rgba(14, 17, 20, 0.04)',
    sm: '0 12px 26px rgba(14, 17, 20, 0.08)',
    md: '0 22px 52px rgba(14, 17, 20, 0.14)',
    lg: '0 34px 86px rgba(14, 17, 20, 0.2)',
    glow: '0 0 0 2px rgba(106, 124, 137, 0.16), 0 18px 42px rgba(106, 124, 137, 0.12)',
  },
  dark: {
    xs: '0 1px 3px rgba(0, 0, 0, 0.26)',
    sm: '0 8px 18px rgba(0, 0, 0, 0.38)',
    md: '0 16px 34px rgba(0, 0, 0, 0.5)',
    lg: '0 28px 62px rgba(0, 0, 0, 0.64)',
    glow: '0 0 0 2px rgba(118, 138, 149, 0.18), 0 14px 34px rgba(118, 138, 149, 0.12)',
  },
} as const

export const BREAKPOINTS = {
  xs: '350px',
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
} as const

export const SECTION_TONES = {
  default: {
    overlayOpacity: 0,
    lineOpacity: 0,
    gapScale: 1,
    padScale: 1,
    washOpacity: 0,
  },
  opening: {
    overlayOpacity: 1,
    lineOpacity: 1,
    gapScale: 1.08,
    padScale: 1.08,
    washOpacity: 0.8,
  },
  clarify: {
    overlayOpacity: 1,
    lineOpacity: 1,
    gapScale: 0.98,
    padScale: 1,
    washOpacity: 0.48,
  },
  expand: {
    overlayOpacity: 1,
    lineOpacity: 1,
    gapScale: 1.04,
    padScale: 1.02,
    washOpacity: 0.62,
  },
  deepen: {
    overlayOpacity: 1,
    lineOpacity: 1,
    gapScale: 0.94,
    padScale: 0.96,
    washOpacity: 0.74,
  },
  threshold: {
    overlayOpacity: 1,
    lineOpacity: 1,
    gapScale: 0.9,
    padScale: 0.92,
    washOpacity: 0.82,
  },
  pressure: {
    overlayOpacity: 1,
    lineOpacity: 1,
    gapScale: 0.84,
    padScale: 0.9,
    washOpacity: 0.92,
  },
  relief: {
    overlayOpacity: 1,
    lineOpacity: 1,
    gapScale: 1.02,
    padScale: 1.04,
    washOpacity: 0.38,
  },
  arrival: {
    overlayOpacity: 1,
    lineOpacity: 1,
    gapScale: 0.96,
    padScale: 1,
    washOpacity: 0.52,
  },
} as const

export const PALETTE = {
  light: {
    axisClarity: {
      base: '#556973',
      hover: '#445760',
      active: '#33444C',
      disabled: '#BEC8CD',
      border: '#8C9CA4',
      surface: '#EEF2F3',
      contrast: '#FBFCFC',
      0: '#F6F8F8',
      1: '#EDF1F2',
      2: '#D8E0E3',
      3: '#9CAAB1',
      main: '#556973',
      4: '#445760',
      5: '#33444C',
      6: '#202D33',
    },
    axisEnergy: {
      base: '#9B5536',
      hover: '#804226',
      active: '#64301A',
      disabled: '#D8B9AA',
      border: '#BE866B',
      surface: '#F7EBE5',
      contrast: '#FDF9F7',
      0: '#FBF4F1',
      1: '#F3E2DA',
      2: '#E0C1B1',
      3: '#BF8160',
      main: '#9B5536',
      4: '#804226',
      5: '#64301A',
      6: '#421D0E',
    },
    axisResonance: {
      base: '#4A6670',
      hover: '#38515A',
      active: '#273B42',
      disabled: '#BBC7CB',
      border: '#8298A0',
      surface: '#ECF2F3',
      contrast: '#FAFCFC',
      0: '#F5F8F8',
      1: '#EAF0F1',
      2: '#D3DEE1',
      3: '#92A8AF',
      main: '#4A6670',
      4: '#38515A',
      5: '#273B42',
      6: '#17272D',
    },
    success: {
      base: '#3F6F58',
      hover: '#315946',
      active: '#213F30',
      disabled: '#BCD0C4',
      border: '#729681',
      surface: '#EBF3EE',
      contrast: '#F9FCFA',
      0: '#F4F8F5',
      1: '#E0EAE4',
      2: '#BED1C4',
      3: '#749883',
      main: '#3F6F58',
      4: '#315946',
      5: '#213F30',
      6: '#13281D',
    },
    warning: {
      base: '#8A6632',
      hover: '#715227',
      active: '#563C1B',
      disabled: '#D4C2A7',
      border: '#AE9566',
      surface: '#F6F0E6',
      contrast: '#FCFAF7',
      0: '#FAF6F0',
      1: '#EEE2CA',
      2: '#D7BD8E',
      3: '#A77C42',
      main: '#8A6632',
      4: '#715227',
      5: '#563C1B',
      6: '#392811',
    },
    danger: {
      base: '#864549',
      hover: '#6B3639',
      active: '#512729',
      disabled: '#D6BABC',
      border: '#B37E82',
      surface: '#F7EDEE',
      contrast: '#FDF9F9',
      0: '#FBF4F5',
      1: '#F0DDDE',
      2: '#D9B3B5',
      3: '#AC6B70',
      main: '#864549',
      4: '#6B3639',
      5: '#512729',
      6: '#351819',
    },
    neutral: {
      background: '#F3EFE9',
      surface: '#FCF8F2',
      border: '#C8BFB2',
      text: '#171818',
      textSubtle: '#5F6567',
      inverse: '#121516',
      backdrop: '#0D0F10',
    },
    surface: {
      0: '#FEFCF9',
      1: '#F8F3EC',
      2: '#EEE6DC',
      main: '#DDD2C5',
      4: '#C4B7A8',
      5: '#A29282',
      6: '#7C6D5E',
      card: '#FBF7F0',
      hover: '#F2ECE4',
      backdrop: '#E8E0D5',
    },
    depth: {
      0: '#F7F2EB',
      1: '#E5DCCF',
      2: '#CDBEAF',
      3: '#998878',
      main: '#66594C',
      5: '#3B322B',
      6: '#1E1A17',
      ultraLight: '#FEFCF9',
      dark: '#171818',
    },
    text: {
      main: '#171818',
      inverse: '#FCFAF7',
      subtle: '#5F6567',
    },
  },
  dark: {
    axisClarity: {
      base: '#93A6AF',
      hover: '#A9B8BE',
      active: '#748892',
      disabled: '#5A6468',
      border: '#6D7D84',
      surface: '#171D20',
      contrast: '#0D1012',
      0: '#EEF3F5',
      1: '#D9E2E6',
      2: '#B7C8CF',
      3: '#748892',
      main: '#93A6AF',
      4: '#5E717A',
      5: '#43535A',
      6: '#2B373C',
    },
    axisEnergy: {
      base: '#C07B58',
      hover: '#D29170',
      active: '#A36040',
      disabled: '#76635B',
      border: '#8E6D5E',
      surface: '#241814',
      contrast: '#120C09',
      0: '#FAF0EA',
      1: '#E8CEBF',
      2: '#D7A78E',
      3: '#C07B58',
      main: '#C07B58',
      4: '#A36040',
      5: '#7A472D',
      6: '#542B1A',
    },
    axisResonance: {
      base: '#7D99A1',
      hover: '#97B0B7',
      active: '#607A82',
      disabled: '#5B666A',
      border: '#6B7F85',
      surface: '#141B1D',
      contrast: '#0A0E10',
      0: '#EEF5F6',
      1: '#D8E4E7',
      2: '#B4C8CE',
      3: '#7D99A1',
      main: '#7D99A1',
      4: '#607A82',
      5: '#455B61',
      6: '#2D3E43',
    },
    success: {
      base: '#79A18A',
      hover: '#8EB49C',
      active: '#61856F',
      disabled: '#5B6660',
      border: '#657A6D',
      surface: '#141916',
      contrast: '#0A0D0B',
      0: '#EEF5F0',
      1: '#D4E2DA',
      2: '#ADC4B6',
      3: '#79A18A',
      main: '#79A18A',
      4: '#61856F',
      5: '#486255',
      6: '#2F4137',
    },
    warning: {
      base: '#B58F59',
      hover: '#C8A36B',
      active: '#966F46',
      disabled: '#71645A',
      border: '#84705B',
      surface: '#221A12',
      contrast: '#110D08',
      0: '#F8F1E7',
      1: '#E5D3B2',
      2: '#CCA56E',
      3: '#B58F59',
      main: '#B58F59',
      4: '#966F46',
      5: '#6F5333',
      6: '#4C3A23',
    },
    danger: {
      base: '#B5797E',
      hover: '#C88D92',
      active: '#965F64',
      disabled: '#726163',
      border: '#846568',
      surface: '#211516',
      contrast: '#100A0B',
      0: '#F8EDEE',
      1: '#E5CBCE',
      2: '#CA9A9F',
      3: '#B5797E',
      main: '#B5797E',
      4: '#965F64',
      5: '#6F464A',
      6: '#4B2E31',
    },
    neutral: {
      background: '#111416',
      surface: '#181C1E',
      border: '#2C3235',
      text: '#EDE4D8',
      textSubtle: '#A79D91',
      inverse: '#111416',
      backdrop: '#090B0C',
    },
    surface: {
      0: '#15191A',
      1: '#1B2022',
      2: '#22282B',
      main: '#2D3539',
      4: '#3D484D',
      5: '#55626A',
      6: '#74838B',
      card: '#1A1F21',
      hover: '#232A2D',
      backdrop: '#131719',
    },
    depth: {
      0: '#16191A',
      1: '#1E2325',
      2: '#2C3236',
      3: '#454C51',
      main: '#656D73',
      5: '#9BA3A9',
      6: '#D8DDE1',
      ultraLight: '#F4F6F7',
      dark: '#090B0C',
    },
    text: {
      main: '#EDE4D8',
      inverse: '#111416',
      subtle: '#A79D91',
    },
  },
} as const

export const AXIS_META = {
  axisClarity: {
    role: 'structure',
    primaryUsage: 'clarity',
    tone: 'mineral',
  },
  axisEnergy: {
    role: 'action',
    primaryUsage: 'opening',
    tone: 'ember',
  },
  axisResonance: {
    role: 'depth',
    primaryUsage: 'resonance',
    tone: 'water',
  },
} as const

export type Mode = 'light' | 'dark'
export type AxisKey = 'axisClarity' | 'axisEnergy' | 'axisResonance'
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
export type Palette = typeof PALETTE
export type PaletteMode = Palette[Mode]
export type AxisMeta = typeof AXIS_META
