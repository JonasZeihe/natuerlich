// src/design/semantic.ts
import {
  ENERGY_ALIASES,
  FOUNDATION_STATUS,
  MATERIAL_COLORS,
  MOVEMENT_COLORS,
  PROJECT_ENERGY,
  PROTO_STATES,
  SECTION_TONE_MAP,
  type AxisKey,
  type EnergyInput,
  type EnergyMix,
  type MovementKey,
  type ProtoStateKey,
  type SectionToneKey,
  type SurfaceToneKey,
} from './tokens'

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

export type MovementRole = {
  stage: string
  field: string
  quiet: string
  card: string
  note: string
  threshold: string
  deep: string
  text: string
  textSoft: string
  textInverse: string
  border: string
  wash: string
  assetFriend: string
  assetCounter: string
  accent: string
}

export type IntentRole = {
  text: string
  surface: string
  surfaceStrong: string
  border: string
  contrast: string
  focusRing: string
}

export type SurfaceToneRole = {
  bg: string
  fg: string
  border: string
  shadow: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'glow'
  backdrop: 'none'
}

export type StateToneRole = {
  base: string
  edge: string
  line: string
  wash: string
  overlayOpacity: number
  lineOpacity: number
  washOpacity: number
  gapScale: number
  padScale: number
}

export type SurfaceRoles = {
  canvas: string
  chrome: string
  stage: string
  field: string
  quiet: string
  card: string
  note: string
  threshold: string
  deep: string
  backdrop: string
  interactive: string
}

export type TextRoles = {
  primary: string
  secondary: string
  subtle: string
  inverse: string
  link: string
  linkHover: string
}

export type BorderRoles = {
  subtle: string
  strong: string
  accent: string
  inverse: string
}

export type FocusRoles = {
  ring: string
  ringInset: string
}

export type OverlayRoles = {
  scrim: string
}

export type ButtonRole = {
  fg: string
  bg: string
  border: string
  shadow: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'glow'
  hoverFg: string
  hoverBg: string
  hoverBorder: string
  hoverShadow: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'glow'
  activeFg: string
  activeBg: string
  activeBorder: string
  activeShadow: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'glow'
  disabledFg: string
  disabledBg: string
  disabledBorder: string
}

export type InteractiveRoles = {
  button: {
    primary: ButtonRole
    secondary: ButtonRole
    ghost: ButtonRole
    link: ButtonRole
    danger: ButtonRole
  }
}

export type SemanticRoles = {
  text: TextRoles
  surface: SurfaceRoles
  surfaceTone: Record<SurfaceToneKey, SurfaceToneRole>
  stateTone: Record<ProtoStateKey, StateToneRole>
  sectionTone: Record<SectionToneKey, StateToneRole>
  border: BorderRoles
  focus: FocusRoles
  overlay: OverlayRoles
  axis: Record<AxisKey, AxisRole>
  movement: Record<MovementKey, MovementRole>
  intent: {
    neutral: IntentRole
    info: IntentRole
    success: IntentRole
    warning: IntentRole
    danger: IntentRole
  }
  interactive: InteractiveRoles
}

const mixHex = (first: string, second: string, weight = 0.5) =>
  `color-mix(in srgb, ${first} ${Math.round(weight * 100)}%, ${second})`

const isAxisKey = (value: string): value is AxisKey =>
  value === 'axisOpening' ||
  value === 'axisTension' ||
  value === 'axisDensity' ||
  value === 'axisFlow'

export const resolveAxisKey = (input: EnergyInput): AxisKey => {
  if (isAxisKey(input)) return input
  return ENERGY_ALIASES[input]
}

const buildAxisRole = (key: AxisKey): AxisRole => {
  const group = PROJECT_ENERGY[key]

  return {
    text: group.strong,
    fill: group.main,
    fillHover: mixHex(group.main, group.strong, 0.68),
    fillActive: mixHex(group.main, group.strong, 0.82),
    surface: group.soft,
    surfaceStrong: mixHex(group.soft, MATERIAL_COLORS.paperWarm, 0.64),
    border: mixHex(group.main, MATERIAL_COLORS.stone, 0.56),
    contrast: MATERIAL_COLORS.ivory,
    focusRing: group.main,
  }
}

