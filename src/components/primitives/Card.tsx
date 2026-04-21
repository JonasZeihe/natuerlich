// src/components/primitives/Card.tsx
'use client'

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react'
import styled, { css } from 'styled-components'
import Surface from './Surface'
import type { AxisKey, SurfaceToneKey } from '@/design/theme'

type Emphasis = 'none' | 'soft'
type Padding = 'sm' | 'md' | 'lg'
type Radius = 'none' | 'small' | 'medium' | 'large' | 'pill'

type Props = {
  padding?: Padding
  tone?: SurfaceToneKey
  axis?: AxisKey | 'neutral'
  interactive?: boolean
  emphasis?: Emphasis
  radius?: Radius
  bordered?: boolean
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<'div'>, 'color'>

type StyledProps = {
  $interactive: boolean
  $emphasis: Emphasis
  $axis: AxisKey | 'neutral'
}

const StyledCard = styled(Surface)<StyledProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  cursor: ${({ $interactive }) => ($interactive ? 'pointer' : 'default')};
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    transform 0.18s ease,
    background-color 0.18s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  ${({ theme, $interactive, $emphasis, $axis }) =>
    $interactive && $emphasis !== 'none'
      ? css`
          &:hover,
          &:focus-within {
            outline: 0;
            border-color: ${theme.getAxisRole($axis).border};
            box-shadow: ${theme.boxShadow.sm};
            transform: translateY(-1px);
          }
        `
      : ''}

  ${({ theme, $axis, $emphasis }) =>
    $emphasis !== 'none' && $axis !== 'neutral'
      ? css`
          border-color: ${theme.getAxisRole($axis).border};
        `
      : ''}
`

const resolveCardTone = (
  tone: SurfaceToneKey,
  axis: AxisKey | 'neutral',
  interactive: boolean
): SurfaceToneKey => {
  if (tone === 'open') return axis === 'neutral' ? 'soft' : 'accent'
  if (tone === 'band') return axis === 'neutral' ? 'panel' : 'band'
  if (tone === 'panel' && interactive && axis !== 'neutral') return 'elevated'
  return tone
}

const Card = forwardRef<HTMLDivElement, Props>(function Card(
  {
    padding = 'md',
    tone = 'panel',
    axis = 'neutral',
    interactive = false,
    emphasis = 'soft',
    radius = 'large',
    bordered = true,
    children,
    ...rest
  },
  ref
) {
  const resolvedEmphasis: Emphasis = interactive ? emphasis : 'none'

  return (
    <StyledCard
      ref={ref}
      tone={resolveCardTone(tone, axis, interactive)}
      accent={axis}
      radius={radius}
      padding={padding}
      bordered={bordered}
      $interactive={interactive}
      $emphasis={resolvedEmphasis}
      $axis={axis}
      {...rest}
    >
      {children}
    </StyledCard>
  )
})

export default Card
