// src/design/typography.tsx
'use client'

import { type ComponentPropsWithoutRef, type ReactNode } from 'react'
import styled, { css } from 'styled-components'
import type { TextStyleKey } from './theme'

type Variant = TextStyleKey
type Tone = 'default' | 'soft' | 'muted' | 'strong' | 'inverse' | 'danger'
type Measure = 'auto' | 'none' | 'title' | 'text' | 'wide'
type Element = 'h1' | 'h2' | 'h3' | 'p' | 'span'

type TypographyProps = {
  as?: Element
  variant?: Variant
  tone?: Tone
  measure?: Measure
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<'span'>, 'as' | 'children' | 'color'>

const defaultTag: Record<Variant, Element> = {
  hero: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  body: 'p',
  small: 'span',
}

const variantStyles = css<{ $variant: Variant; $measure: Measure }>`
  ${({ theme, $variant, $measure }) => {
    const style = theme.text[$variant]

    return css`
      font-family: ${style.fontFamily};
      font-size: ${style.fontSize};
      font-weight: ${style.fontWeight};
      line-height: ${style.lineHeight};
      letter-spacing: ${style.letterSpacing};
      max-width: ${$measure === 'auto' ? style.maxWidth : 'none'};
      text-wrap: ${$variant === 'body' || $variant === 'small'
        ? 'pretty'
        : 'balance'};
    `
  }}
`

const toneStyles = css<{ $tone: Tone }>`
  ${({ theme, $tone }) => {
    if ($tone === 'soft') {
      return css`
        color: ${theme.color.text.soft};
      `
    }

    if ($tone === 'muted') {
      return css`
        color: ${theme.color.text.muted};
      `
    }

    if ($tone === 'strong') {
      return css`
        color: ${theme.color.text.default};
      `
    }

    if ($tone === 'inverse') {
      return css`
        color: ${theme.color.text.inverse};
      `
    }

    if ($tone === 'danger') {
      return css`
        color: ${theme.color.text.danger};
      `
    }

    return css`
      color: inherit;
    `
  }}
`

const measureStyles = css<{ $measure: Measure }>`
  ${({ theme, $measure }) => {
    if ($measure === 'auto') return ''
    if ($measure === 'none') {
      return css`
        max-width: none;
      `
    }

    return css`
      max-width: ${theme.font.measure[$measure]};
    `
  }}
`

const Text = styled.span<{
  $variant: Variant
  $tone: Tone
  $measure: Measure
}>`
  min-width: 0;
  margin: 0;
  padding: 0;

  ${variantStyles}
  ${toneStyles}
  ${measureStyles}

  a {
    color: ${({ theme }) => theme.color.link.default};
    text-decoration-color: ${({ theme }) => theme.color.link.default};
  }

  a:hover {
    color: ${({ theme }) => theme.color.link.hover};
    text-decoration-color: ${({ theme }) => theme.color.link.hover};
  }

  strong {
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: inherit;
  }

  em {
    font-style: italic;
    color: inherit;
  }
`

export default function Typography({
  as,
  variant = 'body',
  tone = 'default',
  measure = 'auto',
  children,
  ...rest
}: TypographyProps) {
  return (
    <Text
      as={as ?? defaultTag[variant]}
      $variant={variant}
      $tone={tone}
      $measure={measure}
      {...rest}
    >
      {children}
    </Text>
  )
}
