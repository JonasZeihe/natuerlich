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

type Props = {
  tone?: SurfaceToneKey
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
  $tone: SurfaceToneKey
  $accent: AxisKey | 'neutral'
}

const Base = styled.div<StyledProps>`
  position: relative;
  min-width: 0;
  border-radius: ${({ theme, $radius }) => theme.borderRadius[$radius]};
  padding: ${({ theme, $padding }) => theme.layout.surfacePadding[$padding]};

  ${({ theme, $tone, $accent, $bordered }) => {
    const resolved = theme.getSurfaceTone($tone, $accent)

    return css`
      background: ${resolved.bg};
      color: ${resolved.fg};
      border: ${$bordered && resolved.border !== 'transparent'
        ? `1px solid ${resolved.border}`
        : 'none'};
      box-shadow: ${resolved.shadow};
      backdrop-filter: ${resolved.backdrop};
      -webkit-backdrop-filter: ${resolved.backdrop};
    `
  }}

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ $padding }) =>
      $padding === 'none'
        ? '0'
        : $padding === 'sm'
          ? 'clamp(0.58rem, 1.4vw, 0.76rem)'
          : $padding === 'lg'
            ? 'clamp(0.82rem, 1.9vw, 1.18rem)'
            : 'clamp(0.68rem, 1.6vw, 0.94rem)'};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ $padding }) =>
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
    tone = 'panel',
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
