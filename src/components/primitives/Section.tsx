// src/components/primitives/Section.tsx
'use client'

import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import styled, { css, type DefaultTheme } from 'styled-components'
import Container from './Container'

type ContainerSize = keyof DefaultTheme['layout']['container']
type RhythmKey = keyof DefaultTheme['layout']['section']
type SectionVariant = 'intro' | 'body' | 'outro'
type SectionFrame = 'content' | 'screen'
type RailSize = 'prose' | 'content' | 'wide' | 'full'
type RailAlign = 'start' | 'center' | 'end'
type ContentAlign = 'default' | 'left' | 'center' | 'right'
type SectionTone = 'transparent' | keyof DefaultTheme['color']['surface']

type Props = {
  container?: ContainerSize
  rail?: RailSize
  align?: RailAlign
  content?: ContentAlign
  frame?: SectionFrame
  padY?: boolean
  header?: ReactNode
  footer?: ReactNode
  ariaLabel?: string
  titleId?: string
  rhythm?: RhythmKey
  variant?: SectionVariant
  tone?: SectionTone
  bleed?: boolean
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<'section'>, 'children'>

const RHYTHM_BY_VARIANT: Record<SectionVariant, RhythmKey> = {
  intro: 'spacious',
  body: 'default',
  outro: 'compact',
}

const ALIGN_BY_CONTENT: Record<ContentAlign, RailAlign> = {
  default: 'center',
  left: 'start',
  center: 'center',
  right: 'end',
}

const RAIL_WIDTH: Record<RailSize, string> = {
  prose: '44rem',
  content: '56rem',
  wide: '72rem',
  full: 'none',
}

const resolveRhythm = (
  variant: SectionVariant,
  rhythm?: RhythmKey
): RhythmKey => rhythm ?? RHYTHM_BY_VARIANT[variant]

const Outer = styled.section<{
  $tone: SectionTone
  $bleed: boolean
}>`
  position: relative;
  width: 100%;
  isolation: isolate;
  background: ${({ theme, $tone }) =>
    $tone === 'transparent' ? 'transparent' : theme.color.surface[$tone]};

  ${({ theme, $bleed }) =>
    $bleed
      ? css`
          margin-inline: calc(${theme.layout.inset.page} * -1);
        `
      : ''}
`

const Inner = styled.div<{
  $padY: boolean
  $rhythm: RhythmKey
  $frame: SectionFrame
}>`
  position: relative;
  width: 100%;

  ${({ theme, $padY, $rhythm, $frame }) => {
    const sectionSpace = theme.layout.section[$rhythm]

    return css`
      ${$frame === 'screen'
        ? css`
            min-height: calc(100svh - var(--site-header-height, 0px));
            display: grid;
            align-items: center;
          `
        : ''}

      ${$padY
        ? css`
            padding-block: ${sectionSpace};

            @media (max-width: ${theme.breakpoint.md}) {
              padding-block: calc(${sectionSpace} * 0.82);
            }

            @media (max-width: ${theme.breakpoint.sm}) {
              padding-block: calc(${sectionSpace} * 0.72);
            }
          `
        : ''}
    `
  }}
`

const Rail = styled.div<{
  $rail: RailSize
  $align: RailAlign
  $rhythm: RhythmKey
}>`
  display: grid;
  width: 100%;
  min-width: 0;
  gap: ${({ theme, $rhythm }) =>
    $rhythm === 'compact' ? theme.layout.gap.cluster : theme.layout.gap.region};

  ${({ $rail }) =>
    $rail === 'full'
      ? css`
          max-width: none;
        `
      : css`
          max-width: ${RAIL_WIDTH[$rail]};
        `}

  ${({ $align }) =>
    $align === 'start'
      ? css`
          margin-right: auto;
        `
      : $align === 'end'
        ? css`
            margin-left: auto;
          `
        : css`
            margin-inline: auto;
          `}
`

export default function Section({
  container = 'default',
  rail = 'wide',
  align,
  content = 'default',
  frame = 'content',
  padY = true,
  header,
  footer,
  ariaLabel,
  titleId,
  rhythm,
  variant = 'body',
  tone = 'transparent',
  bleed = false,
  children,
  ...rest
}: Props) {
  const resolvedRhythm = resolveRhythm(variant, rhythm)
  const resolvedAlign = align ?? ALIGN_BY_CONTENT[content]
  const labelledBy = titleId ?? rest['aria-labelledby']
  const accessibleLabel = ariaLabel ?? rest['aria-label']

  const sectionAriaProps =
    accessibleLabel && !labelledBy
      ? { 'aria-label': accessibleLabel }
      : labelledBy
        ? { 'aria-labelledby': labelledBy }
        : {}

  return (
    <Outer $tone={tone} $bleed={bleed} {...rest} {...sectionAriaProps}>
      <Inner $padY={padY} $rhythm={resolvedRhythm} $frame={frame}>
        <Container max={container}>
          <Rail $rail={rail} $align={resolvedAlign} $rhythm={resolvedRhythm}>
            {header}
            {children}
            {footer}
          </Rail>
        </Container>
      </Inner>
    </Outer>
  )
}
