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
    body: clampRem(1, 1.08),
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
  xs: '0 1px 2px rgba(18, 17, 15, 0.04)',
  sm: '0 10px 24px rgba(18, 17, 15, 0.07)',
  md: '0 18px 40px rgba(18, 17, 15, 0.11)',
  lg: '0 28px 64px rgba(18, 17, 15, 0.15)',
  glow: '0 0 0 2px rgba(164, 95, 43, 0.14), 0 18px 40px rgba(18, 17, 15, 0.08)',
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

export const MATERIAL_COLORS = {
  canvas: '#F0E8DC',
  canvasWarm: '#F6EDE1',
  bone: '#FFF8EE',
  paper: '#FCF4E9',
  paperWarm: '#F5E4CE',
  linen: '#ECE1D2',
  ash: '#DED8CE',
  ashWarm: '#D7C5AE',
  ashCool: '#DDE7EA',
  stone: '#B7AA98',
  smoke: '#71675E',
  ink: '#181614',
  inkSoft: '#676058',
  inkStrong: '#0F0E0D',
  ivory: '#FFF2DC',
  copper: '#B96A30',
  copperDeep: '#6F350E',
  ember: '#8D4A24',
  emberDeep: '#2B211B',
  umber: '#4B3327',
  clay: '#8C5143',
  clayDeep: '#4B241B',
  moss: '#49796A',
  mossDeep: '#1F453B',
  blueAsh: '#DDE7EA',
  blueSteel: '#315D6D',
  blueDeep: '#17313A',
  nightClay: '#211914',
  nightField: '#2C211B',
  nightSurface: '#3A2A22',
  backdrop: '#0E0C0A',
} as const

export const FOUNDATION_STATUS = {
  success: {
    soft: '#E0ECE3',
    main: '#527A63',
    strong: '#243D2F',
  },
  warning: {
    soft: '#F2E5CF',
    main: '#9A713B',
    strong: '#593D17',
  },
  danger: {
    soft: '#EEDDD8',
    main: '#985F55',
    strong: '#512620',
  },
} as const

export const MOVEMENT_COLORS = {
  arrival: {
    stage: '#F6EDE1',
    field: '#FCF4E9',
    quiet: 'color-mix(in srgb, #FCF4E9 72%, transparent)',
    card: '#FFF8EE',
    note: '#F5E4CE',
    threshold: '#E5CBB0',
    deep: '#2B211B',
    text: '#181614',
    textSoft: '#676058',
    textInverse: '#FFF2DC',
    border: '#D7BFA6',
    wash: '#F5DDBF',
    assetFriend: '#F5E4CE',
    assetCounter: '#8D4A24',
    accent: '#B96A30',
  },
  grounding: {
    stage: '#EFE5D7',
    field: '#FAF1E6',
    quiet: 'color-mix(in srgb, #FAF1E6 70%, transparent)',
    card: '#FFF8EE',
    note: '#EAD8C1',
    threshold: '#CBB59E',
    deep: '#332821',
    text: '#181614',
    textSoft: '#655D55',
    textInverse: '#FFF2DC',
    border: '#CBB9A5',
    wash: '#D7C1A6',
    assetFriend: '#D7C1A6',
    assetCounter: '#4B3327',
    accent: '#8D5C35',
  },
  activation: {
    stage: '#F0E5D5',
    field: '#FBF0E2',
    quiet: 'color-mix(in srgb, #FBF0E2 68%, transparent)',
    card: '#FFF5E8',
    note: '#EED4B8',
    threshold: '#D1AA85',
    deep: '#3A2418',
    text: '#181614',
    textSoft: '#665B52',
    textInverse: '#FFF2DC',
    border: '#D1AA85',
    wash: '#EDC394',
    assetFriend: '#EED4B8',
    assetCounter: '#B96A30',
    accent: '#B96A30',
  },
  practice: {
    stage: '#2C211B',
    field: '#3A2A22',
    quiet: 'color-mix(in srgb, #3A2A22 82%, transparent)',
    card: '#4B3327',
    note: '#5D3A29',
    threshold: '#8F6247',
    deep: '#17110E',
    text: '#FFF3E6',
    textSoft: '#D8C4B1',
    textInverse: '#17110E',
    border: '#8F6247',
    wash: '#5D321F',
    assetFriend: '#CF7941',
    assetCounter: '#DDE7EA',
    accent: '#CF7941',
  },
  recognition: {
    stage: '#E9EDEF',
    field: '#F7FAFA',
    quiet: 'color-mix(in srgb, #F7FAFA 72%, transparent)',
    card: '#FEFFFF',
    note: '#DDE8EB',
    threshold: '#A9BEC5',
    deep: '#17313A',
    text: '#12191C',
    textSoft: '#5E6B70',
    textInverse: '#F7FAFA',
    border: '#A9BEC5',
    wash: '#CDE0E5',
    assetFriend: '#DDE8EB',
    assetCounter: '#B96A30',
    accent: '#315D6D',
  },
  integration: {
    stage: '#EEF0E8',
    field: '#FAF8EF',
    quiet: 'color-mix(in srgb, #FAF8EF 72%, transparent)',
    card: '#FFF8EE',
    note: '#E4E7D8',
    threshold: '#BAC2A8',
    deep: '#1F453B',
    text: '#171815',
    textSoft: '#62655D',
    textInverse: '#F7F2E8',
    border: '#BAC2A8',
    wash: '#DCE2C9',
    assetFriend: '#E4E7D8',
    assetCounter: '#49796A',
    accent: '#49796A',
  },
  nextStep: {
    stage: '#F3E8DA',
    field: '#FCF4E8',
    quiet: 'color-mix(in srgb, #FCF4E8 72%, transparent)',
    card: '#FFF8EE',
    note: '#EEDAC1',
    threshold: '#D4B99B',
    deep: '#312419',
    text: '#181614',
    textSoft: '#676058',
    textInverse: '#FFF2DC',
    border: '#D4B99B',
    wash: '#F0CFA6',
    assetFriend: '#EEDAC1',
    assetCounter: '#A76537',
    accent: '#A76537',
  },
} as const

