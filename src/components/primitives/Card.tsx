// src/components/primitives/Card.tsx
'use client'

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react'
import styled from 'styled-components'
import type { AssetConsumerSpec } from '@/components/assets/registry'
import type { MovementKey, SurfaceToneKey } from '@/design/theme'
import Surface from './Surface'

type Padding = 'none' | 'sm' | 'md' | 'lg'
type Radius = 'none' | 'small' | 'medium' | 'large' | 'pill'

type Props = {
  padding?: Padding
  tone?: SurfaceToneKey
  movement?: MovementKey
  radius?: Radius
  bordered?: boolean
  asset?: AssetConsumerSpec | null
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<'div'>, 'color'>

const StyledCard = styled(Surface)`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
`

const Card = forwardRef<HTMLDivElement, Props>(function Card(
  {
    padding = 'md',
    tone = 'card',
    movement,
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
      asset={asset}
      {...rest}
    >
      {children}
    </StyledCard>
  )
})

export default Card
