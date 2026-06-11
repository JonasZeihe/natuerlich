// src/components/primitives/Surface.tsx
'use client'

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react'
import styled, { css, type DefaultTheme } from 'styled-components'

type SurfaceTone = 'bare' | keyof DefaultTheme['color']['surface']
type SurfacePadding = keyof DefaultTheme['layout']['surfacePadding']
type SurfaceRadius = keyof DefaultTheme['radius']

type Props = {
  tone?: SurfaceTone
  radius?: SurfaceRadius
  padding?: SurfacePadding
  bordered?: boolean
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<'div'>, 'color'>

type StyledProps = {
  $tone: SurfaceTone
  $radius: SurfaceRadius
  $padding: SurfacePadding
  $bordered: boolean
}

const isDarkSurface = (tone: SurfaceTone) =>
  tone === 'inverse' || tone === 'backdrop'

const Base = styled.div<StyledProps>`
  position: relative;
  min-width: 0;
  padding: ${({ theme, $padding }) => theme.layout.surfacePadding[$padding]};
  border-radius: ${({ theme, $radius }) => theme.radius[$radius]};
  overflow: clip;

  ${({ theme, $tone, $bordered }) => css`
    background: ${$tone === 'bare'
      ? 'transparent'
      : theme.color.surface[$tone]};
    color: ${isDarkSurface($tone)
      ? theme.color.text.inverse
      : theme.color.text.default};
    border: ${$bordered ? `1px solid ${theme.color.border.default}` : '0'};
  `}
`

const Surface = forwardRef<HTMLDivElement, Props>(function Surface(
  {
    tone = 'bare',
    radius = 'none',
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
      $radius={radius}
      $padding={padding}
      $bordered={bordered}
      {...rest}
    >
      {children}
    </Base>
  )
})

export default Surface
