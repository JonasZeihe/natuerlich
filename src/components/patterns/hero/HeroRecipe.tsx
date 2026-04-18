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

const isPrimitive = (n: ReactNode): n is string | number =>
  typeof n === 'string' || typeof n === 'number'

const Split = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: ${({ theme }) => theme.spacing(1.5)};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing(1)};
  }
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
    ${({ $aspect }) => ($aspect ? `aspect-ratio: ${$aspect};` : '')}
  }
`

const GradientBar = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.spacingHalf(0.8)};
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius.large};
  border-bottom-right-radius: ${({ theme }) => theme.borderRadius.large};
  background: ${({ theme }) => theme.gradients.highlight};
`

const ActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.8)};
  margin-top: ${({ theme }) => theme.spacingHalf(0.8)};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    justify-content: flex-start;
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
  const shouldUseAccentForTitle = !isPageHeader && accent !== 'neutral'

  const Head = (
    <Stack gap={1}>
      {kicker ? (
        isPrimitive(kicker) ? (
          <Typography as="p" variant="caption" tone="soft">
            {kicker}
          </Typography>
        ) : (
          kicker
        )
      ) : null}

      <Stack gap={0.55}>
        {isPrimitive(title) ? (
          <Typography
            as={titleAs}
            variant={titleVariant}
            id={titleId}
            {...(shouldUseAccentForTitle
              ? { accent }
              : { tone: 'strong' as const })}
          >
            {title}
          </Typography>
        ) : (
          title
        )}

        {lead ? (
          isPrimitive(lead) ? (
            <Typography as="p" variant="subtitle" tone="soft">
              {lead}
            </Typography>
          ) : (
            lead
          )
        ) : null}
      </Stack>

      {actions ? <ActionsRow>{actions}</ActionsRow> : null}
    </Stack>
  )

  const Media =
    media != null ? (
      <Surface tone="elevated" radius="large" bordered padding="none">
        <MediaFrame $aspect={mediaAspect}>
          <div className="inner">{media}</div>
        </MediaFrame>
        <GradientBar />
      </Surface>
    ) : null

  const sectionVariant = isPageHeader ? 'intro' : 'body'

  return (
    <Section
      container={container}
      padY
      variant={sectionVariant}
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
