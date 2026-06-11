// src/design/theme.ts
import {
  BREAKPOINT,
  COLOR,
  COMPONENT,
  DOMAIN_COLOR,
  FONT,
  LAYOUT,
  PALETTE,
  RADIUS,
  SHADOW,
  TEXT_STYLE,
  space,
} from './tokens'
import motion from './motion'

const theme = {
  palette: PALETTE,
  color: COLOR,
  domain: DOMAIN_COLOR,
  component: COMPONENT,
  font: FONT,
  text: TEXT_STYLE,
  space,
  radius: RADIUS,
  shadow: SHADOW,
  breakpoint: BREAKPOINT,
  layout: LAYOUT,
  motion,
} as const

export { theme }
export default theme

export type AppTheme = typeof theme

export type {
  BreakpointKey,
  ButtonVariantKey,
  DomainPhaseKey,
  DomainPracticeKey,
  PaletteKey,
  RadiusKey,
  ShadowKey,
  TextStyleKey,
} from './tokens'

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
