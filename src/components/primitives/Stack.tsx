// src/components/primitives/Stack.tsx
'use client'

import { Children, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import styled, { type DefaultTheme } from 'styled-components'

type Align = 'start' | 'center' | 'end' | 'stretch'
type SpaceKey = keyof DefaultTheme['space']

type Props = {
  gap?: SpaceKey | string
  align?: Align
  splitAfter?: number
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

const resolveSpace = (
  theme: DefaultTheme,
  value: SpaceKey | string | undefined,
  fallback: string
) => {
  if (typeof value === 'number') return theme.space[value]
  if (typeof value === 'string') return value
  return fallback
}

const resolveAlign = (align: Align) =>
  align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : align

const Box = styled.div<{ $gap?: SpaceKey | string; $align: Align }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $align }) => resolveAlign($align)};
  gap: ${({ theme, $gap }) => resolveSpace(theme, $gap, theme.layout.gap.text)};
  min-width: 0;
`

const Spacer = styled.div`
  flex: 1 1 auto;
  min-height: 0;
`

export default function Stack({
  gap,
  align = 'stretch',
  splitAfter,
  children,
  ...rest
}: Props) {
  if (typeof splitAfter === 'number' && splitAfter >= 0) {
    const items = Children.toArray(children)

    return (
      <Box $gap={gap} $align={align} {...rest}>
        {items.slice(0, splitAfter)}
        <Spacer />
        {items.slice(splitAfter)}
      </Box>
    )
  }

  return (
    <Box $gap={gap} $align={align} {...rest}>
      {children}
    </Box>
  )
}