const mergeAxisRoles = (first: AxisRole, second: AxisRole): AxisRole => ({
  text: mixHex(first.text, second.text),
  fill: mixHex(first.fill, second.fill),
  fillHover: mixHex(first.fillHover, second.fillHover),
  fillActive: mixHex(first.fillActive, second.fillActive),
  surface: mixHex(first.surface, second.surface),
  surfaceStrong: mixHex(first.surfaceStrong, second.surfaceStrong),
  border: mixHex(first.border, second.border),
  contrast: first.contrast,
  focusRing: mixHex(first.focusRing, second.focusRing),
})

export const resolveAxisMix = (mix?: EnergyMix): AxisRole | null => {
  if (!mix) return null

  const first = resolveAxisKey(mix[0])
  const second = resolveAxisKey(mix[1])

  return mergeAxisRoles(buildAxisRole(first), buildAxisRole(second))
}

const buildIntentRole = (
  input: AxisKey | 'success' | 'warning' | 'danger'
): IntentRole => {
  if (input === 'success' || input === 'warning' || input === 'danger') {
    const group = FOUNDATION_STATUS[input]

    return {
      text: group.strong,
      surface: group.soft,
      surfaceStrong: mixHex(group.soft, MATERIAL_COLORS.paperWarm, 0.62),
      border: mixHex(group.main, MATERIAL_COLORS.stone, 0.56),
      contrast: MATERIAL_COLORS.ivory,
      focusRing: group.main,
    }
  }

  const axis = buildAxisRole(input)

  return {
    text: axis.text,
    surface: axis.surface,
    surfaceStrong: axis.surfaceStrong,
    border: axis.border,
    contrast: axis.contrast,
    focusRing: axis.focusRing,
  }
}

const buildStateToneRoles = (): Record<ProtoStateKey, StateToneRole> => {
  const createStateTone = (state: ProtoStateKey): StateToneRole => {
    const config = PROTO_STATES[state]

    return {
      base: MATERIAL_COLORS.paper,
      edge: MATERIAL_COLORS.stone,
      line: MATERIAL_COLORS.ashWarm,
      wash: mixHex(MATERIAL_COLORS.paper, MATERIAL_COLORS.paperWarm, 0.56),
      overlayOpacity: config.edge,
      lineOpacity: config.line,
      washOpacity: config.wash,
      gapScale:
        config.rhythm === 'spacious'
          ? 1.06
          : config.rhythm === 'compact'
            ? 0.9
            : 1,
      padScale:
        config.rhythm === 'spacious'
          ? 1.06
          : config.rhythm === 'compact'
            ? 0.94
            : 1,
    }
  }

  return {
    approachable: createStateTone('approachable'),
    resonance: createStateTone('resonance'),
    density: createStateTone('density'),
    proof: createStateTone('proof'),
    pressure: createStateTone('pressure'),
    reopen: createStateTone('reopen'),
    flow: createStateTone('flow'),
  }
}

const createMovementSectionTone = (
  movement: MovementRole,
  state: StateToneRole
): StateToneRole => ({
  ...state,
  base: movement.stage,
  edge: movement.border,
  line: mixHex(movement.border, movement.field),
  wash: movement.wash,
})

const buildSectionToneRoles = (
  stateTone: Record<ProtoStateKey, StateToneRole>
): Record<SectionToneKey, StateToneRole> => ({
  default: createMovementSectionTone(
    MOVEMENT_COLORS.arrival,
    stateTone[SECTION_TONE_MAP.default]
  ),
  opening: createMovementSectionTone(
    MOVEMENT_COLORS.arrival,
    stateTone[SECTION_TONE_MAP.opening]
  ),
  clarify: createMovementSectionTone(
    MOVEMENT_COLORS.grounding,
    stateTone[SECTION_TONE_MAP.clarify]
  ),
  expand: createMovementSectionTone(
    MOVEMENT_COLORS.activation,
    stateTone[SECTION_TONE_MAP.expand]
  ),
  deepen: createMovementSectionTone(
    MOVEMENT_COLORS.grounding,
    stateTone[SECTION_TONE_MAP.deepen]
  ),
  threshold: createMovementSectionTone(
    MOVEMENT_COLORS.recognition,
    stateTone[SECTION_TONE_MAP.threshold]
  ),
  pressure: createMovementSectionTone(
    MOVEMENT_COLORS.practice,
    stateTone[SECTION_TONE_MAP.pressure]
  ),
  relief: createMovementSectionTone(
    MOVEMENT_COLORS.integration,
    stateTone[SECTION_TONE_MAP.relief]
  ),
  arrival: createMovementSectionTone(
    MOVEMENT_COLORS.nextStep,
    stateTone[SECTION_TONE_MAP.arrival]
  ),
})

