// src/components/compositions/lead/LeadBlock.tsx
'use client'

import { ReactNode } from 'react'
import styled from 'styled-components'
import Section from '@/components/primitives/Section'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import Typography from '@/design/typography'
import type { AxisKey, SectionToneKey, SurfaceToneKey } from '@/design/theme'

type ContainerSize = 'default' | 'wide' | 'narrow'
type LeadBlockVariant = 'default' | 'split'

type LeadBlockProps = {
  title: ReactNode
  kicker?: ReactNode
  lead?: ReactNode
  actions?: ReactNode
  media?: ReactNode
  container?: ContainerSize
  accent?: AxisKey | 'neutral'
  isPageHeader?: boolean
  titleId?: string
  variant?: LeadBlockVariant
  mediaAspect?: string
  tone?: SectionToneKey
  mediaTone?: SurfaceToneKey
}

const isPrimitive = (node: ReactNode): node is string | number =>
  typeof node === 'string' || typeof node === 'number'

const Split = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.06fr) minmax(0, 0.94fr);
  gap: ${({ theme }) => theme.spacing(1.5)};
  align-items: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing(1.05)};
  }
`

const HeadWrap = styled(Surface)`
  height: 100%;
`

const HeadStack = styled(Stack)`
  min-width: 0;
  justify-content: center;
  min-height: 100%;
`

const MediaShell = styled(Surface)`
  height: 100%;
`

const MediaFrame = styled.div<{ $aspect?: string }>`
  width: 100%;
  min-height: 100%;
  height: 100%;
  border-radius: inherit;

  .inner {
    position: relative;
    width: 100%;
    min-height: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: inherit;
    display: flex;
    align-items: stretch;
    ${({ $aspect }) => ($aspect ? `aspect-ratio: ${$aspect};` : '')}

    > * {
      width: 100%;
      min-height: 100%;
    }
  }
`

const ActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.8)};
  margin-top: ${({ theme }) => theme.spacingHalf(0.6)};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    align-items: stretch;

    > * {
      flex: 1 1 auto;
    }
  }
`

const resolveMediaTone = (tone: SurfaceToneKey): SurfaceToneKey => {
  if (tone === 'none') return 'open'
  if (tone === 'subtle') return 'soft'
  if (tone === 'neutral') return 'panel'
  return tone
}

export default function LeadBlock({
  title,
  kicker,
  lead,
  actions,
  media,
  container = 'wide',
  accent = 'axisEnergy',
  isPageHeader = false,
  titleId,
  variant = 'default',
  mediaAspect,
  tone = 'default',
  mediaTone = 'soft',
}: LeadBlockProps) {
  const titleVariant: 'h1' | 'h2' = isPageHeader ? 'h1' : 'h2'
  const titleAs: 'h1' | 'h2' = isPageHeader ? 'h1' : 'h2'
  const resolvedMediaTone = resolveMediaTone(mediaTone)

  const head = (
    <HeadWrap
      tone="soft"
      accent={accent}
      radius="large"
      bordered
      padding="lg"
      density="balanced"
      emphasis="steady"
    >
      <HeadStack gap={1}>
        {kicker ? (
          isPrimitive(kicker) ? (
            <Typography
              as="p"
              variant="caption"
              gutter={false}
              measure="wide"
              {...(accent !== 'neutral'
                ? { accent }
                : { tone: 'soft' as const })}
            >
              {kicker}
            </Typography>
          ) : (
            kicker
          )
        ) : null}

        <Stack gap={0.7}>
          {isPrimitive(title) ? (
            <Typography
              as={titleAs}
              variant={titleVariant}
              id={titleId}
              accent={accent}
              tone="strong"
              cadence="dense"
              measure="title"
              gutter={false}
            >
              {title}
            </Typography>
          ) : (
            title
          )}

          {lead ? (
            isPrimitive(lead) ? (
              <Typography
                as="p"
                variant="body"
                gutter={false}
                tone="soft"
                cadence="open"
                measure="prose"
              >
                {lead}
              </Typography>
            ) : (
              lead
            )
          ) : null}
        </Stack>

        {actions ? <ActionsRow>{actions}</ActionsRow> : null}
      </HeadStack>
    </HeadWrap>
  )

  const mediaNode =
    media != null ? (
      <MediaShell
        tone={resolvedMediaTone}
        accent={accent}
        radius="large"
        bordered={resolvedMediaTone !== 'open'}
        padding="none"
        emphasis="steady"
      >
        <MediaFrame $aspect={mediaAspect}>
          <div className="inner">{media}</div>
        </MediaFrame>
      </MediaShell>
    ) : null

  return (
    <Section
      id={isPageHeader ? 'einstieg' : undefined}
      container={container}
      padY
      variant={isPageHeader ? 'intro' : 'body'}
      tone={tone}
      ariaLabel={isPageHeader ? 'Einstieg' : undefined}
      titleId={isPrimitive(title) ? titleId : undefined}
    >
      {variant === 'split' ? (
        <Split>
          {head}
          {mediaNode}
        </Split>
      ) : (
        <Stack gap={1}>
          {head}
          {mediaNode}
        </Stack>
      )}
    </Section>
  )
}
