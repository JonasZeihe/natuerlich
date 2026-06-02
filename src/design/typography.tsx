// src/design/typography.tsx
'use client'

import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from 'react'
import styled, { css, type DefaultTheme } from 'styled-components'
import type { AppTheme } from '@/design/theme'

type Variant = 'h1' | 'h2' | 'h3' | 'subtitle' | 'body' | 'caption'
type Align = 'left' | 'right' | 'center' | 'justify'
type Tone = 'neutral' | 'soft' | 'strong'
type SemanticColor = keyof AppTheme['color']['text']
type Measure = 'none' | 'compact' | 'title' | 'prose' | 'wide' | 'full'
type Cadence = 'neutral' | 'open' | 'dense'

type TypographyProps<T extends ElementType = 'span'> = {
  as?: T
  variant?: Variant
  align?: Align
  color?: SemanticColor
  tone?: Tone
  measure?: Measure
  cadence?: Cadence
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'color' | 'children'>

const TAG_MAP: Record<Variant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  subtitle: 'p',
  body: 'p',
  caption: 'span',
}

const variantCSS = (variant: Variant, theme: DefaultTheme) => {
  const {
    typography: { fontSize, fontWeight, lineHeight, letterSpacing },
  } = theme

  switch (variant) {
    case 'h1':
      return css`
        font-size: ${fontSize.h1};
        font-weight: ${fontWeight.bold};
        line-height: ${lineHeight.tight};
        letter-spacing: ${letterSpacing.tighter};
        text-wrap: balance;
      `
    case 'h2':
      return css`
        font-size: ${fontSize.h2};
        font-weight: ${fontWeight.bold};
        line-height: 1.16;
        letter-spacing: ${letterSpacing.tight};
        text-wrap: balance;
      `
    case 'h3':
      return css`
        font-size: ${fontSize.h3};
        font-weight: ${fontWeight.medium};
        line-height: 1.32;
        letter-spacing: ${letterSpacing.normal};
        text-wrap: balance;
      `
    case 'subtitle':
      return css`
        font-size: ${fontSize.subtitle};
        font-weight: ${fontWeight.medium};
        line-height: 1.48;
        letter-spacing: ${letterSpacing.normal};
      `
    case 'caption':
      return css`
        font-size: ${fontSize.caption};
        font-weight: ${fontWeight.medium};
        line-height: 1.42;
        letter-spacing: ${letterSpacing.normal};
      `
    default:
      return css`
        font-size: ${fontSize.body};
        font-weight: ${fontWeight.regular};
        line-height: ${lineHeight.normal};
        letter-spacing: ${letterSpacing.normal};
      `
  }
}

const measureCSS = (measure: Measure, theme: DefaultTheme) => {
  if (measure === 'none') return ''

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

type StyledProps = {
  $variant: Variant
  $align: Align
  $semanticColor?: SemanticColor
  $tone: Tone
  $measure: Measure
  $cadence: Cadence
}

const StyledTypography = styled.span<StyledProps>`
  margin: 0;
  padding: 0;
  min-width: 0;
  text-align: ${({ $align }) => $align};
  ${({ $variant, theme }) => variantCSS($variant, theme)}
  ${({ $measure, theme }) => measureCSS($measure, theme)}
  ${({ $cadence, $variant }) => cadenceCSS($cadence, $variant)}

  ${({ theme, $semanticColor, $tone }) => {
    if ($semanticColor) {
      return css`
        color: ${theme.color.text[$semanticColor]};
      `
    }

    if ($tone === 'soft') {
      return css`
        color: ${theme.color.text.soft};
      `
    }

    if ($tone === 'strong') {
      return css`
        color: ${theme.color.text.primary};
      `
    }

    return css`
      color: inherit;
    `
  }}

  a {
    color: ${({ theme }) => theme.color.text.link};
    text-decoration-color: ${({ theme }) => theme.color.text.link};
  }

  a:hover {
    color: ${({ theme }) => theme.color.text.linkHover};
    text-decoration-color: ${({ theme }) => theme.color.text.linkHover};
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

export default function Typography<T extends ElementType = 'span'>({
  variant = 'body',
  align = 'left',
  color,
  tone = 'neutral',
  measure = 'none',
  cadence = 'neutral',
  as,
  children,
  ...rest
}: TypographyProps<T>) {
  const componentTag = as ?? TAG_MAP[variant] ?? 'span'

  return (
    <StyledTypography
      as={componentTag}
      $variant={variant}
      $align={align}
      $semanticColor={color}
      $tone={tone}
      $measure={measure}
      $cadence={cadence}
      {...rest}
    >
      {children}
    </StyledTypography>
  )
}