const buildSolidButtonRole = (axis: AxisRole): ButtonRole => ({
  fg: MATERIAL_COLORS.ivory,
  bg: axis.fill,
  border: axis.fill,
  shadow: 'none',
  hoverFg: MATERIAL_COLORS.ivory,
  hoverBg: axis.fillHover,
  hoverBorder: axis.fillHover,
  hoverShadow: 'none',
  activeFg: MATERIAL_COLORS.ivory,
  activeBg: axis.fillActive,
  activeBorder: axis.fillActive,
  activeShadow: 'none',
  disabledFg: MATERIAL_COLORS.inkSoft,
  disabledBg: MATERIAL_COLORS.ash,
  disabledBorder: MATERIAL_COLORS.ashWarm,
})

const buildSubtleButtonRole = (role: IntentRole | AxisRole): ButtonRole => ({
  fg: role.text,
  bg: role.surface,
  border: role.border,
  shadow: 'none',
  hoverFg: role.text,
  hoverBg: role.surfaceStrong,
  hoverBorder: role.border,
  hoverShadow: 'none',
  activeFg: role.text,
  activeBg: role.surface,
  activeBorder: role.border,
  activeShadow: 'none',
  disabledFg: MATERIAL_COLORS.inkSoft,
  disabledBg: MATERIAL_COLORS.ash,
  disabledBorder: MATERIAL_COLORS.ashWarm,
})

const buildSurfaceToneRoles = (): Record<SurfaceToneKey, SurfaceToneRole> => ({
  bare: {
    bg: 'transparent',
    fg: MATERIAL_COLORS.ink,
    border: 'transparent',
    shadow: 'none',
    backdrop: 'none',
  },
  stage: {
    bg: MOVEMENT_COLORS.arrival.stage,
    fg: MOVEMENT_COLORS.arrival.text,
    border: 'transparent',
    shadow: 'none',
    backdrop: 'none',
  },
  field: {
    bg: MOVEMENT_COLORS.arrival.field,
    fg: MOVEMENT_COLORS.arrival.text,
    border: MOVEMENT_COLORS.arrival.border,
    shadow: 'none',
    backdrop: 'none',
  },
  quiet: {
    bg: MOVEMENT_COLORS.arrival.quiet,
    fg: MOVEMENT_COLORS.arrival.text,
    border: 'transparent',
    shadow: 'none',
    backdrop: 'none',
  },
  card: {
    bg: MOVEMENT_COLORS.arrival.card,
    fg: MOVEMENT_COLORS.arrival.text,
    border: MOVEMENT_COLORS.arrival.border,
    shadow: 'none',
    backdrop: 'none',
  },
  note: {
    bg: MOVEMENT_COLORS.arrival.note,
    fg: MOVEMENT_COLORS.arrival.text,
    border: MOVEMENT_COLORS.arrival.border,
    shadow: 'none',
    backdrop: 'none',
  },
  threshold: {
    bg: MOVEMENT_COLORS.arrival.threshold,
    fg: MOVEMENT_COLORS.arrival.text,
    border: mixHex(
      MOVEMENT_COLORS.arrival.threshold,
      MOVEMENT_COLORS.arrival.accent,
      0.58
    ),
    shadow: 'none',
    backdrop: 'none',
  },
  deep: {
    bg: MOVEMENT_COLORS.arrival.deep,
    fg: MOVEMENT_COLORS.arrival.textInverse,
    border: mixHex(
      MOVEMENT_COLORS.arrival.deep,
      MOVEMENT_COLORS.arrival.accent,
      0.64
    ),
    shadow: 'none',
    backdrop: 'none',
  },
})

