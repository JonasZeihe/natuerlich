// src/components/primitives/Card.tsx
'use client'

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react'
import styled, { css } from 'styled-components'
import type { AssetConsumerSpec } from '@/components/assets/registry'
import type { MovementKey, SurfaceToneKey } from '@/design/theme'
import Surface from './Surface'

type Padding = 'none' | 'sm' | 'md' | 'lg'
type Radius = 'none' | 'small' | 'medium' | 'large' | 'pill'
type Weight = 'quiet' | 'steady' | 'strong'

type Props = {
  padding?: Padding
  tone?: SurfaceToneKey
  movement?: MovementKey
  interactive?: boolean
  weight?: Weight
  radius?: Radius
  bordered?: boolean
  asset?: AssetConsumerSpec | null
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
  cursor: ${({ $interactive }) => ($interactive ? 'pointer' : 'default')};
  transition:
    background-color 0.18s ease,
    box-shadow 0.18s ease,
    transform 0.18s ease;

  @media ${({ theme }) => theme.motion.reduced.media} {
    transition: none;
  }

  ${({ theme, $interactive }) =>
    $interactive
      ? css`
          &:hover,
          &:focus-within {
            box-shadow: ${theme.boxShadow.sm};
            transform: translateY(-1px);
          }
        `
      : ''}
`

const Card = forwardRef<HTMLDivElement, Props>(function Card(
  {
    padding = 'md',
    tone = 'card',
    movement = 'arrival',
    interactive = false,
    weight = 'quiet',
    radius = 'large',
    bordered = false,
    asset,
    children,
    ...rest
  },
  ref
) {
  return (
    <StyledCard
      ref={ref}
      tone={tone}
      movement={movement}
      radius={radius}
      padding={padding}
      bordered={bordered}
      weight={weight}
      asset={asset}
      $interactive={interactive}
      {...rest}
    >
      {children}
    </StyledCard>
  )
})

export default Card
