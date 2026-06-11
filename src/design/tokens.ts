// src/design/tokens.ts
export const clampRem = (min: number, max: number) =>
  `clamp(${min}rem, calc(${min}rem + (${max - min}) * ((100vw - 360px) / 1080)), ${max}rem)`

export const TYPOGRAPHY = {
  fontFamily: {
    primary: "'Geist','Inter','Segoe UI',Arial,sans-serif",
    secondary: "'Geist','Inter','Segoe UI',Arial,sans-serif",
    button: "'Geist','Inter','Segoe UI',Arial,sans-serif",
  },
  fontSize: {
    h1: clampRem(1.72, 2.9),
    h2: clampRem(1.52, 2.08),
    h3: clampRem(1.18, 1.5),
    h4: clampRem(1.06, 1.2),
    body: clampRem(1, 1.07),
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
  xs: '0 1px 2px rgba(12, 18, 20, 0.04)',
  sm: '0 10px 24px rgba(12, 18, 20, 0.07)',
  md: '0 18px 40px rgba(12, 18, 20, 0.1)',
  lg: '0 28px 64px rgba(12, 18, 20, 0.14)',
  glow: '0 0 0 2px rgba(47, 110, 88, 0.14), 0 18px 40px rgba(12, 18, 20, 0.08)',
} as const

export const BREAKPOINTS = {
  xs: '360px',
  sm: '640px',
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
    full: 'none',
  },
  inset: {
    page: 'clamp(1rem, 2.2vw, 2rem)',
    rail: 'clamp(1rem, 3vw, 1.5rem)',
  },
  section: {
    compact: 'clamp(2.4rem, 4.8vw, 4rem)',
    default: 'clamp(3.6rem, 6.8vw, 6rem)',
    spacious: 'clamp(4.8rem, 8.8vw, 8.5rem)',
  },
  flow: {
    text: 'clamp(0.7rem, 0.8vw, 0.95rem)',
    block: 'clamp(1rem, 1.2vw, 1.4rem)',
    cluster: 'clamp(1.45rem, 2vw, 2.35rem)',
    region: 'clamp(2.25rem, 3.4vw, 4rem)',
    chapter: 'clamp(3rem, 5vw, 6rem)',
  },
  surface: {
    none: '0',
    sm: 'clamp(0.75rem, 1vw, 1rem)',
    md: 'clamp(1rem, 1.35vw, 1.45rem)',
    lg: 'clamp(1.35rem, 2vw, 2.1rem)',
  },
  grid: {
    gap: 'clamp(1rem, 1.8vw, 1.75rem)',
  },
  rail: {
    gap: 'clamp(0.9rem, 1.6vw, 1.45rem)',
    peek: 'clamp(1.35rem, 8vw, 2.8rem)',
  },
} as const

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

export const ENERGY = {
  arrival: {
    deep: PALETTE.morningDeep,
    main: PALETTE.morning,
    light: PALETTE.morningLight,
    breath: PALETTE.ivory,
    ink: PALETTE.ink,
  },
  daoyin: {
    deep: PALETTE.jadeDeep,
    main: PALETTE.jade,
    light: PALETTE.jadeLight,
  },
  qigong: {
    deep: PALETTE.blueDeep,
    main: PALETTE.blue,
    light: PALETTE.blueLight,
  },
  yoga: {
    deep: PALETTE.sandDeep,
    main: PALETTE.sand,
    light: PALETTE.sandLight,
  },
  taiji: {
    deep: PALETTE.blueDeep,
    main: PALETTE.blue,
    light: PALETTE.ivory,
  },
  contact: {
    deep: PALETTE.mossDeep,
    main: PALETTE.moss,
    light: PALETTE.mossLight,
  },
  recognition: {
    deep: PALETTE.blueDeep,
    main: PALETTE.blue,
    light: PALETTE.blueLight,
  },
} as const

