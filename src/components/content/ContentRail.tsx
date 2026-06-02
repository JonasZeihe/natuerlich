// src/components/content/ContentRail.tsx
'use client'

import { type ComponentPropsWithoutRef, type ReactNode } from 'react'
import styled, { css } from 'styled-components'

type RailColumns = 1 | 2 | 3 | 4 | 'auto'
type RailVariant = 'flow' | 'cards'
type RailAlign = 'start' | 'center' | 'end' | 'stretch'

type Props = {
  columns?: RailColumns
  min?: string
  gap?: string
  itemWidth?: string
  variant?: RailVariant
  align?: RailAlign
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

const Root = styled.div<{
  $columns: RailColumns
  $min: string
  $gap?: string
  $itemWidth?: string
  $variant: RailVariant
  $align: RailAlign
}>`
  display: grid;
  width: 100%;
  min-width: 0;
  gap: ${({ theme, $gap }) => $gap ?? theme.layout.grid.gap};
  align-items: ${({ $align }) => ($align === 'stretch' ? 'stretch' : 'start')};
  justify-items: ${({ $align }) => ($align === 'stretch' ? 'stretch' : $align)};

  ${({ $columns, $min }) =>
    $columns === 'auto'
      ? css`
          grid-template-columns: repeat(
            auto-fit,
            minmax(min(100%, ${$min}), 1fr)
          );
        `
      : css`
          grid-template-columns: repeat(${$columns}, minmax(0, 1fr));
        `}

  ${({ $variant, $itemWidth }) =>
    $variant === 'cards' && $itemWidth
      ? css`
          @media (max-width: 42rem) {
            display: flex;
            gap: inherit;
            align-items: stretch;
            justify-content: flex-start;
            overflow-x: auto;
            overflow-y: hidden;
            overscroll-behavior-inline: contain;
            scroll-snap-type: inline mandatory;
            scroll-padding-inline: 0;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;

            &::-webkit-scrollbar {
              display: none;
            }

            > * {
              flex: 0 0 ${$itemWidth};
              max-width: ${$itemWidth};
            }
          }
        `
      : ''}

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    ${({ $variant }) =>
      $variant === 'cards'
        ? ''
        : css`
            grid-template-columns: 1fr;
          `}
  }
`

export const ContentRailItem = styled.article`
  display: grid;
  min-width: 0;
  scroll-snap-align: start;
`

export default function ContentRail({
  columns = 'auto',
  min = '18rem',
  gap,
  itemWidth,
  variant = 'flow',
  align = 'stretch',
  children,
  ...rest
}: Props) {
  return (
    <Root
      $columns={columns}
      $min={min}
      $gap={gap}
      $itemWidth={itemWidth}
      $variant={variant}
      $align={align}
      {...rest}
    >
      {children}
    </Root>
  )
}
