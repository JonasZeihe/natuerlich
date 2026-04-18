// src/components/primitives/Card.tsx
'use client'

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react'
import styled, { css } from 'styled-components'
import Surface from './Surface'
import type { AxisKey } from '@/design/theme'

type Tone = 'neutral' | 'elevated' | 'accent'
type Emphasis = 'none' | 'soft'
type Padding = 'sm' | 'md' | 'lg'
type Radius = 'none' | 'small' | 'medium' | 'large' | 'pill'

type Props = {
  padding?: Padding
  tone?: Tone
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
  overflow: hidden;
  cursor: ${({ $interactive }) => ($interactive ? 'pointer' : 'default')};
  transition:
    box-shadow 0.18s ease,
    border-color 0.18s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  ${({ theme, $interactive, $emphasis, $axis }) =>
    $interactive && $emphasis !== 'none'
      ? css`
          &:hover,
          &:focus-within {
            outline: 0;
            box-shadow: ${theme.boxShadow.md};
            border-color: ${theme.getAxisRole($axis).border};
          }
        `
      : ''}
`

const Card = forwardRef<HTMLDivElement, Props>(function Card(
  {
    padding = 'md',
    tone = 'neutral',
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
      tone={tone}
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
