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
  xs: '0 1px 2px rgba(18, 15, 12, 0.04)',
  sm: '0 10px 24px rgba(18, 15, 12, 0.07)',
  md: '0 18px 40px rgba(18, 15, 12, 0.1)',
  lg: '0 28px 64px rgba(18, 15, 12, 0.14)',
  glow: '0 0 0 2px rgba(160, 91, 38, 0.14), 0 18px 40px rgba(18, 15, 12, 0.08)',
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
  },
  section: {
    compact: {
      gap: 'clamp(0.8rem, 1.4vw, 1.1rem)',
      pad: 'clamp(1.45rem, 3.6vw, 2.45rem)',
    },
    default: {
      gap: 'clamp(1.2rem, 2.4vw, 1.8rem)',
      pad: 'clamp(2.25rem, 5.4vw, 4.6rem)',
    },
    spacious: {
      gap: 'clamp(1.7rem, 3.3vw, 2.8rem)',
      pad: 'clamp(3rem, 7.6vw, 7rem)',
    },
  },
  surfacePadding: {
    none: '0',
    sm: 'clamp(0.62rem, 1.35vw, 0.86rem)',
    md: 'clamp(0.82rem, 1.8vw, 1.14rem)',
    lg: 'clamp(1rem, 2.35vw, 1.48rem)',
  },
  containerInset: 'clamp(0.9rem, 3.4vw, 1.65rem)',
} as const

export const MATERIAL_COLORS = {
  canvas: '#EFE6D8',
  canvasWarm: '#F4E8D8',
  bone: '#FFF6E8',
  paper: '#FCF1E2',
  paperWarm: '#F4E1C5',
  linen: '#E6D9C8',
  ash: '#D8D0C5',
  ashWarm: '#CDB79F',
  ashCool: '#D7E1E2',
  stone: '#AA9A87',
  smoke: '#675D52',
  ink: '#181512',
  inkSoft: '#62584E',
  inkStrong: '#100D0B',
  ivory: '#FFF2DC',
  copper: '#A85F2E',
  copperDeep: '#63300F',
  ember: '#854326',
  emberDeep: '#2A1C16',
  umber: '#493224',
  clay: '#815044',
  clayDeep: '#422019',
  moss: '#4C7565',
  mossDeep: '#1F4438',
  blueAsh: '#DCE6E8',
  blueSteel: '#335D6D',
  blueDeep: '#17313A',
  nightClay: '#211914',
  nightField: '#2B211B',
  nightSurface: '#3A2B22',
  backdrop: '#0E0C0A',
} as const

export const FOUNDATION_STATUS = {
  success: {
    soft: '#E0E9DE',
    main: '#58795E',
    strong: '#273D2E',
  },
  warning: {
    soft: '#F1E1C7',
    main: '#98703A',
    strong: '#543817',
  },
  danger: {
    soft: '#EEDAD4',
    main: '#8D5A51',
    strong: '#4B241F',
  },
} as const

