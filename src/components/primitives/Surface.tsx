// src/components/primitives/Surface.tsx
'use client'

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react'
import styled, { css } from 'styled-components'
import type { AxisKey, SurfaceToneKey } from '@/design/theme'

type SurfacePadding = 'none' | 'sm' | 'md' | 'lg'
type SurfaceRadius = 'none' | 'small' | 'medium' | 'large' | 'pill'
type SurfaceDensity = 'relaxed' | 'balanced' | 'dense'
type SurfaceEmphasis = 'quiet' | 'steady' | 'strong'

type Props = {
  tone?: SurfaceToneKey
  accent?: AxisKey | 'neutral'
  radius?: SurfaceRadius
  padding?: SurfacePadding
  bordered?: boolean
  density?: SurfaceDensity
  emphasis?: SurfaceEmphasis
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<'div'>, 'color'>

type StyledProps = {
  $radius: SurfaceRadius
  $padding: SurfacePadding
  $bordered: boolean
  $tone: SurfaceToneKey
  $accent: AxisKey | 'neutral'
  $density: SurfaceDensity
  $emphasis: SurfaceEmphasis
}

const densityScaleMap: Record<SurfaceDensity, number> = {
  relaxed: 1.08,
  balanced: 1,
  dense: 0.9,
}

const emphasisStyle = (
  emphasis: SurfaceEmphasis,
  theme: import('styled-components').DefaultTheme,
  border: string,
  bordered: boolean
) => {
  if (emphasis === 'quiet') {
    return css`
      box-shadow: none;
    `
  }

  if (emphasis === 'strong') {
    return css`
      box-shadow:
        inset 0 1px 0 ${bordered ? border : 'transparent'},
        0 0 0 1px ${bordered ? border : 'transparent'};
    `
  }

  return css`
    box-shadow: ${bordered ? `inset 0 1px 0 ${border}` : 'none'};
  `
}

const Base = styled.div<StyledProps>`
  position: relative;
  min-width: 0;
  border-radius: ${({ theme, $radius }) => theme.borderRadius[$radius]};
  overflow: clip;

  ${({ theme, $padding, $density }) => {
    const scale = densityScaleMap[$density]

    return css`
      padding: ${$padding === 'none'
        ? '0'
        : `calc(${theme.layout.surfacePadding[$padding]} * ${scale})`};
    `
  }}

  ${({ theme, $tone, $accent, $bordered, $emphasis }) => {
    const resolved = theme.getSurfaceTone($tone, $accent)

    return css`
      background: ${resolved.bg};
      color: ${resolved.fg};
      border: ${$bordered && resolved.border !== 'transparent'
        ? `1px solid ${resolved.border}`
        : 'none'};
      backdrop-filter: ${resolved.backdrop};
      -webkit-backdrop-filter: ${resolved.backdrop};
      ${emphasisStyle($emphasis, theme, resolved.border, $bordered)}
    `
  }}

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    ${({ $padding, $density }) => {
      const scale = densityScaleMap[$density]
      const base =
        $padding === 'none'
          ? '0'
          : $padding === 'sm'
            ? 'clamp(0.58rem, 1.4vw, 0.76rem)'
            : $padding === 'lg'
              ? 'clamp(0.82rem, 1.9vw, 1.18rem)'
              : 'clamp(0.68rem, 1.6vw, 0.94rem)'

      return css`
        padding: ${$padding === 'none' ? '0' : `calc(${base} * ${scale})`};
      `
    }}
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    ${({ $padding, $density }) => {
      const scale = densityScaleMap[$density]
      const base =
        $padding === 'none'
          ? '0'
          : $padding === 'sm'
            ? 'clamp(0.56rem, 1.8vw, 0.72rem)'
            : $padding === 'lg'
              ? 'clamp(0.74rem, 2vw, 1rem)'
              : 'clamp(0.64rem, 1.9vw, 0.86rem)'

      return css`
        padding: ${$padding === 'none' ? '0' : `calc(${base} * ${scale})`};
      `
    }}
  }
`

const Surface = forwardRef<HTMLDivElement, Props>(function Surface(
  {
    tone = 'panel',
    accent = 'neutral',
    radius = 'large',
    padding = 'none',
    bordered = false,
    density = 'balanced',
    emphasis = 'quiet',
    children,
    ...rest
  },
  ref
) {
  return (
    <Base
      ref={ref}
      $tone={tone}
      $accent={accent}
      $radius={radius}
      $padding={padding}
      $bordered={bordered}
      $density={density}
      $emphasis={emphasis}
      {...rest}
    >
      {children}
    </Base>
  )
})

export default Surface