export const COLOR = {
  text: {
    primary: PALETTE.ink,
    soft: PALETTE.inkSoft,
    subtle: PALETTE.inkMuted,
    inverse: PALETTE.ivory,
    link: PALETTE.blue,
    linkHover: PALETTE.blueDeep,
  },
  surface: {
    canvas: PALETTE.canvas,
    chrome: 'color-mix(in srgb, #FCF7EF 72%, #ECEBE5)',
    bare: 'transparent',
    quiet: 'color-mix(in srgb, #FCF7EF 76%, transparent)',
    card: PALETTE.paper,
    note: PALETTE.jadeLight,
    field: PALETTE.bone,
    deep: PALETTE.blueDeep,
    interactive: PALETTE.paper,
    backdrop: PALETTE.backdrop,
  },
  border: {
    subtle: 'color-mix(in srgb, #8D8B84 42%, transparent)',
    strong: PALETTE.stone,
    inverse: PALETTE.ivory,
    focus: PALETTE.morningDeep,
  },
  section: {
    default: PALETTE.morningLight,
    opening: PALETTE.morningLight,
    clarify: '#E8E7E1',
    expand: '#F0E2D0',
    deepen: '#E8E7E1',
    threshold: '#E8EDEE',
    relation: '#d17f37',
    pressure: '#E2E4DF',
    relief: '#E7F0DF',
    arrival: '#E3F0DF',
  },
  action: {
    primary: {
      text: PALETTE.ivory,
      background: PALETTE.blueDeep,
      border: PALETTE.blueDeep,
      hoverText: PALETTE.ivory,
      hoverBackground: PALETTE.ink,
      hoverBorder: PALETTE.ink,
      disabledText: PALETTE.inkMuted,
      disabledBackground: PALETTE.stoneSoft,
      disabledBorder: PALETTE.stoneSoft,
    },
    secondary: {
      text: PALETTE.ivory,
      background: PALETTE.morningDeep,
      border: PALETTE.morningDeep,
      hoverText: PALETTE.ivory,
      hoverBackground: PALETTE.sandDeep,
      hoverBorder: PALETTE.sandDeep,
      disabledText: PALETTE.inkMuted,
      disabledBackground: PALETTE.stoneSoft,
      disabledBorder: PALETTE.stoneSoft,
    },
    ghost: {
      text: PALETTE.mossDeep,
      background: PALETTE.mossLight,
      border: 'color-mix(in srgb, #2F6E58 54%, transparent)',
      hoverText: PALETTE.mossDeep,
      hoverBackground: 'color-mix(in srgb, #D1E6C8 72%, #FCF7EF)',
      hoverBorder: PALETTE.moss,
      disabledText: PALETTE.inkMuted,
      disabledBackground: PALETTE.stoneSoft,
      disabledBorder: PALETTE.stoneSoft,
    },
    link: {
      text: PALETTE.blue,
      background: 'transparent',
      border: 'transparent',
      hoverText: PALETTE.blueDeep,
      hoverBackground: 'transparent',
      hoverBorder: 'transparent',
      disabledText: PALETTE.inkMuted,
      disabledBackground: 'transparent',
      disabledBorder: 'transparent',
    },
    danger: {
      text: PALETTE.dangerDeep,
      background: PALETTE.dangerLight,
      border: 'color-mix(in srgb, #8D5A51 56%, transparent)',
      hoverText: PALETTE.ivory,
      hoverBackground: PALETTE.danger,
      hoverBorder: PALETTE.danger,
      disabledText: PALETTE.inkMuted,
      disabledBackground: PALETTE.stoneSoft,
      disabledBorder: PALETTE.stoneSoft,
    },
  },
  highlight: {
    neutral: PALETTE.ink,
    breath: PALETTE.morningDeep,
    stone: PALETTE.inkSoft,
    daoyin: PALETTE.jade,
    qigong: PALETTE.blue,
    yoga: PALETTE.sandDeep,
    taiji: PALETTE.blueDeep,
  },
} as const

