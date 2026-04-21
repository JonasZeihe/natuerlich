// src/components/patterns/hero/HeroRecipe.tsx
'use client'

import { ReactNode } from 'react'
import styled from 'styled-components'
import Section from '@/components/primitives/Section'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import Typography from '@/design/typography'
import type { AxisKey, SectionToneKey, SurfaceToneKey } from '@/design/theme'

type ContainerSize = 'default' | 'wide' | 'narrow'
type HeroVariant = 'default' | 'split'

type HeroProps = {
  title: ReactNode
  kicker?: ReactNode
  lead?: ReactNode
  actions?: ReactNode
  media?: ReactNode
  container?: ContainerSize
  accent?: AxisKey | 'neutral'
  isPageHeader?: boolean
  titleId?: string
  variant?: HeroVariant
  mediaAspect?: string
  tone?: SectionToneKey
  mediaTone?: SurfaceToneKey
}

const isPrimitive = (node: ReactNode): node is string | number =>
  typeof node === 'string' || typeof node === 'number'

const Split = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
  gap: ${({ theme }) => theme.spacing(1.45)};
  align-items: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing(1)};
  }
`

const HeadStack = styled(Stack)`
  min-width: 0;
  justify-content: center;
  height: 100%;
`

const HeadWrap = styled.div`
  min-width: 0;
  align-self: stretch;
`

const MediaFrame = styled.div<{ $aspect?: string }>`
  width: 100%;
  border-radius: inherit;
  min-height: 100%;
  height: 100%;

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

export default function HeroRecipe({
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
}: HeroProps) {
  const titleVariant: 'h1' | 'h2' = isPageHeader ? 'h1' : 'h2'
  const titleAs: 'h1' | 'h2' = isPageHeader ? 'h1' : 'h2'
  const resolvedMediaTone = resolveMediaTone(mediaTone)

  const head = (
    <HeadWrap>
      <HeadStack gap={0.95}>
        {kicker ? (
          isPrimitive(kicker) ? (
            <Typography
              as="p"
              variant="caption"
              gutter={false}
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

        <Stack gap={0.58}>
          {isPrimitive(title) ? (
            <Typography
              as={titleAs}
              variant={titleVariant}
              id={titleId}
              accent={accent}
              tone="strong"
              gutter={false}
            >
              {title}
            </Typography>
          ) : (
            title
          )}

          {lead ? (
            isPrimitive(lead) ? (
              <Typography as="p" variant="body" gutter={false} tone="soft">
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
      <Surface
        tone={resolvedMediaTone}
        accent={accent}
        radius="large"
        bordered={resolvedMediaTone !== 'open'}
        padding="none"
      >
        <MediaFrame $aspect={mediaAspect}>
          <div className="inner">{media}</div>
        </MediaFrame>
      </Surface>
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
