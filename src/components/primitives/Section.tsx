// src/components/primitives/Section.tsx
'use client'

import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import AnchoredAsset from '@/components/assets/AnchoredAsset'
import type {
  AssetConsumerSpec,
  PositionedAssetSpec,
} from '@/components/assets/registry'
import type {
  EnergyInput,
  EnergyMix,
  MovementKey,
  SectionToneKey,
} from '@/design/theme'
import Container from './Container'

type ContainerSize = 'narrow' | 'default' | 'wide' | 'full'
type RhythmKey = 'compact' | 'default' | 'spacious'
type SectionVariant = 'intro' | 'body' | 'outro'
type SectionContent = 'default' | 'left' | 'center' | 'right'
type SectionFrame = 'content' | 'screen'

type Props = {
  container?: ContainerSize
  content?: SectionContent
  frame?: SectionFrame
  padY?: boolean
  header?: ReactNode
  footer?: ReactNode
  ariaLabel?: string
  titleId?: string
  rhythm?: RhythmKey
  variant?: SectionVariant
  tone?: SectionToneKey
  movement?: MovementKey
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

const resolveRhythm = (
  variant: SectionVariant,
  override?: RhythmKey
): RhythmKey => override ?? RHYTHM_BY_VARIANT[variant]

const Outer = styled.section<{
  $tone: SectionToneKey
  $energy?: EnergyInput
  $mix?: EnergyMix
  $bleed: boolean
}>`
  position: relative;
  width: 100%;
  isolation: isolate;

  ${({ theme, $tone, $energy, $mix, $bleed }) => {
    const tone = theme.getSectionTone($tone, $energy, $mix)

    return css`
      ${$bleed
        ? css`
            margin-inline: calc(${theme.layout.containerInset} * -1);
          `
        : ''}

      background: ${tone.base};

      ${tone.overlayOpacity > 0 && tone.edge !== 'transparent'
        ? css`
            box-shadow: inset 0 1px 0 ${tone.edge};
          `
        : ''}

      ${tone.lineOpacity > 0
        ? css`
            border-bottom: 1px solid ${tone.line};
          `
        : ''}

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 0;
        opacity: ${tone.washOpacity * 0.72};
        background: linear-gradient(
          180deg,
          ${tone.wash} 0%,
          transparent 22%,
          transparent 78%,
          ${tone.wash} 100%
        );
      }
    `
  }}
`

const Inner = styled.div<{
  $padY: boolean
  $rhythm: RhythmKey
  $tone: SectionToneKey
  $energy?: EnergyInput
  $mix?: EnergyMix
  $frame: SectionFrame
}>`
  position: relative;
  z-index: 1;
  width: 100%;

  ${({ theme, $padY, $rhythm, $tone, $energy, $mix, $frame }) => {
    const rhythm = theme.layout.section[$rhythm]
    const tone = theme.getSectionTone($tone, $energy, $mix)

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
            padding-block: calc(${rhythm.pad} * ${tone.padScale});

            @media (max-width: ${theme.breakpoints.md}) {
              padding-block: calc(${rhythm.pad} * ${tone.padScale} * 0.86);
            }

            @media (max-width: ${theme.breakpoints.sm}) {
              padding-block: calc(${rhythm.pad} * ${tone.padScale} * 0.74);
            }
          `
        : ''}
    `
  }}

  > * {
    width: 100%;
  }
`

const Content = styled.div<{ $content: SectionContent }>`
  width: 100%;
  min-width: 0;

  ${({ theme, $content }) => {
    if ($content === 'left') {
      return css`
        max-width: 48rem;
        margin-right: auto;
        margin-left: clamp(1rem, 7vw, 7rem);

        @media (max-width: ${theme.breakpoints.md}) {
          max-width: 42rem;
          margin-left: 0;
        }
      `
    }

    if ($content === 'center') {
      return css`
        max-width: 48rem;
        margin-inline: auto;

        @media (max-width: ${theme.breakpoints.md}) {
          max-width: 42rem;
        }
      `
    }

    if ($content === 'right') {
      return css`
        max-width: 48rem;
        margin-left: auto;
        margin-right: clamp(1rem, 7vw, 7rem);

        @media (max-width: ${theme.breakpoints.md}) {
          max-width: 42rem;
          margin-right: 0;
        }
      `
    }

    return ''
  }}
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
  energy,
  mix,
  bleed = false,
  asset,
  assets,
  children,
  ...rest
}: Props) {
  const resolvedRhythm = resolveRhythm(variant, rhythm)
  const labelledBy = titleId ?? rest['aria-labelledby']
  const accessibleLabel = ariaLabel ?? rest['aria-label']
  const sectionAriaProps =
    accessibleLabel && !labelledBy
      ? { 'aria-label': accessibleLabel }
      : labelledBy
        ? { 'aria-labelledby': labelledBy }
        : {}

  return (
    <Outer
      $tone={tone}
      $energy={energy}
      $mix={mix}
      $bleed={bleed}
      {...rest}
      {...sectionAriaProps}
    >
      {asset ? <AnchoredAsset {...asset} placement="section" /> : null}
      {renderAssets(assets)}

      <Inner
        $padY={padY}
        $rhythm={resolvedRhythm}
        $tone={tone}
        $energy={energy}
        $mix={mix}
        $frame={frame}
      >
        <Container max={container}>
          <Content $content={content}>
            {header}
            {children}
            {footer}
          </Content>
        </Container>
      </Inner>
    </Outer>
  )
}