export const MATERIAL_COLORS = {
  canvas: PALETTE.canvas,
  canvasWarm: PALETTE.morningLight,
  bone: PALETTE.bone,
  paper: PALETTE.paper,
  paperWarm: PALETTE.morningLight,
  linen: PALETTE.stoneSoft,
  ash: PALETTE.stoneSoft,
  ashWarm: PALETTE.stone,
  ashCool: PALETTE.ash,
  stone: PALETTE.stone,
  smoke: PALETTE.inkSoft,
  ink: PALETTE.ink,
  inkSoft: PALETTE.inkSoft,
  inkStrong: PALETTE.ink,
  ivory: PALETTE.ivory,
  copper: PALETTE.morningDeep,
  copperDeep: PALETTE.sandDeep,
  ember: PALETTE.morningDeep,
  emberDeep: PALETTE.ink,
  umber: PALETTE.inkSoft,
  clay: PALETTE.sandDeep,
  clayDeep: PALETTE.ink,
  moss: PALETTE.moss,
  mossDeep: PALETTE.mossDeep,
  jade: PALETTE.jade,
  jadeDeep: PALETTE.jadeDeep,
  sand: PALETTE.sand,
  sandDeep: PALETTE.sandDeep,
  blueAsh: PALETTE.blueLight,
  blueSteel: PALETTE.blue,
  blueDeep: PALETTE.blueDeep,
  nightInk: PALETTE.ink,
  nightClay: PALETTE.ink,
  nightField: PALETTE.blueDeep,
  nightSurface: PALETTE.inkSoft,
  backdrop: PALETTE.backdrop,
} as const

