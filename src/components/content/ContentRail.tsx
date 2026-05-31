// src/components/content/ContentRail.tsx
'use client'

import { type ComponentPropsWithoutRef, type ReactNode } from 'react'
import styled, { css, type DefaultTheme } from 'styled-components'

type Columns = number | 'auto'
type BreakpointKey = keyof DefaultTheme['breakpoints']
type ItemMode = 'line' | 'card'
type RailAlign = 'start' | 'stretch'
type RailVariant = 'shelf' | 'editorial' | 'cards'

type ContentRailProps = {
  children?: ReactNode
  columns?: Columns
  min?: string
  gap?: number | string
  itemWidth?: string
  max?: string
  switchAt?: BreakpointKey
  align?: RailAlign
  variant?: RailVariant
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

type ContentRailItemProps = {
  children?: ReactNode
  mode?: ItemMode
  stretch?: boolean
} & Omit<ComponentPropsWithoutRef<'article'>, 'children'>

const toSpace = (theme: DefaultTheme, value?: number | string) => {
  if (typeof value === 'number') return theme.spacing(value)
  if (typeof value === 'string') return value
  return theme.layout.rail.gap
}

const RailFrame = styled.div<{
  $switchAt: BreakpointKey
  $variant: RailVariant
}>`
  position: relative;
  isolation: isolate;

  ${({ theme, $switchAt, $variant }) => css`
    @media (max-width: calc(${theme.breakpoints[$switchAt]} - 0.02px)) {
      &::after {
        content: '';
        position: absolute;
        z-index: 2;
        top: 0;
        right: calc(${theme.layout.inset.rail} * -1);
        bottom: ${$variant === 'editorial'
          ? theme.layout.flow.text
          : theme.layout.flow.block};
        width: ${theme.layout.rail.peek};
        background: linear-gradient(
          90deg,
          transparent,
          color-mix(
            in srgb,
            ${theme.roles.surface.canvas}
              ${$variant === 'cards' ? '34%' : '58%'},
            transparent
          )
        );
        pointer-events: none;
      }
    }
  `}
`

const Rail = styled.div<{
  $columns: Columns
  $min: string
  $gap?: number | string
  $itemWidth: string
  $max?: string
  $switchAt: BreakpointKey
  $align: RailAlign
  $variant: RailVariant
}>`
  display: grid;
  align-items: ${({ $align }) => $align};
  grid-auto-flow: column;
  grid-auto-columns: ${({ $itemWidth, $variant }) => {
    if ($variant === 'cards') return `min(${$itemWidth}, calc(100% - 1.35rem))`
    if ($variant === 'editorial') {
      return `min(${$itemWidth}, calc(100% - 3.25rem))`
    }

    return `min(${$itemWidth}, calc(100% - 2.6rem))`
  }};
  gap: ${({ theme, $gap }) => toSpace(theme, $gap)};
  margin-inline: ${({ theme }) => `calc(${theme.layout.inset.rail} * -1)`};
  padding-inline-start: ${({ theme }) => theme.layout.inset.rail};
  padding-inline-end: ${({ theme }) =>
    `calc(${theme.layout.inset.rail} + ${theme.layout.rail.peek})`};
  padding-bottom: ${({ theme, $variant }) =>
    $variant === 'editorial'
      ? theme.layout.flow.text
      : theme.layout.flow.block};
  overflow-x: auto;
  overflow-y: visible;
  scroll-snap-type: x mandatory;
  scroll-padding-inline-start: ${({ theme }) => theme.layout.inset.rail};
  scroll-padding-inline-end: ${({ theme }) =>
    `calc(${theme.layout.inset.rail} + ${theme.layout.rail.peek})`};
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  ${({ theme, $variant }) =>
    $variant === 'editorial'
      ? css`
          & > article {
            border-radius: 0;
            border-top: 1px solid ${theme.roles.border.subtle};
            background: transparent;
            padding: ${theme.layout.flow.block} 0 0;
          }
        `
      : null}

  ${({ theme, $variant }) =>
    $variant === 'cards'
      ? css`
          & > article {
            background: ${theme.roles.surface.quiet};
          }
        `
      : null}

  ${({ theme, $columns, $min, $max, $switchAt, $variant }) => css`
    @media (min-width: ${theme.breakpoints[$switchAt]}) {
      width: ${$max ? `min(100%, ${$max})` : '100%'};
      margin-inline: ${$max ? 'auto' : '0'};
      padding-inline: 0;
      padding-bottom: 0;
      grid-auto-flow: initial;
      grid-auto-columns: initial;
      grid-template-columns: ${$columns === 'auto'
        ? `repeat(auto-fit, minmax(${$min}, 1fr))`
        : `repeat(${$columns}, minmax(0, 1fr))`};
      overflow: visible;
      scroll-snap-type: none;

      ${$variant === 'editorial'
        ? css`
            gap: ${theme.layout.grid.gap};

            & > article {
              padding: ${theme.layout.flow.text} 0 0;
              border-top: 1px solid ${theme.roles.border.subtle};
              border-radius: 0;
              background: transparent;
            }
          `
        : null}

      ${$variant === 'cards'
        ? css`
            & > article {
              background: ${theme.roles.surface.quiet};
            }
          `
        : null}
    }
  `}
`

const Item = styled.article<{ $mode: ItemMode; $stretch: boolean }>`
  scroll-snap-align: start;
  display: grid;
  align-content: start;
  gap: ${({ theme }) => theme.layout.flow.block};
  min-width: 0;
  height: ${({ $stretch }) => ($stretch ? '100%' : 'auto')};
  padding: ${({ theme }) => theme.layout.surface.md};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  background: ${({ theme }) => theme.roles.surface.quiet};

  ${({ theme, $mode }) =>
    $mode === 'line'
      ? css`
          border-top: 1px solid ${theme.roles.border.subtle};
          border-radius: 0;
          background: transparent;
          padding: ${theme.layout.flow.block} 0 0;
        `
      : null}

  ${({ theme, $mode }) => css`
    @media (min-width: ${theme.breakpoints.lg}) {
      ${$mode === 'line'
        ? css`
            padding: ${theme.layout.flow.text} 0 0;
            border-top: 1px solid ${theme.roles.border.subtle};
            border-radius: 0;
            background: transparent;
          `
        : css`
            padding: ${theme.layout.surface.md};
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
  variant = 'shelf',
  ...rest
}: ContentRailProps) => (
  <RailFrame $switchAt={switchAt} $variant={variant}>
    <Rail
      $columns={columns}
      $min={min}
      $gap={gap}
      $itemWidth={itemWidth}
      $max={max}
      $switchAt={switchAt}
      $align={align}
      $variant={variant}
      {...rest}
    >
      {children}
    </Rail>
  </RailFrame>
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
