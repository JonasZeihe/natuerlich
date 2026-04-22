// src/design/typography.tsx
'use client'

import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from 'react'
import styled, { css, type DefaultTheme } from 'styled-components'
import type { AxisKey } from '@/design/theme'

type Variant = 'h1' | 'h2' | 'h3' | 'subtitle' | 'body' | 'caption'
type Align = 'left' | 'right' | 'center' | 'justify'
type Tone = 'neutral' | 'soft' | 'strong'
type SemanticColor = 'primary' | 'secondary' | 'subtle' | 'link' | 'linkHover'
type Measure = 'compact' | 'title' | 'prose' | 'wide' | 'full'
type Cadence = 'open' | 'neutral' | 'dense'

type TypographyProps = {
  variant?: Variant
  align?: Align
  color?: SemanticColor
  accent?: AxisKey
  tone?: Tone
  measure?: Measure
  cadence?: Cadence
  gutter?: boolean
  as?: ElementType
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<'span'>, 'as' | 'color'>

const TAG_MAP: Record<Variant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  subtitle: 'h4',
  body: 'p',
  caption: 'span',
}

const variantCSS = (variant: Variant, theme: DefaultTheme, gutter: boolean) => {
  const {
    typography: { fontSize, fontWeight, lineHeight, letterSpacing },
    spacing,
  } = theme

  switch (variant) {
    case 'h1':
      return css`
        font-size: ${fontSize.h1};
        font-weight: ${fontWeight.bold};
        line-height: ${lineHeight.tight};
        letter-spacing: ${letterSpacing.tighter};
        margin-bottom: ${gutter ? spacing(2.5) : 0};
        text-wrap: balance;
      `
    case 'h2':
      return css`
        font-size: ${fontSize.h2};
        font-weight: ${fontWeight.bold};
        line-height: 1.16;
        letter-spacing: ${letterSpacing.tight};
        margin-bottom: ${gutter ? spacing(2) : 0};
        text-wrap: balance;
      `
    case 'h3':
      return css`
        font-size: ${fontSize.h3};
        font-weight: ${fontWeight.medium};
        line-height: 1.32;
        letter-spacing: ${letterSpacing.normal};
        margin-bottom: ${gutter ? spacing(1.45) : 0};
      `
    case 'subtitle':
      return css`
        font-size: ${fontSize.subtitle};
        font-weight: ${fontWeight.medium};
        line-height: 1.48;
        letter-spacing: ${letterSpacing.normal};
        margin-bottom: ${gutter ? spacing(1.05) : 0};
      `
    case 'caption':
      return css`
        font-size: ${fontSize.caption};
        font-weight: ${fontWeight.medium};
        line-height: 1.42;
        letter-spacing: ${letterSpacing.wide};
        margin-bottom: ${gutter ? spacing(0.75) : 0};
      `
    default:
      return css`
        font-size: ${fontSize.body};
        font-weight: ${fontWeight.regular};
        line-height: ${lineHeight.normal};
        letter-spacing: ${letterSpacing.normal};
        margin-bottom: ${gutter ? spacing(1) : 0};
      `
  }
}

const measureCSS = (measure: Measure, theme: DefaultTheme) => {
  if (measure === 'full') {
    return css`
      max-width: none;
    `
  }

  return css`
    max-width: ${theme.typography.measure[measure]};
  `
}

const cadenceCSS = (cadence: Cadence, variant: Variant) => {
  if (cadence === 'open') {
    return css`
      line-height: ${variant === 'body' || variant === 'subtitle' ? 1.68 : 1.2};
    `
  }

  if (cadence === 'dense') {
    return css`
      line-height: ${variant === 'body' || variant === 'subtitle'
        ? 1.48
        : 1.12};
    `
  }

  return ''
}

const accentCSS = (accent: AxisKey, variant: Variant, theme: DefaultTheme) => {
  const axis = theme.getAxisRole(accent)

  if (variant === 'caption') {
    return css`
      color: ${axis.fill};
    `
  }

  return css`
    color: ${axis.text};
  `
}

type StyledProps = {
  $variant: Variant
  $align: Align
  $gutter: boolean
  $semanticColor?: SemanticColor
  $accent?: AxisKey
  $tone: Tone
  $measure: Measure
  $cadence: Cadence
}

const StyledTypography = styled.span<StyledProps>`
  margin: 0;
  padding: 0;
  min-width: 0;
  text-align: ${({ $align }) => $align};
  ${({ $variant, theme, $gutter }) => variantCSS($variant, theme, $gutter)}
  ${({ $measure, theme }) => measureCSS($measure, theme)}
  ${({ $cadence, $variant }) => cadenceCSS($cadence, $variant)}

  ${({ theme, $variant, $semanticColor, $accent, $tone }) => {
    if ($semanticColor) {
      return css`
        color: ${theme.roles.text[$semanticColor]};
      `
    }

    if ($accent) {
      return accentCSS($accent, $variant, theme)
    }

    if ($tone === 'soft') {
      return css`
        color: ${theme.roles.text.subtle};
      `
    }

    if ($tone === 'strong') {
      return css`
        color: ${theme.roles.text.primary};
      `
    }

    if ($variant === 'caption') {
      return css`
        color: ${theme.roles.text.subtle};
      `
    }

    return css`
      color: ${theme.roles.text.primary};
    `
  }}

  ${({ $variant, $measure, $accent, theme }) =>
    ($variant === 'h1' || $variant === 'h2') && $measure === 'title' && $accent
      ? css`
          max-width: ${theme.typography.measure.title};

          @media (max-width: ${theme.breakpoints.md}) {
            max-width: 24ch;
          }
        `
      : ''}

  a {
    color: ${({ theme }) => theme.roles.text.link};
    text-decoration-color: ${({ theme }) => theme.roles.text.link};
  }

  a:hover {
    color: ${({ theme }) => theme.roles.text.linkHover};
    text-decoration-color: ${({ theme }) => theme.roles.text.linkHover};
  }

  strong {
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: inherit;
  }

  em {
    font-style: italic;
    color: inherit;
  }
`

export default function Typography({
  variant = 'body',
  align = 'left',
  color,
  accent,
  tone = 'neutral',
  measure = variant === 'body'
    ? 'prose'
    : variant === 'caption'
      ? 'wide'
      : 'title',
  cadence = 'neutral',
  gutter = true,
  as,
  children,
  ...rest
}: TypographyProps) {
  const componentTag = as ?? TAG_MAP[variant] ?? 'p'

  return (
    <StyledTypography
      as={componentTag}
      $variant={variant}
      $align={align}
      $gutter={gutter}
      $semanticColor={color}
      $accent={accent}
      $tone={tone}
      $measure={measure}
      $cadence={cadence}
      {...rest}
    >
      {children}
    </StyledTypography>
  )
}
