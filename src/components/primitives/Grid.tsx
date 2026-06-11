// src/components/primitives/Grid.tsx
'use client'

import { type ComponentPropsWithoutRef, type ReactNode } from 'react'
import styled, { css, type DefaultTheme } from 'styled-components'

type Columns = number | 'auto'
type BreakpointKey = keyof DefaultTheme['breakpoint']
type SpaceKey = keyof DefaultTheme['space']

type Props = {
  columns?: Columns
  min?: string
  gap?: SpaceKey | string
  offset?: SpaceKey | string
  dense?: boolean
  switchAt?: BreakpointKey | string | false
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

const DEFAULT_GRID_MIN = '18rem'

const resolveSpace = (
  theme: DefaultTheme,
  value: SpaceKey | string | undefined,
  fallback: string
) => {
  if (typeof value === 'number') return theme.space[value]
  if (typeof value === 'string') return value
  return fallback
}

const resolveBreakpoint = (
  theme: DefaultTheme,
  value: BreakpointKey | string
) =>
  value in theme.breakpoint ? theme.breakpoint[value as BreakpointKey] : value

const GridBox = styled.div<{
  $columns: Columns
  $min: string
  $gap?: SpaceKey | string
  $offset?: SpaceKey | string
  $dense: boolean
  $switchAt?: BreakpointKey | string | false
}>`
  display: grid;
  min-width: 0;
  margin: ${({ theme, $offset }) => resolveSpace(theme, $offset, '0')};
  gap: ${({ theme, $gap }) => resolveSpace(theme, $gap, theme.layout.gap.grid)};
  grid-auto-flow: ${({ $dense }) => ($dense ? 'row dense' : 'row')};

  ${({ $columns, $min }) =>
    $columns === 'auto'
      ? css`
          grid-template-columns: repeat(auto-fit, minmax(${$min}, 1fr));
        `
      : css`
          grid-template-columns: repeat(${$columns}, minmax(0, 1fr));
        `}

  ${({ theme, $switchAt }) =>
    $switchAt
      ? css`
          @media (max-width: ${resolveBreakpoint(theme, $switchAt)}) {
            grid-template-columns: 1fr;
          }
        `
      : ''}
`

export default function Grid({
  columns = 'auto',
  min = DEFAULT_GRID_MIN,
  gap,
  offset,
  dense = false,
  switchAt = 'md',
  children,
  ...rest
}: Props) {
  return (
    <GridBox
      $columns={columns}
      $min={min}
      $gap={gap}
      $offset={offset}
      $dense={dense}
      $switchAt={switchAt}
      {...rest}
    >
      {children}
    </GridBox>
  )
}