export const PROJECT_ENERGY = {
  axisOpening: {
    soft: MOVEMENT_COLORS.arrival.note,
    main: MATERIAL_COLORS.copper,
    strong: MATERIAL_COLORS.copperDeep,
  },
  axisTension: {
    soft: '#E8D8CF',
    main: MATERIAL_COLORS.clay,
    strong: MATERIAL_COLORS.clayDeep,
  },
  axisDensity: {
    soft: MATERIAL_COLORS.blueAsh,
    main: MATERIAL_COLORS.blueSteel,
    strong: MATERIAL_COLORS.blueDeep,
  },
  axisFlow: {
    soft: '#DFEDE6',
    main: MATERIAL_COLORS.moss,
    strong: MATERIAL_COLORS.mossDeep,
  },
} as const

export const PROTO_STATES = {
  approachable: {
    rhythm: 'spacious',
    edge: 0.1,
    line: 0,
    wash: 0.34,
  },
  resonance: {
    rhythm: 'default',
    edge: 0.2,
    line: 0.14,
    wash: 0.44,
  },
  density: {
    rhythm: 'default',
    edge: 0.32,
    line: 0.24,
    wash: 0.54,
  },
  proof: {
    rhythm: 'compact',
    edge: 0.42,
    line: 0.32,
    wash: 0.5,
  },
  pressure: {
    rhythm: 'compact',
    edge: 0.56,
    line: 0.46,
    wash: 0.64,
  },
  reopen: {
    rhythm: 'default',
    edge: 0.2,
    line: 0.12,
    wash: 0.26,
  },
  flow: {
    rhythm: 'compact',
    edge: 0.24,
    line: 0.16,
    wash: 0.32,
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

export type AxisKey = 'axisOpening' | 'axisTension' | 'axisDensity' | 'axisFlow'
export type EnergyKey = 'opening' | 'tension' | 'density' | 'flow'
export type EnergyInput = AxisKey | EnergyKey
export type EnergyMix = readonly [EnergyInput, EnergyInput]
export type MovementKey =
  | 'arrival'
  | 'grounding'
  | 'activation'
  | 'practice'
  | 'recognition'
  | 'integration'
  | 'nextStep'
export type ProtoStateKey =
  | 'approachable'
  | 'resonance'
  | 'density'
  | 'proof'
  | 'pressure'
  | 'reopen'
  | 'flow'
export type SurfaceToneKey =
  | 'bare'
  | 'stage'
  | 'field'
  | 'quiet'
  | 'card'
  | 'note'
  | 'threshold'
  | 'deep'
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

export const ENERGY_ALIASES: Record<EnergyKey, AxisKey> = {
  opening: 'axisOpening',
  tension: 'axisTension',
  density: 'axisDensity',
  flow: 'axisFlow',
} as const
