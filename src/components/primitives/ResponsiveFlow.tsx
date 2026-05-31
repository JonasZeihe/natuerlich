// src/components/primitives/ResponsiveFlow.tsx
'use client'

import { type ComponentPropsWithoutRef, type ReactNode } from 'react'
import styled, { css, type DefaultTheme } from 'styled-components'

type Columns = number | 'auto'

type Props = {
  children?: ReactNode
  columns?: Columns
  min?: string
  gap?: number | string
  itemWidth?: string
  switchAt?: keyof DefaultTheme['breakpoints']
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

const toSpace = (theme: DefaultTheme, value?: number | string) => {
  if (typeof value === 'number') return theme.spacing(value)
  if (typeof value === 'string') return value
  return theme.layout.rail.gap
}

const Flow = styled.div<{
  $columns: Columns
  $min: string
  $gap?: number | string
  $itemWidth: string
  $switchAt: keyof DefaultTheme['breakpoints']
}>`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${({ $itemWidth }) => $itemWidth};
  gap: ${({ theme, $gap }) => toSpace(theme, $gap)};
  margin-inline: ${({ theme }) => `calc(${theme.layout.inset.rail} * -1)`};
  padding-inline: ${({ theme }) => theme.layout.inset.rail};
  padding-bottom: ${({ theme }) => theme.layout.flow.text};
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: ${({ theme }) => theme.layout.inset.rail};
  -webkit-overflow-scrolling: touch;

  > * {
    scroll-snap-align: start;
    min-width: 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  ${({ theme, $columns, $min, $switchAt }) => css`
    @media (min-width: ${theme.breakpoints[$switchAt]}) {
      grid-auto-flow: initial;
      grid-auto-columns: initial;
      grid-template-columns: ${$columns === 'auto'
        ? `repeat(auto-fit, minmax(${$min}, 1fr))`
        : `repeat(${$columns}, minmax(0, 1fr))`};
      margin-inline: 0;
      padding-inline: 0;
      padding-bottom: 0;
      overflow: visible;
      scroll-snap-type: none;
    }
  `}
`

const ResponsiveFlow = ({
  children,
  columns = 'auto',
  min = '18rem',
  gap,
  itemWidth = 'min(82vw, 23rem)',
  switchAt = 'lg',
  ...rest
}: Props) => (
  <Flow
    $columns={columns}
    $min={min}
    $gap={gap}
    $itemWidth={itemWidth}
    $switchAt={switchAt}
    {...rest}
  >
    {children}
  </Flow>
)

export default ResponsiveFlow
