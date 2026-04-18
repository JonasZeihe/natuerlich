// src/components/primitives/Surface.tsx
'use client'

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react'
import styled, { css, type DefaultTheme } from 'styled-components'
import type { AxisKey } from '@/design/theme'

type SurfaceTone = 'neutral' | 'elevated' | 'accent' | 'subtle' | 'inset'
type SurfacePadding = 'none' | 'sm' | 'md' | 'lg'
type SurfaceRadius = 'none' | 'small' | 'medium' | 'large' | 'pill'

type Props = {
  tone?: SurfaceTone
  accent?: AxisKey | 'neutral'
  radius?: SurfaceRadius
  padding?: SurfacePadding
  bordered?: boolean
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<'div'>, 'color'>

type StyledProps = {
  $radius: SurfaceRadius
  $padding: SurfacePadding
  $bordered: boolean
  $tone: SurfaceTone
  $accent: AxisKey | 'neutral'
}

type ResolvedSurface = {
  bg: string
  fg: string
  border: string
  shadow: string
}

const resolveSurface = (
  tone: SurfaceTone,
  accent: AxisKey | 'neutral',
  theme: DefaultTheme
): ResolvedSurface => {
  const neutral = theme.getIntentRole('neutral')

  if (tone === 'accent') {
    const axis = theme.getAxisRole(accent)
    return {
      bg: axis.surface,
      fg: axis.contrast,
      border: axis.border,
      shadow: theme.boxShadow.sm,
    }
  }

  if (tone === 'elevated') {
    return {
      bg: theme.roles.surface.elevated,
      fg: theme.roles.text.primary,
      border: theme.roles.border.strong,
      shadow: theme.boxShadow.xs,
    }
  }

  if (tone === 'subtle') {
    return {
      bg: theme.roles.surface.panelSubtle,
      fg: theme.roles.text.primary,
      border: theme.roles.border.subtle,
      shadow: 'none',
    }
  }

  if (tone === 'inset') {
    return {
      bg: theme.roles.surface.inset,
      fg: theme.roles.text.primary,
      border: theme.roles.border.subtle,
      shadow: 'none',
    }
  }

  return {
    bg: theme.roles.surface.panel,
    fg: neutral.contrast,
    border: theme.roles.border.subtle,
    shadow: 'none',
  }
}

const Base = styled.div<StyledProps>`
  position: relative;
  border-radius: ${({ theme, $radius }) => theme.borderRadius[$radius]};
  padding: ${({ theme, $padding }) => theme.layout.surfacePadding[$padding]};
  ${({ theme, $tone, $accent, $bordered }) => {
    const resolved = resolveSurface($tone, $accent, theme)

    return css`
      background: ${resolved.bg};
      color: ${resolved.fg};
      border: ${$bordered ? `1px solid ${resolved.border}` : 'none'};
      box-shadow: ${resolved.shadow};
    `
  }}

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme, $padding }) =>
      $padding === 'none'
        ? '0'
        : $padding === 'sm'
          ? 'clamp(0.58rem, 1.4vw, 0.76rem)'
          : $padding === 'lg'
            ? 'clamp(0.82rem, 1.9vw, 1.18rem)'
            : 'clamp(0.68rem, 1.6vw, 0.94rem)'};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme, $padding }) =>
      $padding === 'none'
        ? '0'
        : $padding === 'sm'
          ? 'clamp(0.56rem, 1.8vw, 0.72rem)'
          : $padding === 'lg'
            ? 'clamp(0.74rem, 2vw, 1rem)'
            : 'clamp(0.64rem, 1.9vw, 0.86rem)'};
  }
`

export default forwardRef<HTMLDivElement, Props>(function Surface(
  {
    tone = 'neutral',
    accent = 'neutral',
    radius = 'large',
    padding = 'none',
    bordered = false,
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
      {...rest}
    >
      {children}
    </Base>
  )
})