export const MOVEMENT_COLORS = {
  arrival: {
    stage: COLOR.section.default,
    field: PALETTE.morningLight,
    quiet: 'color-mix(in srgb, #FFF4E3 82%, transparent)',
    card: PALETTE.paper,
    note: PALETTE.sandLight,
    threshold: PALETTE.morning,
    deep: PALETTE.ink,
    text: PALETTE.ink,
    textSoft: PALETTE.inkSoft,
    textInverse: PALETTE.ivory,
    border: 'color-mix(in srgb, #B87336 42%, transparent)',
    wash: PALETTE.morning,
    assetFriend: PALETTE.ivory,
    assetCounter: PALETTE.ink,
    accent: PALETTE.morningDeep,
  },
  grounding: {
    stage: COLOR.section.clarify,
    field: '#F4F1EA',
    quiet: 'color-mix(in srgb, #F4F1EA 82%, transparent)',
    card: PALETTE.paper,
    note: PALETTE.stoneSoft,
    threshold: PALETTE.stone,
    deep: PALETTE.ink,
    text: PALETTE.ink,
    textSoft: PALETTE.inkSoft,
    textInverse: PALETTE.ivory,
    border: 'color-mix(in srgb, #8D8B84 46%, transparent)',
    wash: PALETTE.stoneSoft,
    assetFriend: PALETTE.stoneSoft,
    assetCounter: PALETTE.inkSoft,
    accent: PALETTE.stone,
  },
  activation: {
    stage: COLOR.section.expand,
    field: '#FAEEDC',
    quiet: 'color-mix(in srgb, #FAEEDC 82%, transparent)',
    card: PALETTE.paper,
    note: PALETTE.sandLight,
    threshold: PALETTE.sand,
    deep: PALETTE.ink,
    text: PALETTE.ink,
    textSoft: PALETTE.inkSoft,
    textInverse: PALETTE.ivory,
    border: 'color-mix(in srgb, #D3B17E 52%, transparent)',
    wash: PALETTE.sand,
    assetFriend: PALETTE.sandLight,
    assetCounter: PALETTE.sandDeep,
    accent: PALETTE.sandDeep,
  },
  practice: {
    stage: COLOR.section.pressure,
    field: '#EFF1EB',
    quiet: 'color-mix(in srgb, #F4F5EF 82%, transparent)',
    card: PALETTE.paper,
    note: PALETTE.jadeLight,
    threshold: PALETTE.jade,
    deep: PALETTE.ink,
    text: PALETTE.ink,
    textSoft: PALETTE.inkSoft,
    textInverse: PALETTE.ivory,
    border: 'color-mix(in srgb, #3D7D62 44%, transparent)',
    wash: PALETTE.jadeLight,
    assetFriend: PALETTE.ivory,
    assetCounter: PALETTE.ink,
    accent: PALETTE.jade,
  },
  recognition: {
    stage: COLOR.section.threshold,
    field: '#F6F9F8',
    quiet: 'color-mix(in srgb, #F6F9F8 82%, transparent)',
    card: '#FEFFFF',
    note: PALETTE.blueLight,
    threshold: '#A7BDC4',
    deep: PALETTE.blueDeep,
    text: PALETTE.ink,
    textSoft: PALETTE.inkSoft,
    textInverse: PALETTE.ivory,
    border: 'color-mix(in srgb, #315D70 44%, transparent)',
    wash: PALETTE.blueLight,
    assetFriend: PALETTE.blueLight,
    assetCounter: PALETTE.morningDeep,
    accent: PALETTE.blue,
  },
  integration: {
    stage: COLOR.section.relief,
    field: '#F3F8EC',
    quiet: 'color-mix(in srgb, #F5F8ED 82%, transparent)',
    card: PALETTE.paper,
    note: PALETTE.mossLight,
    threshold: PALETTE.moss,
    deep: PALETTE.mossDeep,
    text: PALETTE.ink,
    textSoft: PALETTE.inkSoft,
    textInverse: PALETTE.ivory,
    border: 'color-mix(in srgb, #2F6E58 46%, transparent)',
    wash: PALETTE.mossLight,
    assetFriend: PALETTE.mossLight,
    assetCounter: PALETTE.moss,
    accent: PALETTE.moss,
  },
  nextStep: {
    stage: COLOR.section.arrival,
    field: '#F1F8EC',
    quiet: 'color-mix(in srgb, #F4FAEF 84%, transparent)',
    card: '#FBFFF6',
    note: PALETTE.mossLight,
    threshold: PALETTE.moss,
    deep: PALETTE.mossDeep,
    text: PALETTE.ink,
    textSoft: PALETTE.inkSoft,
    textInverse: PALETTE.ivory,
    border: 'color-mix(in srgb, #2F6E58 46%, transparent)',
    wash: PALETTE.mossLight,
    assetFriend: PALETTE.mossLight,
    assetCounter: PALETTE.moss,
    accent: PALETTE.moss,
  },
} as const

export const SECTION_TONE_MAP = {
  default: 'approachable',
  opening: 'approachable',
  clarify: 'resonance',
  expand: 'resonance',
  deepen: 'density',
  threshold: 'proof',
  relation: 'approachable',
  pressure: 'pressure',
  relief: 'reopen',
  arrival: 'flow',
} as const

export type AxisKey = 'axisOpening' | 'axisTension' | 'axisDensity' | 'axisFlow'
export type EnergyKey = 'opening' | 'tension' | 'density' | 'flow'
export type EnergyInput = AxisKey | EnergyKey
export type EnergyMix = readonly [EnergyInput, EnergyInput]
export type MovementKey = keyof typeof MOVEMENT_COLORS
export type SurfaceToneKey =
  | 'bare'
  | 'stage'
  | 'field'
  | 'quiet'
  | 'card'
  | 'note'
  | 'threshold'
  | 'deep'
export type SectionToneKey = keyof typeof COLOR.section
export type HighlightKey = keyof typeof COLOR.highlight
export type ActionKey = keyof typeof COLOR.action

export const ENERGY_ALIASES: Record<EnergyKey, AxisKey> = {
  opening: 'axisOpening',
  tension: 'axisTension',
  density: 'axisDensity',
  flow: 'axisFlow',
} as const
