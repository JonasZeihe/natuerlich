// src/components/primitives/Inline.tsx
'use client'

import { Children, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import styled, { css, type DefaultTheme } from 'styled-components'

type Align = 'start' | 'center' | 'end' | 'stretch'
type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

type Props = {
  gap?: number | string
  align?: Align
  justify?: Justify
  wrap?: boolean
  divider?: boolean
  children?: ReactNode
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

const resolveAlign = (align: Align) =>
  align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : align

const resolveJustify = (justify: Justify) =>
  justify === 'start'
    ? 'flex-start'
    : justify === 'end'
      ? 'flex-end'
      : justify === 'between'
        ? 'space-between'
        : justify === 'around'
          ? 'space-around'
          : justify === 'evenly'
            ? 'space-evenly'
            : 'center'

const Row = styled.div<{
  $gap?: number | string
  $align: Align
  $justify: Justify
  $wrap: boolean
}>`
  display: flex;
  flex-wrap: ${({ $wrap }) => ($wrap ? 'wrap' : 'nowrap')};
  align-items: ${({ $align }) => resolveAlign($align)};
  justify-content: ${({ $justify }) => resolveJustify($justify)};
  gap: ${({ theme, $gap }) => resolveSpace(theme, $gap, theme.layout.gap.text)};
  min-width: 0;
`

const Item = styled.div<{ $withDivider: boolean }>`
  display: inline-flex;
  align-items: center;
  min-width: 0;
  gap: ${({ theme }) => theme.space(1)};

  ${({ theme, $withDivider }) =>
    $withDivider
      ? css`
          border-left: 1px solid ${theme.color.border.default};
          padding-left: ${theme.layout.gap.text};
        `
      : ''}
`

export default function Inline({
  gap,
  align = 'center',
  justify = 'start',
  wrap = true,
  divider = false,
  children,
  ...rest
}: Props) {
  const items = Children.toArray(children)

  return (
    <Row $gap={gap} $align={align} $justify={justify} $wrap={wrap} {...rest}>
      {divider
        ? items.map((child, index) => (
            <Item key={index} $withDivider={index > 0}>
              {child}
            </Item>
          ))
        : items}
    </Row>
  )
}
