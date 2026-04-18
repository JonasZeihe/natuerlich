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
type TypographyProps = {
  variant?: Variant
  align?: Align
  color?: SemanticColor
  accent?: AxisKey | 'neutral'
  tone?: Tone
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
        letter-spacing: ${letterSpacing.tight};
        margin-bottom: ${gutter ? spacing(2.5) : 0};
      `
    case 'h2':
      return css`
        font-size: ${fontSize.h2};
        font-weight: ${fontWeight.bold};
        line-height: 1.16;
        letter-spacing: ${letterSpacing.tight};
        margin-bottom: ${gutter ? spacing(2) : 0};
      `
    case 'h3':
      return css`
        font-size: ${fontSize.h3};
        font-weight: ${fontWeight.medium};
        line-height: 1.34;
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
        font-weight: ${fontWeight.regular};
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

type StyledProps = {
  $variant: Variant
  $align: Align
  $gutter: boolean
  $semanticColor?: SemanticColor
  $accent?: AxisKey | 'neutral'
  $tone: Tone
}

const StyledTypography = styled.span<StyledProps>`
  margin: 0;
  padding: 0;
  text-align: ${({ $align }) => $align};
  ${({ $variant, theme, $gutter }) => variantCSS($variant, theme, $gutter)}

  ${({ theme, $variant, $semanticColor, $accent, $tone }) => {
    if ($semanticColor) {
      return css`
        color: ${theme.roles.text[$semanticColor]};
      `
    }

    if ($accent) {
      const axis = theme.getAxisRole($accent)
      return css`
        color: ${axis.text};
      `
    }

    if ($tone === 'soft') {
      return css`
        color: ${theme.roles.text.subtle};
      `
    }

    if ($tone === 'strong') {
      return css`
        color: ${theme.roles.text.primary};
        text-wrap: balance;
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
`

export default function Typography({
  variant = 'body',
  align = 'left',
  color,
  accent,
  tone = 'neutral',
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
      {...rest}
    >
      {children}
    </StyledTypography>
  )
}
