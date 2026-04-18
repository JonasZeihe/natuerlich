// src/design/semantic.ts
import { PALETTE, type AxisKey, type Mode, type PaletteMode } from './tokens'

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
  text: group.main,
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
  text: string,
  group: PaletteMode['success' | 'warning' | 'danger'] | PaletteMode[AxisKey]
): IntentRole => ({
  text: group.main,
  surface: group.surface,
  surfaceStrong: group[1],
  border: group.border,
  contrast: text,
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
    shadow: 'sm',
    hoverFg: foreground,
    hoverBg: role.fillHover,
    hoverBorder: role.fillHover,
    hoverShadow: 'md',
    activeFg: foreground,
    activeBg: role.fillActive,
    activeBorder: role.fillActive,
    activeShadow: 'sm',
    disabledFg: p.text.subtle,
    disabledBg: p.surface[1],
    disabledBorder: p.neutral.border,
  }
}

const buildSubtleButtonRole = (
  p: PaletteMode,
  role: IntentRole | AxisRole
): ButtonRole => ({
  fg: role.contrast,
  bg: role.surface,
  border: role.border,
  shadow: 'xs',
  hoverFg: role.contrast,
  hoverBg: role.surfaceStrong,
  hoverBorder: role.text,
  hoverShadow: 'sm',
  activeFg: role.contrast,
  activeBg: role.surface,
  activeBorder: role.border,
  activeShadow: 'xs',
  disabledFg: p.text.subtle,
  disabledBg: p.surface[1],
  disabledBorder: p.neutral.border,
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
    focusRing: p.axisClarity.base,
  }

  const infoIntent = buildIntentRole(p.text.main, p.axisResonance)
  const successIntent = buildIntentRole(p.text.main, p.success)
  const warningIntent = buildIntentRole(p.text.main, p.warning)
  const dangerIntent = buildIntentRole(p.text.main, p.danger)

  return {
    text: {
      primary: p.text.main,
      secondary: mode === 'light' ? p.depth.main : p.depth[5],
      subtle: p.text.subtle,
      inverse: p.text.inverse,
      link: p.axisClarity.base,
      linkHover: p.axisClarity.hover,
    },
    surface: {
      canvas: p.neutral.background,
      chrome: p.surface[0],
      panel: p.surface.card,
      panelAlt: p.surface[1],
      panelSubtle: p.surface[2],
      elevated: p.surface[0],
      inset: p.neutral.backdrop,
      interactive: p.surface.hover,
      backdrop: p.surface.backdrop,
    },
    border: {
      subtle: p.neutral.border,
      strong: p.surface[4],
      accent: p.axisClarity.border,
      inverse: p.text.inverse,
    },
    focus: {
      ring: p.axisEnergy.base,
      ringInset: p.axisEnergy.hover,
    },
    overlay: {
      scrim:
        mode === 'light' ? 'rgba(17, 20, 24, 0.46)' : 'rgba(5, 7, 10, 0.68)',
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
        ghost: buildSubtleButtonRole(p, neutralIntent),
        link: {
          fg: p.axisClarity.base,
          bg: 'transparent',
          border: 'transparent',
          shadow: 'none',
          hoverFg: p.axisClarity.hover,
          hoverBg: 'transparent',
          hoverBorder: 'transparent',
          hoverShadow: 'none',
          activeFg: p.axisClarity.base,
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
        bg: p.surface[0],
        border: p.neutral.border,
        icon: p.axisEnergy.base,
        hoverBg: p.surface.hover,
        hoverBorder: p.axisClarity.border,
      },
    },
  }
}
