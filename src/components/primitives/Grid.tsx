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

const toGap = (theme: DefaultTheme, gap?: number | string) => {
  if (typeof gap === 'number') return theme.spacing(gap)
  if (typeof gap === 'string') return gap
  const base = theme.grid.defaults.gap
  return typeof base === 'number' ? theme.spacing(base) : theme.spacing(2)
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

  ${({ theme, $columns, $min }) => {
    const cols = ($columns ?? theme.grid.defaults.columns) as Columns
    const minWidth = ($min as string | undefined) ?? theme.grid.defaults.min

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
  columns,
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