export const MOVEMENT_COLORS = {
  arrival: {
    stage: '#F2DEC2',
    field: '#F8EAD6',
    quiet: 'color-mix(in srgb, #FFF4E4 84%, transparent)',
    card: '#FFF4E4',
    note: '#E8C69D',
    threshold: '#D2A06E',
    deep: '#2D2018',
    text: MATERIAL_COLORS.ink,
    textSoft: MATERIAL_COLORS.inkSoft,
    textInverse: MATERIAL_COLORS.ivory,
    border: '#D1A67B',
    wash: '#EEC592',
    assetFriend: '#FFE0B2',
    assetCounter: '#7A3B1E',
    accent: MATERIAL_COLORS.copper,
  },
  grounding: {
    stage: '#EFE4D6',
    field: '#FAF0E4',
    quiet: 'color-mix(in srgb, #FAF0E4 72%, transparent)',
    card: '#FFF6E8',
    note: '#E6D4BD',
    threshold: '#C5AE95',
    deep: '#332820',
    text: MATERIAL_COLORS.ink,
    textSoft: MATERIAL_COLORS.inkSoft,
    textInverse: MATERIAL_COLORS.ivory,
    border: '#C6B39F',
    wash: '#D4BEA3',
    assetFriend: '#D4BEA3',
    assetCounter: MATERIAL_COLORS.umber,
    accent: '#865A37',
  },
  activation: {
    stage: '#F0E2D0',
    field: '#FAEEDA',
    quiet: 'color-mix(in srgb, #FAEEDA 70%, transparent)',
    card: '#FFF4E6',
    note: '#EBCFAF',
    threshold: '#CFA27B',
    deep: '#392417',
    text: MATERIAL_COLORS.ink,
    textSoft: MATERIAL_COLORS.inkSoft,
    textInverse: MATERIAL_COLORS.ivory,
    border: '#CFA27B',
    wash: '#E9BE8A',
    assetFriend: '#EBCFAF',
    assetCounter: MATERIAL_COLORS.ember,
    accent: MATERIAL_COLORS.copper,
  },
  practice: {
    stage: '#EEE5DA',
    field: '#F8EEE4',
    quiet: 'color-mix(in srgb, #F8EEE4 74%, transparent)',
    card: '#FFF5E9',
    note: '#E6D5C2',
    threshold: '#CFB39B',
    deep: '#2C211B',
    text: MATERIAL_COLORS.ink,
    textSoft: MATERIAL_COLORS.inkSoft,
    textInverse: MATERIAL_COLORS.ivory,
    border: '#C7B39E',
    wash: '#D4BEA6',
    assetFriend: '#E1CBB4',
    assetCounter: MATERIAL_COLORS.clay,
    accent: MATERIAL_COLORS.clay,
  },
  recognition: {
    stage: '#E8EDEE',
    field: '#F6F9F8',
    quiet: 'color-mix(in srgb, #F6F9F8 72%, transparent)',
    card: '#FEFFFF',
    note: '#DCE7E9',
    threshold: '#A7BDC4',
    deep: MATERIAL_COLORS.blueDeep,
    text: '#12191C',
    textSoft: '#5E6B70',
    textInverse: '#F7FAFA',
    border: '#A7BDC4',
    wash: '#CADDE1',
    assetFriend: '#DCE7E9',
    assetCounter: MATERIAL_COLORS.copper,
    accent: MATERIAL_COLORS.blueSteel,
  },
  integration: {
    stage: '#EEF0E8',
    field: '#F8F6ED',
    quiet: 'color-mix(in srgb, #F8F6ED 74%, transparent)',
    card: '#FFF6E8',
    note: '#E3E6D6',
    threshold: '#B8C0A6',
    deep: MATERIAL_COLORS.mossDeep,
    text: '#171815',
    textSoft: '#62655D',
    textInverse: '#F7F2E8',
    border: '#B8C0A6',
    wash: '#D9E0C6',
    assetFriend: '#E3E6D6',
    assetCounter: MATERIAL_COLORS.moss,
    accent: MATERIAL_COLORS.moss,
  },
  nextStep: {
    stage: '#F3E7D8',
    field: '#FCF3E6',
    quiet: 'color-mix(in srgb, #FCF3E6 74%, transparent)',
    card: '#FFF6E8',
    note: '#EBD8BD',
    threshold: '#D0B596',
    deep: '#312419',
    text: MATERIAL_COLORS.ink,
    textSoft: MATERIAL_COLORS.inkSoft,
    textInverse: MATERIAL_COLORS.ivory,
    border: '#D0B596',
    wash: '#EDCDA0',
    assetFriend: '#EBD8BD',
    assetCounter: MATERIAL_COLORS.copper,
    accent: MATERIAL_COLORS.copper,
  },
} as const

export const PROJECT_ENERGY = {
  axisOpening: {
    soft: MOVEMENT_COLORS.arrival.note,
    main: MATERIAL_COLORS.copper,
    strong: MATERIAL_COLORS.copperDeep,
  },
  axisTension: {
    soft: '#E2D0C7',
    main: MATERIAL_COLORS.clay,
    strong: MATERIAL_COLORS.clayDeep,
  },
  axisDensity: {
    soft: MATERIAL_COLORS.blueAsh,
    main: MATERIAL_COLORS.blueSteel,
    strong: MATERIAL_COLORS.blueDeep,
  },
  axisFlow: {
    soft: '#DDE9DF',
    main: MATERIAL_COLORS.moss,
    strong: MATERIAL_COLORS.mossDeep,
  },
} as const

export const PROTO_STATES = {
  approachable: {
    rhythm: 'spacious',
    edge: 0.1,
    line: 0.04,
    wash: 0.3,
  },
  resonance: {
    rhythm: 'default',
    edge: 0.2,
    line: 0.14,
    wash: 0.38,
  },
  density: {
    rhythm: 'default',
    edge: 0.32,
    line: 0.24,
    wash: 0.46,
  },
  proof: {
    rhythm: 'compact',
    edge: 0.42,
    line: 0.32,
    wash: 0.42,
  },
  pressure: {
    rhythm: 'compact',
    edge: 0.56,
    line: 0.44,
    wash: 0.5,
  },
  reopen: {
    rhythm: 'default',
    edge: 0.2,
    line: 0.12,
    wash: 0.24,
  },
  flow: {
    rhythm: 'compact',
    edge: 0.24,
    line: 0.16,
    wash: 0.28,
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
