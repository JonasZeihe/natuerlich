// src/components/patterns/bento/BentoSection.tsx
'use client'

import { ReactNode, Children, type ComponentPropsWithoutRef } from 'react'
import styled, { css, useTheme } from 'styled-components'
import Section from '@/components/primitives/Section'
import Typography from '@/design/typography'
import type { SectionToneKey } from '@/design/theme'

type Span = {
  col?: number
  row?: number
  align?: 'start' | 'center' | 'end' | 'stretch'
}

type BentoPreset = 'none' | 'triad'

type Props = {
  title?: ReactNode
  subtitle?: ReactNode
  cta?: ReactNode
  children: ReactNode
  min?: string
  gap?: number | string
  columns?: number | 'auto'
  padY?: boolean
  wide?: boolean
  layout?: Span[]
  dense?: boolean
  preset?: BentoPreset
  tone?: SectionToneKey
} & Omit<ComponentPropsWithoutRef<'section'>, 'children'>

export default function BentoSection({
  title,
  subtitle,
  cta,
  children,
  min,
  gap,
  columns,
  padY = true,
  wide = false,
  layout = [],
  dense = false,
  preset = 'triad',
  tone = 'default',
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...rest
}: Props) {
  const theme = useTheme()
  const fallbackMin = min ?? theme.grid.defaults.min
  const fallbackGap = gap ?? theme.grid.defaults.gap
  const fallbackCols = columns ?? theme.grid.defaults.columns

  const items = Children.toArray(children)

  const header =
    title || subtitle || cta ? (
      <Header>
        <Headings>
          {title ? (
            typeof title === 'string' ? (
              <Typography as="h2" variant="h2" tone="strong">
                {title}
              </Typography>
            ) : (
              title
            )
          ) : null}
          {subtitle ? (
            typeof subtitle === 'string' ? (
              <Typography as="p" variant="body" tone="soft">
                {subtitle}
              </Typography>
            ) : (
              subtitle
            )
          ) : null}
        </Headings>
        {cta ? <CtaWrap>{cta}</CtaWrap> : null}
      </Header>
    ) : null

  const useTriad = preset === 'triad' && items.length >= 3

  return (
    <Section
      id={id}
      container={wide ? 'wide' : 'default'}
      padY={padY}
      variant="body"
      tone={tone}
      ariaLabel={typeof title === 'string' ? title : ariaLabel}
      aria-labelledby={ariaLabelledBy}
      {...rest}
    >
      {header}
      {useTriad ? (
        <TriadGrid aria-label="Bento Section (Triad)">
          <Area $name="featured">{items[0]}</Area>
          <Area $name="secondary">{items[1]}</Area>
          <Area $name="tertiary">{items[2]}</Area>
        </TriadGrid>
      ) : (
        <FreeGrid
          $columns={fallbackCols}
          $min={fallbackMin}
          $gap={fallbackGap}
          $dense={dense}
          aria-label="Bento Section"
        >
          {items.map((child, index) => {
            const span = layout[index] || {}
            const col = span.col && span.col > 0 ? span.col : 1
            const row = span.row && span.row > 0 ? span.row : 1
            const align = span.align || 'stretch'
            return (
              <Item key={index} $col={col} $row={row} $align={align}>
                {child}
              </Item>
            )
          })}
        </FreeGrid>
      )}
    </Section>
  )
}

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: ${({ theme }) => theme.spacing(1.5)};
  margin-bottom: ${({ theme }) => theme.spacing(1.5)};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    align-items: start;
    row-gap: ${({ theme }) => theme.spacing(1)};
  }
`

const Headings = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.5)};
`

const CtaWrap = styled.div`
  justify-self: end;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    justify-self: start;
  }
`

const FreeGrid = styled.div<{
  $columns: number | 'auto'
  $min?: string
  $gap?: number | string
  $dense?: boolean
}>`
  display: grid;
  ${({ theme, $gap }) => css`
    gap: ${typeof $gap === 'number'
      ? theme.spacing($gap)
      : ($gap ?? theme.spacing(theme.grid.defaults.gap))};
  `}
  grid-auto-flow: ${({ $dense }) => ($dense ? 'row dense' : 'row')};

  ${({ $columns, $min }) =>
    $columns === 'auto'
      ? css`
          grid-template-columns: repeat(
            auto-fit,
            minmax(${($min as string) || '18rem'}, 1fr)
          );
        `
      : css`
          grid-template-columns: repeat(
            ${Number($columns || 1)},
            minmax(0, 1fr)
          );
        `};
`

const Item = styled.div<{
  $col: number
  $row: number
  $align: 'start' | 'center' | 'end' | 'stretch'
}>`
  grid-column: span ${({ $col }) => $col};
  grid-row: span ${({ $row }) => $row};
  align-self: ${({ $align }) =>
    $align === 'start'
      ? 'start'
      : $align === 'end'
        ? 'end'
        : $align === 'center'
          ? 'center'
          : 'stretch'};

  > * {
    width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: span 1;
    grid-row: span 1;
    align-self: stretch;
  }
`

const TriadGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    'featured secondary'
    'featured secondary'
    'tertiary tertiary';
  gap: ${({ theme }) => theme.spacing(2)};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'featured'
      'secondary'
      'tertiary';
    gap: ${({ theme }) => theme.spacing(1.5)};
  }
`

const Area = styled.div<{ $name: 'featured' | 'secondary' | 'tertiary' }>`
  grid-area: ${({ $name }) => $name};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    ${({ $name, theme }) =>
      $name !== 'featured' ? `margin-top: ${theme.spacingHalf(1.5)};` : ''}
  }
`
