// src/components/primitives/Grid.tsx
'use client'

import { type ComponentPropsWithoutRef, type ReactNode } from 'react'
import styled, { css, type DefaultTheme } from 'styled-components'

type Columns = number | 'auto'
type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

type Props = {
  columns?: Columns
  min?: string
  gap?: number | string
  dense?: boolean
  switchAt?: BreakpointKey | string
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

const DEFAULT_GRID_MIN = '18rem'
const DEFAULT_GRID_GAP = 2

const toGap = (theme: DefaultTheme, gap?: number | string) => {
  if (typeof gap === 'number') return theme.spacing(gap)
  if (typeof gap === 'string') return gap
  return theme.spacing(DEFAULT_GRID_GAP)
}

const GridBox = styled.div<{
  $columns?: Columns
  $min?: string
  $gap?: number | string
  $dense?: boolean
  $switch?: string
}>`
  display: grid;
  ${({ theme, $gap }) => css`
    gap: ${toGap(theme, $gap)};
  `}
  grid-auto-flow: ${({ $dense }) => ($dense ? 'row dense' : 'row')};

  ${({ $columns, $min }) => {
    const cols = $columns ?? 'auto'
    const minWidth = $min ?? DEFAULT_GRID_MIN

    if (cols === 'auto') {
      return css`
        grid-template-columns: repeat(auto-fit, minmax(${minWidth}, 1fr));
      `
    }

    return css`
      grid-template-columns: repeat(${Number(cols || 1)}, minmax(0, 1fr));
    `
  }}

  ${({ theme, $switch }) =>
    $switch
      ? css`
          @media (max-width: ${$switch in theme.breakpoints
              ? theme.breakpoints[$switch as keyof typeof theme.breakpoints]
              : $switch}) {
            grid-template-columns: 1fr;
          }
        `
      : ''}
`

export default function Grid({
  columns = 'auto',
  min,
  gap,
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
      $dense={dense}
      $switch={switchAt}
      {...rest}
    >
      {children}
    </GridBox>
  )
}
