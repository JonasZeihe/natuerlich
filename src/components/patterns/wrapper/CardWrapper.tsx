// src/components/patterns/wrapper/CardWrapper.tsx
'use client'

import { type ReactNode } from 'react'
import styled from 'styled-components'
import Card from '@/components/primitives/Card'

type Emphasis = 'soft' | 'medium' | 'strong'

type CardWrapperProps = React.ComponentPropsWithoutRef<'div'> & {
  emphasis?: Emphasis
  children: ReactNode
}

const emphasisToAxis = (emphasis: Emphasis) => {
  if (emphasis === 'strong') return 'axisEnergy'
  if (emphasis === 'medium') return 'axisClarity'
  return 'neutral'
}

const emphasisToCardEmphasis = (emphasis: Emphasis): 'none' | 'soft' => {
  if (emphasis === 'soft') return 'none'
  return 'soft'
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  height: 100%;

  > * {
    min-width: 0;
  }
`

export default function CardWrapper({
  emphasis = 'medium',
  children,
  ...rest
}: CardWrapperProps) {
  return (
    <Card
      tone="neutral"
      axis={emphasisToAxis(emphasis)}
      interactive={emphasis !== 'soft'}
      emphasis={emphasisToCardEmphasis(emphasis)}
      radius="large"
      bordered
      padding="sm"
      {...rest}
    >
      <Content>{children}</Content>
    </Card>
  )
}
