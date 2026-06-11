// src/components/primitives/Carousel.tsx
'use client'

import { Children, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import styled, { type DefaultTheme } from 'styled-components'

type BreakpointKey = keyof DefaultTheme['breakpoint']

type Props = {
  children?: ReactNode
  gap?: number | string
  itemWidth?: string
  inset?: boolean
  snap?: boolean
  switchAt?: BreakpointKey | false
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

const resolveSpace = (
  theme: DefaultTheme,
  value: number | string | undefined,
  fallback: string
) => {
  if (typeof value === 'number') return theme.space(value)
  if (typeof value === 'string') return value
  return fallback
}

const Track = styled.div<{
  $gap?: number | string
  $itemWidth: string
  $inset: boolean
  $snap: boolean
  $switchAt: BreakpointKey | false
}>`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${({ $itemWidth }) => $itemWidth};
  gap: ${({ theme, $gap }) => resolveSpace(theme, $gap, theme.layout.gap.grid)};
  min-width: 0;
  margin-inline: ${({ theme, $inset }) =>
    $inset ? `calc(${theme.layout.inset.page} * -1)` : '0'};
  padding-inline: ${({ theme, $inset }) =>
    $inset ? theme.layout.inset.page : '0'};
  padding-bottom: ${({ theme }) => theme.space(2)};
  overflow-x: auto;
  overflow-y: hidden;
  overscroll-behavior-x: contain;
  scroll-snap-type: ${({ $snap }) => ($snap ? 'x mandatory' : 'none')};
  scroll-padding-inline: ${({ theme, $inset }) =>
    $inset ? theme.layout.inset.page : '0'};
  -webkit-overflow-scrolling: touch;

  > * {
    min-width: 0;
    scroll-snap-align: ${({ $snap }) => ($snap ? 'start' : 'none')};
  }

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;

  ${({ theme, $switchAt }) =>
    $switchAt
      ? `
        @media (min-width: ${theme.breakpoint[$switchAt]}) {
          margin-inline: 0;
          padding-inline: 0;
        }
      `
      : ''}
`

export default function Carousel({
  children,
  gap,
  itemWidth = 'min(82vw, 23rem)',
  inset = true,
  snap = true,
  switchAt = 'lg',
  ...rest
}: Props) {
  const items = Children.toArray(children)

  if (items.length === 0) return null

  return (
    <Track
      $gap={gap}
      $itemWidth={itemWidth}
      $inset={inset}
      $snap={snap}
      $switchAt={switchAt}
      {...rest}
    >
      {items}
    </Track>
  )
}