export const buildSemantic = (): SemanticRoles => {
  const axis = {
    axisOpening: buildAxisRole('axisOpening'),
    axisTension: buildAxisRole('axisTension'),
    axisDensity: buildAxisRole('axisDensity'),
    axisFlow: buildAxisRole('axisFlow'),
  }

  const stateTone = buildStateToneRoles()

  const surfaces: SurfaceRoles = {
    canvas: MATERIAL_COLORS.canvas,
    chrome: mixHex(MATERIAL_COLORS.paper, MATERIAL_COLORS.canvasWarm, 0.64),
    stage: MOVEMENT_COLORS.arrival.stage,
    field: MOVEMENT_COLORS.arrival.field,
    quiet: MOVEMENT_COLORS.arrival.quiet,
    card: MOVEMENT_COLORS.arrival.card,
    note: MOVEMENT_COLORS.arrival.note,
    threshold: MOVEMENT_COLORS.arrival.threshold,
    deep: MOVEMENT_COLORS.arrival.deep,
    backdrop: MATERIAL_COLORS.backdrop,
    interactive: mixHex(MATERIAL_COLORS.paperWarm, MATERIAL_COLORS.bone, 0.52),
  }

  const neutralIntent: IntentRole = {
    text: MATERIAL_COLORS.ink,
    surface: MATERIAL_COLORS.paperWarm,
    surfaceStrong: mixHex(MATERIAL_COLORS.paperWarm, MATERIAL_COLORS.bone, 0.5),
    border: MATERIAL_COLORS.ashWarm,
    contrast: MATERIAL_COLORS.ink,
    focusRing: axis.axisOpening.focusRing,
  }

  const infoIntent = buildIntentRole('axisFlow')
  const successIntent = buildIntentRole('success')
  const warningIntent = buildIntentRole('warning')
  const dangerIntent = buildIntentRole('danger')

  return {
    text: {
      primary: MATERIAL_COLORS.ink,
      secondary: mixHex(MATERIAL_COLORS.inkSoft, MATERIAL_COLORS.ink, 0.34),
      subtle: MATERIAL_COLORS.inkSoft,
      inverse: MATERIAL_COLORS.ivory,
      link: axis.axisDensity.fill,
      linkHover: axis.axisDensity.fillHover,
    },
    surface: surfaces,
    surfaceTone: buildSurfaceToneRoles(),
    stateTone,
    sectionTone: buildSectionToneRoles(stateTone),
    border: {
      subtle: MATERIAL_COLORS.ashWarm,
      strong: MATERIAL_COLORS.stone,
      accent: axis.axisOpening.border,
      inverse: MATERIAL_COLORS.ivory,
    },
    focus: {
      ring: axis.axisOpening.focusRing,
      ringInset: axis.axisOpening.fillHover,
    },
    overlay: {
      scrim: MATERIAL_COLORS.backdrop,
    },
    axis,
    movement: MOVEMENT_COLORS,
    intent: {
      neutral: neutralIntent,
      info: infoIntent,
      success: successIntent,
      warning: warningIntent,
      danger: dangerIntent,
    },
    interactive: {
      button: {
        primary: buildSolidButtonRole(axis.axisDensity),
        secondary: buildSolidButtonRole(axis.axisOpening),
        ghost: buildSubtleButtonRole(axis.axisFlow),
        link: {
          fg: axis.axisDensity.fill,
          bg: 'transparent',
          border: 'transparent',
          shadow: 'none',
          hoverFg: axis.axisDensity.fillHover,
          hoverBg: 'transparent',
          hoverBorder: 'transparent',
          hoverShadow: 'none',
          activeFg: axis.axisDensity.fillActive,
          activeBg: 'transparent',
          activeBorder: 'transparent',
          activeShadow: 'none',
          disabledFg: MATERIAL_COLORS.inkSoft,
          disabledBg: 'transparent',
          disabledBorder: 'transparent',
        },
        danger: buildSubtleButtonRole(dangerIntent),
      },
    },
  }
}
