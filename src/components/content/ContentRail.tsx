// src/components/content/ContentRail.tsx
'use client'

import { type ComponentPropsWithoutRef, type ReactNode } from 'react'
import styled, { css, type DefaultTheme } from 'styled-components'

type Columns = number | 'auto'
type BreakpointKey = keyof DefaultTheme['breakpoints']
type ItemMode = 'line' | 'card'
type RailAlign = 'start' | 'stretch'

type ContentRailProps = {
  children?: ReactNode
  columns?: Columns
  min?: string
  gap?: number | string
  itemWidth?: string
  max?: string
  switchAt?: BreakpointKey
  align?: RailAlign
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

type ContentRailItemProps = {
  children?: ReactNode
  mode?: ItemMode
  stretch?: boolean
} & Omit<ComponentPropsWithoutRef<'article'>, 'children'>

const toSpace = (theme: DefaultTheme, value?: number | string) => {
  if (typeof value === 'number') return theme.spacing(value)
  if (typeof value === 'string') return value
  return theme.spacing(1.5)
}

const Rail = styled.div<{
  $columns: Columns
  $min: string
  $gap?: number | string
  $itemWidth: string
  $max?: string
  $switchAt: BreakpointKey
  $align: RailAlign
}>`
  display: grid;
  align-items: ${({ $align }) => $align};
  grid-auto-flow: column;
  grid-auto-columns: ${({ $itemWidth }) => $itemWidth};
  gap: ${({ theme, $gap }) => toSpace(theme, $gap)};
  margin-inline: ${({ theme }) => `-${theme.spacing(1)}`};
  padding-inline: ${({ theme }) => theme.spacing(1)};
  padding-bottom: ${({ theme }) => theme.spacing(0.25)};
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  ${({ theme, $columns, $min, $max, $switchAt }) => css`
    @media (min-width: ${theme.breakpoints[$switchAt]}) {
      width: ${$max ? `min(100%, ${$max})` : '100%'};
      margin-inline: ${$max ? 'auto' : '0'};
      padding-inline: 0;
      grid-auto-flow: initial;
      grid-auto-columns: initial;
      grid-template-columns: ${$columns === 'auto'
        ? `repeat(auto-fit, minmax(${$min}, 1fr))`
        : `repeat(${$columns}, minmax(0, 1fr))`};
      overflow: visible;
    }
  `}
`

const Item = styled.article<{ $mode: ItemMode; $stretch: boolean }>`
  scroll-snap-align: start;
  display: grid;
  align-content: start;
  gap: ${({ theme }) => theme.spacing(1.85)};
  min-width: 0;
  height: ${({ $stretch }) => ($stretch ? '100%' : 'auto')};
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  background: ${({ theme }) => theme.roles.surface.quiet};

  ${({ theme, $mode }) => css`
    @media (min-width: ${theme.breakpoints.lg}) {
      ${$mode === 'line'
        ? css`
            padding: ${theme.spacing(0.5)} 0 0;
            border-top: 1px solid ${theme.roles.border.subtle};
            border-radius: 0;
            background: transparent;
          `
        : css`
            padding: ${theme.spacing(1.35)};
            border-radius: ${theme.borderRadius.large};
            background: ${theme.roles.surface.quiet};
          `}
    }
  `}
`

const ContentRail = ({
  children,
  columns = 'auto',
  min = '18rem',
  gap,
  itemWidth = 'min(82vw, 23rem)',
  max,
  switchAt = 'lg',
  align = 'stretch',
  ...rest
}: ContentRailProps) => (
  <Rail
    $columns={columns}
    $min={min}
    $gap={gap}
    $itemWidth={itemWidth}
    $max={max}
    $switchAt={switchAt}
    $align={align}
    {...rest}
  >
    {children}
  </Rail>
)

const ContentRailItem = ({
  children,
  mode = 'line',
  stretch = true,
  ...rest
}: ContentRailItemProps) => (
  <Item $mode={mode} $stretch={stretch} {...rest}>
    {children}
  </Item>
)

export default ContentRail
export { ContentRailItem }
