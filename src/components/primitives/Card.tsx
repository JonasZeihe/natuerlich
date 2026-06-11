// src/components/primitives/Card.tsx
'use client'

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react'
import styled, { type DefaultTheme } from 'styled-components'
import Surface from './Surface'

type CardTone = 'bare' | keyof DefaultTheme['color']['surface']
type CardPadding = keyof DefaultTheme['layout']['surfacePadding']
type CardRadius = keyof DefaultTheme['radius']

type Props = {
  padding?: CardPadding
  tone?: CardTone
  radius?: CardRadius
  bordered?: boolean
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
    radius = 'lg',
    bordered = false,
    children,
    ...rest
  },
  ref
) {
  return (
    <StyledCard
      ref={ref}
      tone={tone}
      radius={radius}
      padding={padding}
      bordered={bordered}
      {...rest}
    >
      {children}
    </StyledCard>
  )
})

export default Card
