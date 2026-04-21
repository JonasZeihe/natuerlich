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
  overlayOpacity: number
  lineOpacity: number
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
    overlayOpacity: SECTION_TONES.default.overlayOpacity,
    lineOpacity: SECTION_TONES.default.lineOpacity,
  },
  opening: {
    base: mode === 'light' ? p.surface[0] : p.surface[0],
    edge: mode === 'light' ? p.axisEnergy.surface : p.axisEnergy[6],
    line: mode === 'light' ? p.axisEnergy.border : p.axisEnergy[4],
    overlayOpacity: SECTION_TONES.opening.overlayOpacity,
    lineOpacity: SECTION_TONES.opening.lineOpacity,
  },
  clarify: {
    base: mode === 'light' ? p.axisClarity.surface : p.surface[1],
    edge: mode === 'light' ? p.axisClarity[1] : p.axisClarity[6],
    line: mode === 'light' ? p.axisClarity.border : p.axisClarity[4],
    overlayOpacity: SECTION_TONES.clarify.overlayOpacity,
    lineOpacity: SECTION_TONES.clarify.lineOpacity,
  },
  expand: {
    base: mode === 'light' ? p.axisEnergy.surface : p.axisEnergy.surface,
    edge: mode === 'light' ? p.axisEnergy[1] : p.axisEnergy[6],
    line: mode === 'light' ? p.axisEnergy.border : p.axisEnergy[4],
    overlayOpacity: SECTION_TONES.expand.overlayOpacity,
    lineOpacity: SECTION_TONES.expand.lineOpacity,
  },
  deepen: {
    base: mode === 'light' ? p.axisResonance.surface : p.surface.backdrop,
    edge: mode === 'light' ? p.axisResonance[1] : p.axisResonance[6],
    line: mode === 'light' ? p.axisResonance.border : p.axisResonance[4],
    overlayOpacity: SECTION_TONES.deepen.overlayOpacity,
    lineOpacity: SECTION_TONES.deepen.lineOpacity,
  },
  relief: {
    base: mode === 'light' ? p.surface[0] : p.surface[1],
    edge: mode === 'light' ? p.axisClarity.surface : p.axisClarity[6],
    line: mode === 'light' ? p.axisClarity.border : p.axisClarity[4],
    overlayOpacity: SECTION_TONES.relief.overlayOpacity,
    lineOpacity: SECTION_TONES.relief.lineOpacity,
  },
  arrival: {
    base: mode === 'light' ? p.axisResonance.surface : p.axisResonance.surface,
    edge: mode === 'light' ? p.axisEnergy.surface : p.axisEnergy[6],
    line: mode === 'light' ? p.axisEnergy.border : p.axisEnergy[4],
    overlayOpacity: SECTION_TONES.arrival.overlayOpacity,
    lineOpacity: SECTION_TONES.arrival.lineOpacity,
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
        border: mode === 'light' ? p.surface[4] : p.surface[4],
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
