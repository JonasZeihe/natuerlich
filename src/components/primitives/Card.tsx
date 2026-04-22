// src/components/primitives/Card.tsx
'use client'

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react'
import styled, { css } from 'styled-components'
import type { EnergyInput, EnergyMix, SurfaceToneKey } from '@/design/theme'
import Surface from './Surface'

type Padding = 'sm' | 'md' | 'lg'
type Radius = 'none' | 'small' | 'medium' | 'large' | 'pill'
type Weight = 'quiet' | 'steady' | 'strong'

type Props = {
  padding?: Padding
  tone?: SurfaceToneKey
  energy?: EnergyInput
  mix?: EnergyMix
  interactive?: boolean
  weight?: Weight
  radius?: Radius
  bordered?: boolean
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<'div'>, 'color'>

type StyledProps = {
  $interactive: boolean
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

  ${({ theme, $interactive }) =>
    $interactive
      ? css`
          &:hover,
          &:focus-within {
            outline: 0;
            box-shadow: ${theme.boxShadow.sm};
            transform: translateY(-1px);
          }
        `
      : ''}
`

const resolveCardTone = (
  tone: SurfaceToneKey,
  interactive: boolean
): SurfaceToneKey => {
  if (tone === 'open') return 'soft'
  if (tone === 'band') return 'panel'
  if (tone === 'panel' && interactive) return 'elevated'
  return tone
}

const Card = forwardRef<HTMLDivElement, Props>(function Card(
  {
    padding = 'md',
    tone = 'panel',
    energy,
    mix,
    interactive = false,
    weight = 'steady',
    radius = 'large',
    bordered = true,
    children,
    ...rest
  },
  ref
) {
  return (
    <StyledCard
      ref={ref}
      tone={resolveCardTone(tone, interactive)}
      energy={energy}
      mix={mix}
      radius={radius}
      padding={padding}
      bordered={bordered}
      weight={weight}
      $interactive={interactive}
      {...rest}
    >
      {children}
    </StyledCard>
  )
})

export default Card
