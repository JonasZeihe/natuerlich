// src/components/primitives/Section.tsx
'use client'

import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import AnchoredAsset from '@/components/assets/AnchoredAsset'
import type {
  AssetConsumerSpec,
  PositionedAssetSpec,
} from '@/components/assets/registry'
import type { EnergyInput, EnergyMix, SectionToneKey } from '@/design/theme'
import Container from './Container'

type ContainerSize = 'narrow' | 'default' | 'wide' | 'full'
type RhythmKey = 'compact' | 'default' | 'spacious'
type SectionVariant = 'intro' | 'body' | 'outro'
type SectionFrame = 'content' | 'screen'
type RailSize = 'prose' | 'content' | 'wide' | 'full'
type RailAlign = 'start' | 'center' | 'end'
type LegacyContent = 'default' | 'left' | 'center' | 'right'

type Props = {
  container?: ContainerSize
  rail?: RailSize
  align?: RailAlign
  content?: LegacyContent
  frame?: SectionFrame
  padY?: boolean
  header?: ReactNode
  footer?: ReactNode
  ariaLabel?: string
  titleId?: string
  rhythm?: RhythmKey
  variant?: SectionVariant
  tone?: SectionToneKey
  energy?: EnergyInput
  mix?: EnergyMix
  bleed?: boolean
  asset?: AssetConsumerSpec | null
  assets?: readonly PositionedAssetSpec[] | null
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<'section'>, 'children'>

const RHYTHM_BY_VARIANT: Record<SectionVariant, RhythmKey> = {
  intro: 'spacious',
  body: 'default',
  outro: 'compact',
}

const LEGACY_ALIGN: Record<LegacyContent, RailAlign> = {
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
  override?: RhythmKey
): RhythmKey => override ?? RHYTHM_BY_VARIANT[variant]

const Outer = styled.section<{
  $tone: SectionToneKey
  $bleed: boolean
}>`
  position: relative;
  width: 100%;
  isolation: isolate;
  background: ${({ theme, $tone }) => theme.color.section[$tone]};

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
  z-index: 1;
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

            @media (max-width: ${theme.breakpoints.md}) {
              padding-block: calc(${sectionSpace} * 0.82);
            }

            @media (max-width: ${theme.breakpoints.sm}) {
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
    $rhythm === 'compact'
      ? theme.layout.flow.cluster
      : theme.layout.flow.region};

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

const renderAssets = (
  assets: readonly PositionedAssetSpec[] | null | undefined
) =>
  assets?.map((item, index) => (
    <AnchoredAsset
      key={`${item.name}-${index}`}
      {...item}
      placement="section"
    />
  )) ?? null

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
  tone = 'default',
  energy: _energy,
  mix: _mix,
  bleed = false,
  asset,
  assets,
  children,
  ...rest
}: Props) {
  const resolvedRhythm = resolveRhythm(variant, rhythm)
  const resolvedAlign = align ?? LEGACY_ALIGN[content]
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
      {asset ? <AnchoredAsset {...asset} placement="section" /> : null}
      {renderAssets(assets)}

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
