// src/design/semantic.ts
import {
  ENERGY_ALIASES,
  FOUNDATION_STATUS,
  NEUTRAL,
  PROJECT_ENERGY,
  PROTO_STATES,
  SECTION_TONE_MAP,
  type AxisKey,
  type EnergyInput,
  type EnergyMix,
  type Mode,
  type ProtoStateKey,
  type SectionToneKey,
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
  panel: string
  panelAlt: string
  panelSubtle: string
  elevated: string
  inset: string
  interactive: string
  backdrop: string
  soft: string
  band: string
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
  toggle: {
    fg: string
    bg: string
    border: string
    icon: string
    hoverBg: string
    hoverBorder: string
  }
}

export type SemanticRoles = {
  text: TextRoles
  surface: SurfaceRoles
  surfaceTone: {
    open: SurfaceToneRole
    soft: SurfaceToneRole
    panel: SurfaceToneRole
    elevated: SurfaceToneRole
    inset: SurfaceToneRole
    band: SurfaceToneRole
  }
  stateTone: Record<ProtoStateKey, StateToneRole>
  sectionTone: Record<SectionToneKey, StateToneRole>
  border: BorderRoles
  focus: FocusRoles
  overlay: OverlayRoles
  axis: Record<AxisKey, AxisRole>
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

const buildAxisRole = (mode: Mode, key: AxisKey): AxisRole => {
  const group = PROJECT_ENERGY[mode][key]
  const neutral = NEUTRAL[mode]

  return {
    text: mode === 'light' ? group.strong : group.main,
    fill: group.main,
    fillHover: mixHex(group.main, group.strong, 0.68),
    fillActive: mixHex(group.main, group.strong, 0.82),
    surface: group.soft,
    surfaceStrong: mixHex(group.soft, neutral.surfaceAlt, 0.64),
    border: mixHex(group.main, neutral.borderStrong, 0.56),
    contrast: neutral.inverse,
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

export const resolveAxisMix = (
  mode: Mode,
  mix?: EnergyMix
): AxisRole | null => {
  if (!mix) return null

  const first = resolveAxisKey(mix[0])
  const second = resolveAxisKey(mix[1])

  return mergeAxisRoles(buildAxisRole(mode, first), buildAxisRole(mode, second))
}

const buildIntentRole = (
  mode: Mode,
  input: AxisKey | 'success' | 'warning' | 'danger'
): IntentRole => {
  const neutral = NEUTRAL[mode]

  if (input === 'success' || input === 'warning' || input === 'danger') {
    const group = FOUNDATION_STATUS[mode][input]

    return {
      text: mode === 'light' ? group.strong : group.main,
      surface: group.soft,
      surfaceStrong: mixHex(group.soft, neutral.surfaceAlt, 0.62),
      border: mixHex(group.main, neutral.borderStrong, 0.56),
      contrast: neutral.inverse,
      focusRing: group.main,
    }
  }

  const axis = buildAxisRole(mode, input)

  return {
    text: axis.text,
    surface: axis.surface,
    surfaceStrong: axis.surfaceStrong,
    border: axis.border,
    contrast: axis.contrast,
    focusRing: axis.focusRing,
  }
}

const buildStateToneRoles = (
  mode: Mode
): Record<ProtoStateKey, StateToneRole> => {
  const neutral = NEUTRAL[mode]

  const createStateTone = (state: ProtoStateKey): StateToneRole => {
    const config = PROTO_STATES[state]

    return {
      base: neutral.surface,
      edge: neutral.borderStrong,
      line: neutral.borderSoft,
      wash: mixHex(neutral.surface, neutral.elevated, 0.56),
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

const buildSectionToneRoles = (
  stateTone: Record<ProtoStateKey, StateToneRole>
): Record<SectionToneKey, StateToneRole> => ({
  default: stateTone[SECTION_TONE_MAP.default],
  opening: stateTone[SECTION_TONE_MAP.opening],
  clarify: stateTone[SECTION_TONE_MAP.clarify],
  expand: stateTone[SECTION_TONE_MAP.expand],
  deepen: stateTone[SECTION_TONE_MAP.deepen],
  threshold: stateTone[SECTION_TONE_MAP.threshold],
  pressure: stateTone[SECTION_TONE_MAP.pressure],
  relief: stateTone[SECTION_TONE_MAP.relief],
  arrival: stateTone[SECTION_TONE_MAP.arrival],
})

const buildSolidButtonRole = (
  axis: AxisRole,
  neutral: (typeof NEUTRAL)[Mode]
): ButtonRole => ({
  fg: neutral.inverse,
  bg: axis.fill,
  border: axis.fill,
  shadow: 'none',
  hoverFg: neutral.inverse,
  hoverBg: axis.fillHover,
  hoverBorder: axis.fillHover,
  hoverShadow: 'none',
  activeFg: neutral.inverse,
  activeBg: axis.fillActive,
  activeBorder: axis.fillActive,
  activeShadow: 'none',
  disabledFg: neutral.textSoft,
  disabledBg: neutral.surfaceAlt,
  disabledBorder: neutral.borderSoft,
})

const buildSubtleButtonRole = (
  role: IntentRole | AxisRole,
  neutral: (typeof NEUTRAL)[Mode]
): ButtonRole => ({
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
  disabledFg: neutral.textSoft,
  disabledBg: neutral.surfaceAlt,
  disabledBorder: neutral.borderSoft,
})

export const buildSemantic = (mode: Mode): SemanticRoles => {
  const neutral = NEUTRAL[mode]

  const axis = {
    axisOpening: buildAxisRole(mode, 'axisOpening'),
    axisTension: buildAxisRole(mode, 'axisTension'),
    axisDensity: buildAxisRole(mode, 'axisDensity'),
    axisFlow: buildAxisRole(mode, 'axisFlow'),
  }

  const stateTone = buildStateToneRoles(mode)

  const surfaces: SurfaceRoles = {
    canvas: neutral.background,
    chrome: neutral.surface,
    panel: neutral.surface,
    panelAlt: neutral.surfaceAlt,
    panelSubtle: mixHex(neutral.surface, axis.axisFlow.surface, 0.18),
    elevated: neutral.elevated,
    inset: neutral.inset,
    interactive: mixHex(neutral.surfaceAlt, neutral.elevated, 0.52),
    backdrop: neutral.backdrop,
    soft: mixHex(neutral.surface, neutral.elevated, 0.5),
    band: mixHex(neutral.surface, axis.axisDensity.surface, 0.26),
  }

  const neutralIntent: IntentRole = {
    text: neutral.text,
    surface: neutral.surfaceAlt,
    surfaceStrong: mixHex(neutral.surfaceAlt, neutral.elevated, 0.5),
    border: neutral.borderSoft,
    contrast: neutral.text,
    focusRing: axis.axisOpening.focusRing,
  }

  const infoIntent = buildIntentRole(mode, 'axisFlow')
  const successIntent = buildIntentRole(mode, 'success')
  const warningIntent = buildIntentRole(mode, 'warning')
  const dangerIntent = buildIntentRole(mode, 'danger')

  return {
    text: {
      primary: neutral.text,
      secondary: mixHex(neutral.textSoft, neutral.text, 0.34),
      subtle: neutral.textSoft,
      inverse: neutral.inverse,
      link: axis.axisDensity.fill,
      linkHover: axis.axisDensity.fillHover,
    },
    surface: surfaces,
    surfaceTone: {
      open: {
        bg: 'transparent',
        fg: neutral.text,
        border: 'transparent',
        shadow: 'none',
        backdrop: 'none',
      },
      soft: {
        bg: surfaces.soft,
        fg: neutral.text,
        border: neutral.borderSoft,
        shadow: 'none',
        backdrop: 'none',
      },
      panel: {
        bg: surfaces.panel,
        fg: neutral.text,
        border: neutral.borderSoft,
        shadow: 'none',
        backdrop: 'none',
      },
      elevated: {
        bg: surfaces.elevated,
        fg: neutral.text,
        border: neutral.borderStrong,
        shadow: 'none',
        backdrop: 'none',
      },
      inset: {
        bg: surfaces.inset,
        fg: neutral.text,
        border: neutral.borderSoft,
        shadow: 'none',
        backdrop: 'none',
      },
      band: {
        bg: surfaces.band,
        fg: neutral.text,
        border: axis.axisDensity.border,
        shadow: 'none',
        backdrop: 'none',
      },
    },
    stateTone,
    sectionTone: buildSectionToneRoles(stateTone),
    border: {
      subtle: neutral.borderSoft,
      strong: neutral.borderStrong,
      accent: axis.axisOpening.border,
      inverse: neutral.inverse,
    },
    focus: {
      ring: axis.axisOpening.focusRing,
      ringInset: axis.axisOpening.fillHover,
    },
    overlay: {
      scrim: mode === 'light' ? '#101417' : '#040607',
    },
    axis,
    intent: {
      neutral: neutralIntent,
      info: infoIntent,
      success: successIntent,
      warning: warningIntent,
      danger: dangerIntent,
    },
    interactive: {
      button: {
        primary: buildSolidButtonRole(axis.axisDensity, neutral),
        secondary: buildSolidButtonRole(axis.axisOpening, neutral),
        ghost: buildSubtleButtonRole(axis.axisFlow, neutral),
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
          disabledFg: neutral.textSoft,
          disabledBg: 'transparent',
          disabledBorder: 'transparent',
        },
        danger: buildSubtleButtonRole(dangerIntent, neutral),
      },
      toggle: {
        fg: neutral.text,
        bg: neutral.surface,
        border: neutral.borderSoft,
        icon: axis.axisOpening.fill,
        hoverBg: neutral.surfaceAlt,
        hoverBorder: neutral.borderStrong,
      },
    },
  }
}
