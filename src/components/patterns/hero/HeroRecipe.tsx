// src/components/patterns/hero/HeroRecipe.tsx
'use client'

import { ReactNode } from 'react'
import styled from 'styled-components'
import Section from '@/components/primitives/Section'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import Typography from '@/design/typography'
import type { AxisKey } from '@/design/theme'

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
}

const isPrimitive = (node: ReactNode): node is string | number =>
  typeof node === 'string' || typeof node === 'number'

const Split = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.18fr) minmax(0, 0.92fr);
  gap: ${({ theme }) => theme.spacing(1.6)};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing(1.1)};
  }
`

const HeadStack = styled(Stack)`
  min-width: 0;
`

const MediaFrame = styled.div<{ $aspect?: string }>`
  width: 100%;
  background: ${({ theme }) => theme.roles.surface.panelAlt};
  border-radius: inherit;

  .inner {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: inherit;
    display: flex;
    align-items: stretch;
    ${({ $aspect }) => ($aspect ? `aspect-ratio: ${$aspect};` : '')}

    > * {
      width: 100%;
    }
  }
`

const ActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.8)};
  margin-top: ${({ theme }) => theme.spacingHalf(0.8)};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    align-items: stretch;

    > * {
      flex: 1 1 auto;
    }
  }
`

export default function HeroRecipe({
  title,
  kicker,
  lead,
  actions,
  media,
  container = 'wide',
  accent = 'neutral',
  isPageHeader = false,
  titleId,
  variant = 'default',
  mediaAspect,
}: HeroProps) {
  const titleVariant: 'h1' | 'h2' = isPageHeader ? 'h1' : 'h2'
  const titleAs: 'h1' | 'h2' = isPageHeader ? 'h1' : 'h2'

  const Head = (
    <HeadStack gap={1}>
      {kicker ? (
        isPrimitive(kicker) ? (
          <Typography
            as="p"
            variant="caption"
            gutter={false}
            {...(accent !== 'neutral' ? { accent } : { tone: 'soft' as const })}
          >
            {kicker}
          </Typography>
        ) : (
          kicker
        )
      ) : null}

      <Stack gap={0.65}>
        {isPrimitive(title) ? (
          <Typography
            as={titleAs}
            variant={titleVariant}
            id={titleId}
            tone="strong"
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
  )

  const Media =
    media != null ? (
      <Surface tone="elevated" radius="large" bordered padding="none">
        <MediaFrame $aspect={mediaAspect}>
          <div className="inner">{media}</div>
        </MediaFrame>
      </Surface>
    ) : null

  const sectionVariant = isPageHeader ? 'intro' : 'body'

  return (
    <Section
      id={isPageHeader ? 'einstieg' : undefined}
      container={container}
      padY
      variant={sectionVariant}
      ariaLabel={isPageHeader ? 'Einstieg' : undefined}
      titleId={isPrimitive(title) ? titleId : undefined}
    >
      {variant === 'split' ? (
        <Split>
          <div>{Head}</div>
          {Media}
        </Split>
      ) : (
        <Stack gap={1.15}>
          {Head}
          {Media}
        </Stack>
      )}
    </Section>
  )
}
