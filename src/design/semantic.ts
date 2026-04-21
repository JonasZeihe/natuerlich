// src/design/semantic.ts
import {
  PALETTE,
  SECTION_TONES,
  type AxisKey,
  type Mode,
  type PaletteMode,
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
  shadow: string
  backdrop: string
}

export type SectionToneRole = {
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
  sectionTone: Record<SectionToneKey, SectionToneRole>
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

const buildAxisRole = (group: PaletteMode[AxisKey]): AxisRole => ({
  text: group[5],
  fill: group.base,
  fillHover: group.hover,
  fillActive: group.active,
  surface: group.surface,
  surfaceStrong: group[1],
  border: group.border,
  contrast: group.contrast,
  focusRing: group.base,
})

const buildIntentRole = (
  contrast: string,
  group: PaletteMode['success' | 'warning' | 'danger'] | PaletteMode[AxisKey]
): IntentRole => ({
  text: group[5],
  surface: group.surface,
  surfaceStrong: group[1],
  border: group.border,
  contrast,
  focusRing: group.base,
})

const buildSolidButtonRole = (
  mode: Mode,
  p: PaletteMode,
  role: AxisRole,
  options: {
    inverse?: boolean
  } = {}
): ButtonRole => {
  const foreground =
    options.inverse && mode === 'light' ? p.text.inverse : role.contrast

  return {
    fg: foreground,
    bg: role.fill,
    border: role.fill,
    shadow: 'none',
    hoverFg: foreground,
    hoverBg: role.fillHover,
    hoverBorder: role.fillHover,
    hoverShadow: 'none',
    activeFg: foreground,
    activeBg: role.fillActive,
    activeBorder: role.fillActive,
    activeShadow: 'none',
    disabledFg: p.text.subtle,
    disabledBg: p.surface[1],
    disabledBorder: p.neutral.border,
  }
}

const buildSubtleButtonRole = (
  p: PaletteMode,
  role: IntentRole | AxisRole
): ButtonRole => ({
  fg: role.text,
  bg: role.surface,
  border: role.border,
  shadow: 'none',
  hoverFg: role.text,
  hoverBg: role.surfaceStrong,
  hoverBorder: role.text,
  hoverShadow: 'none',
  activeFg: role.text,
  activeBg: role.surface,
  activeBorder: role.border,
  activeShadow: 'none',
  disabledFg: p.text.subtle,
  disabledBg: p.surface[1],
  disabledBorder: p.neutral.border,
})

const buildSectionToneRoles = (
  mode: Mode,
  p: PaletteMode
): Record<SectionToneKey, SectionToneRole> => ({
  default: {
    base: 'transparent',
    edge: 'transparent',
    line: 'transparent',
    wash: 'transparent',
    overlayOpacity: SECTION_TONES.default.overlayOpacity,
    lineOpacity: SECTION_TONES.default.lineOpacity,
    washOpacity: SECTION_TONES.default.washOpacity,
    gapScale: SECTION_TONES.default.gapScale,
    padScale: SECTION_TONES.default.padScale,
  },
  opening: {
    base: p.surface[0],
    edge: mode === 'light' ? p.axisEnergy.surface : p.axisEnergy[6],
    line: mode === 'light' ? p.axisEnergy.border : p.axisEnergy[4],
    wash: mode === 'light' ? p.axisEnergy[0] : p.axisEnergy.surface,
    overlayOpacity: SECTION_TONES.opening.overlayOpacity,
    lineOpacity: SECTION_TONES.opening.lineOpacity,
    washOpacity: SECTION_TONES.opening.washOpacity,
    gapScale: SECTION_TONES.opening.gapScale,
    padScale: SECTION_TONES.opening.padScale,
  },
  clarify: {
    base: mode === 'light' ? p.axisClarity.surface : p.surface[1],
    edge: mode === 'light' ? p.axisClarity[1] : p.axisClarity[6],
    line: mode === 'light' ? p.axisClarity.border : p.axisClarity[4],
    wash: mode === 'light' ? p.axisClarity[0] : p.axisClarity.surface,
    overlayOpacity: SECTION_TONES.clarify.overlayOpacity,
    lineOpacity: SECTION_TONES.clarify.lineOpacity,
    washOpacity: SECTION_TONES.clarify.washOpacity,
    gapScale: SECTION_TONES.clarify.gapScale,
    padScale: SECTION_TONES.clarify.padScale,
  },
  expand: {
    base: p.axisEnergy.surface,
    edge: mode === 'light' ? p.axisEnergy[1] : p.axisEnergy[6],
    line: mode === 'light' ? p.axisEnergy.border : p.axisEnergy[4],
    wash: mode === 'light' ? p.axisEnergy[0] : p.axisEnergy.surface,
    overlayOpacity: SECTION_TONES.expand.overlayOpacity,
    lineOpacity: SECTION_TONES.expand.lineOpacity,
    washOpacity: SECTION_TONES.expand.washOpacity,
    gapScale: SECTION_TONES.expand.gapScale,
    padScale: SECTION_TONES.expand.padScale,
  },
  deepen: {
    base: mode === 'light' ? p.axisResonance.surface : p.surface.backdrop,
    edge: mode === 'light' ? p.axisResonance[1] : p.axisResonance[6],
    line: mode === 'light' ? p.axisResonance.border : p.axisResonance[4],
    wash: mode === 'light' ? p.axisResonance[0] : p.axisResonance.surface,
    overlayOpacity: SECTION_TONES.deepen.overlayOpacity,
    lineOpacity: SECTION_TONES.deepen.lineOpacity,
    washOpacity: SECTION_TONES.deepen.washOpacity,
    gapScale: SECTION_TONES.deepen.gapScale,
    padScale: SECTION_TONES.deepen.padScale,
  },
  threshold: {
    base: mode === 'light' ? p.surface.card : p.surface.backdrop,
    edge: mode === 'light' ? p.axisClarity[4] : p.axisClarity[5],
    line: mode === 'light' ? p.axisClarity[5] : p.axisClarity[3],
    wash: mode === 'light' ? p.axisClarity.surface : p.axisClarity.surface,
    overlayOpacity: SECTION_TONES.threshold.overlayOpacity,
    lineOpacity: SECTION_TONES.threshold.lineOpacity,
    washOpacity: SECTION_TONES.threshold.washOpacity,
    gapScale: SECTION_TONES.threshold.gapScale,
    padScale: SECTION_TONES.threshold.padScale,
  },
  pressure: {
    base: mode === 'light' ? p.depth.ultraLight : p.neutral.background,
    edge: mode === 'light' ? p.axisResonance[5] : p.axisResonance[4],
    line: mode === 'light' ? p.axisClarity[6] : p.axisClarity[3],
    wash: mode === 'light' ? p.axisResonance[1] : p.axisResonance.surface,
    overlayOpacity: SECTION_TONES.pressure.overlayOpacity,
    lineOpacity: SECTION_TONES.pressure.lineOpacity,
    washOpacity: SECTION_TONES.pressure.washOpacity,
    gapScale: SECTION_TONES.pressure.gapScale,
    padScale: SECTION_TONES.pressure.padScale,
  },
  relief: {
    base: mode === 'light' ? p.surface[0] : p.surface[1],
    edge: mode === 'light' ? p.axisClarity.surface : p.axisClarity[6],
    line: mode === 'light' ? p.axisClarity.border : p.axisClarity[4],
    wash: mode === 'light' ? p.surface[0] : p.surface[1],
    overlayOpacity: SECTION_TONES.relief.overlayOpacity,
    lineOpacity: SECTION_TONES.relief.lineOpacity,
    washOpacity: SECTION_TONES.relief.washOpacity,
    gapScale: SECTION_TONES.relief.gapScale,
    padScale: SECTION_TONES.relief.padScale,
  },
  arrival: {
    base: p.axisResonance.surface,
    edge: mode === 'light' ? p.axisEnergy.surface : p.axisEnergy[6],
    line: mode === 'light' ? p.axisEnergy.border : p.axisEnergy[4],
    wash: mode === 'light' ? p.axisEnergy[0] : p.axisResonance.surface,
    overlayOpacity: SECTION_TONES.arrival.overlayOpacity,
    lineOpacity: SECTION_TONES.arrival.lineOpacity,
    washOpacity: SECTION_TONES.arrival.washOpacity,
    gapScale: SECTION_TONES.arrival.gapScale,
    padScale: SECTION_TONES.arrival.padScale,
  },
})

export const buildSemantic = (mode: Mode): SemanticRoles => {
  const p = PALETTE[mode]

  const axis = {
    axisClarity: buildAxisRole(p.axisClarity),
    axisEnergy: buildAxisRole(p.axisEnergy),
    axisResonance: buildAxisRole(p.axisResonance),
  }

  const neutralIntent: IntentRole = {
    text: p.text.main,
    surface: p.surface[1],
    surfaceStrong: p.surface[2],
    border: p.neutral.border,
    contrast: p.text.main,
    focusRing: p.axisEnergy.base,
  }

  const infoIntent = buildIntentRole(p.text.main, p.axisResonance)
  const successIntent = buildIntentRole(p.text.main, p.success)
  const warningIntent = buildIntentRole(p.text.main, p.warning)
  const dangerIntent = buildIntentRole(p.text.main, p.danger)

  const surfaces: SurfaceRoles = {
    canvas: p.neutral.background,
    chrome: p.surface[0],
    panel: p.surface.card,
    panelAlt: mode === 'light' ? p.surface[1] : p.surface[2],
    panelSubtle: mode === 'light' ? p.axisResonance.surface : p.surface[1],
    elevated: mode === 'light' ? p.neutral.surface : p.surface[2],
    inset: mode === 'light' ? p.surface[2] : p.surface.backdrop,
    interactive: p.surface.hover,
    backdrop: p.surface.backdrop,
    soft: mode === 'light' ? p.surface[0] : p.surface[1],
    band: mode === 'light' ? p.axisResonance.surface : p.axisClarity.surface,
  }

  return {
    text: {
      primary: p.text.main,
      secondary: mode === 'light' ? p.depth.main : p.depth[5],
      subtle: p.text.subtle,
      inverse: p.text.inverse,
      link: p.axisClarity.base,
      linkHover: p.axisClarity.hover,
    },
    surface: surfaces,
    surfaceTone: {
      open: {
        bg: 'transparent',
        fg: p.text.main,
        border: 'transparent',
        shadow: 'none',
        backdrop: 'none',
      },
      soft: {
        bg: surfaces.soft,
        fg: p.text.main,
        border: mode === 'light' ? p.surface[2] : p.surface[4],
        shadow: 'none',
        backdrop: 'none',
      },
      panel: {
        bg: surfaces.panel,
        fg: p.text.main,
        border: mode === 'light' ? p.surface[2] : p.surface[4],
        shadow: 'none',
        backdrop: 'none',
      },
      elevated: {
        bg: surfaces.elevated,
        fg: p.text.main,
        border: mode === 'light' ? p.axisClarity.border : p.axisClarity[4],
        shadow: 'none',
        backdrop: 'none',
      },
      inset: {
        bg: surfaces.inset,
        fg: p.text.main,
        border: p.surface[4],
        shadow: 'none',
        backdrop: 'none',
      },
      band: {
        bg: surfaces.band,
        fg: p.text.main,
        border: mode === 'light' ? p.axisResonance.border : p.axisResonance[4],
        shadow: 'none',
        backdrop: 'none',
      },
    },
    sectionTone: buildSectionToneRoles(mode, p),
    border: {
      subtle: mode === 'light' ? p.surface[2] : p.surface[4],
      strong: mode === 'light' ? p.axisClarity.border : p.axisClarity[4],
      accent: p.axisEnergy.border,
      inverse: p.text.inverse,
    },
    focus: {
      ring: p.axisEnergy.base,
      ringInset: p.axisEnergy.hover,
    },
    overlay: {
      scrim: mode === 'light' ? '#101417' : '#05070A',
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
        primary: buildSolidButtonRole(mode, p, axis.axisClarity, {
          inverse: true,
        }),
        secondary: buildSolidButtonRole(mode, p, axis.axisEnergy, {
          inverse: true,
        }),
        ghost: buildSubtleButtonRole(p, axis.axisResonance),
        link: {
          fg: p.axisClarity.base,
          bg: 'transparent',
          border: 'transparent',
          shadow: 'none',
          hoverFg: p.axisClarity.hover,
          hoverBg: 'transparent',
          hoverBorder: 'transparent',
          hoverShadow: 'none',
          activeFg: p.axisClarity.hover,
          activeBg: 'transparent',
          activeBorder: 'transparent',
          activeShadow: 'none',
          disabledFg: p.text.subtle,
          disabledBg: 'transparent',
          disabledBorder: 'transparent',
        },
        danger: buildSubtleButtonRole(p, dangerIntent),
      },
      toggle: {
        fg: p.text.main,
        bg: mode === 'light' ? p.surface[0] : p.surface[1],
        border: p.axisClarity.border,
        icon: p.axisEnergy.base,
        hoverBg: mode === 'light' ? p.surface[1] : p.surface[2],
        hoverBorder: p.axisEnergy.border,
      },
    },
  }
}
