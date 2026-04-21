// src/components/primitives/Section.tsx
'use client'

import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import Container from './Container'
import type { SectionToneKey } from '@/design/theme'

type ContainerSize = 'narrow' | 'default' | 'wide' | 'full'
type RhythmKey = 'compact' | 'default' | 'spacious'
type SectionVariant = 'intro' | 'body' | 'outro'

type Props = {
  container?: ContainerSize
  padY?: boolean
  header?: ReactNode
  footer?: ReactNode
  ariaLabel?: string
  titleId?: string
  rhythm?: RhythmKey
  variant?: SectionVariant
  tone?: SectionToneKey
  bleed?: boolean
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<'section'>, 'children'>

const RHYTHM_BY_VARIANT: Record<SectionVariant, RhythmKey> = {
  intro: 'spacious',
  body: 'default',
  outro: 'compact',
}

const resolveRhythm = (
  variant: SectionVariant,
  override?: RhythmKey
): RhythmKey => override ?? RHYTHM_BY_VARIANT[variant]

const Outer = styled.section<{
  $rhythm: RhythmKey
  $tone: SectionToneKey
  $bleed: boolean
}>`
  position: relative;
  width: 100%;
  ${({ theme, $rhythm, $tone, $bleed }) => {
    const rhythm = theme.layout.section[$rhythm]
    const tone = theme.getSectionTone($tone)

    return css`
      margin-block: ${rhythm.gap};

      ${$bleed
        ? css`
            margin-inline: calc(clamp(0.75rem, 3vw, 1.5rem) * -1);
          `
        : ''}

      @media (max-width: ${theme.breakpoints.md}) {
        margin-block: calc(${rhythm.gap} * 0.84);
      }

      @media (max-width: ${theme.breakpoints.sm}) {
        margin-block: calc(${rhythm.gap} * 0.72);
      }

      background: ${tone.base};

      ${tone.lineOpacity > 0
        ? css`
            border-bottom: 1px solid ${tone.line};
          `
        : ''}

      ${tone.overlayOpacity > 0 && tone.edge !== 'transparent'
        ? css`
            box-shadow:
              inset 0 1px 0 ${tone.edge},
              inset 0 -1px 0 ${tone.edge};
          `
        : ''}
    `
  }}
`

const Inner = styled.div<{ $padY: boolean; $rhythm: RhythmKey }>`
  position: relative;
  width: 100%;
  ${({ theme, $padY, $rhythm }) =>
    $padY
      ? css`
          padding-block: ${theme.layout.section[$rhythm].pad};

          @media (max-width: ${theme.breakpoints.md}) {
            padding-block: calc(${theme.layout.section[$rhythm].pad} * 0.86);
          }

          @media (max-width: ${theme.breakpoints.sm}) {
            padding-block: calc(${theme.layout.section[$rhythm].pad} * 0.74);
          }
        `
      : ''}
`

export default function Section({
  container = 'default',
  padY = true,
  header,
  footer,
  ariaLabel,
  titleId,
  rhythm,
  variant = 'body',
  tone = 'default',
  bleed = false,
  children,
  ...rest
}: Props) {
  const resolvedRhythm = resolveRhythm(variant, rhythm)
  const labelledBy = titleId ?? rest['aria-labelledby']
  const accessibleLabel = ariaLabel ?? rest['aria-label']
  const sectionAriaProps =
    accessibleLabel && !labelledBy
      ? {
          'aria-label': accessibleLabel,
        }
      : labelledBy
        ? {
            'aria-labelledby': labelledBy,
          }
        : {}

  return (
    <Outer
      $rhythm={resolvedRhythm}
      $tone={tone}
      $bleed={bleed}
      {...rest}
      {...sectionAriaProps}
    >
      <Inner $padY={padY} $rhythm={resolvedRhythm}>
        <Container max={container}>
          {header}
          {children}
          {footer}
        </Container>
      </Inner>
    </Outer>
  )
}
