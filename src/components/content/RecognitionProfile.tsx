// src/components/content/RecognitionProfile.tsx
'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import styled from 'styled-components'
import type { AssetConsumerSpec } from '@/components/assets/registry'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import type { AxisKey, MovementKey, SurfaceToneKey } from '@/design/theme'
import Typography from '@/design/typography'

type ProfileBlock = {
  label: ReactNode
  title: ReactNode
  children: ReactNode
  tone?: SurfaceToneKey
  accent?: AxisKey
  asset?: AssetConsumerSpec | null
}

type Credential = {
  title: ReactNode
  source: ReactNode
  period: ReactNode
  hours: ReactNode
}

type CredentialBlock = {
  label: ReactNode
  title: ReactNode
  items: readonly Credential[]
  tone?: SurfaceToneKey
  accent?: AxisKey
}

type Props = {
  movement: MovementKey
  path: ProfileBlock
  presence: ProfileBlock
  credentials: CredentialBlock
  teaching: ProfileBlock
  style: ProfileBlock
  scope: ProfileBlock
}

const DesktopShell = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.5)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

const MobileShell = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: grid;
    gap: ${({ theme }) => theme.spacing(1.25)};
  }
`

const DesktopLead = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.12fr);
  gap: ${({ theme }) => theme.spacing(1.5)};
  align-items: stretch;
`

const HumanPanel = styled(Surface)`
  height: 100%;
`

const HumanContent = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
  height: 100%;
`

const HumanBody = styled.div`
  max-width: 42rem;
`

const PresenceAside = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.75)};
  padding-top: ${({ theme }) => theme.spacing(1.25)};
  border-top: 1px solid ${({ theme }) => theme.roles.border.subtle};
`

const CredentialsPanel = styled(Surface)`
  height: 100%;
`

const DesktopTimeline = styled.ol`
  position: relative;
  display: grid;
  gap: ${({ theme }) => theme.spacing(1)};
  margin: 0;
  padding: 0 0 0 ${({ theme }) => theme.spacing(1.35)};
  list-style: none;

  &::before {
    content: '';
    position: absolute;
    left: 0.22rem;
    top: 0.45rem;
    bottom: 0.45rem;
    width: 1px;
    background: ${({ theme }) => theme.getMovementRole('recognition').border};
  }
`

const DesktopTimelineItem = styled.li`
  position: relative;
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.3)};

  &::before {
    content: '';
    position: absolute;
    left: calc(${({ theme }) => theme.spacing(1.35)} * -1);
    top: 0.48rem;
    width: 0.48rem;
    height: 0.48rem;
    border-radius: ${({ theme }) => theme.borderRadius.pill};
    background: ${({ theme }) => theme.getAxisRole('axisDensity').fill};
    box-shadow: 0 0 0 4px
      ${({ theme }) => theme.getMovementRole('recognition').field};
  }
`

const TimelineMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(0.25)}
    ${({ theme }) => theme.spacing(0.65)};
`

const MetaDivider = styled.span`
  color: ${({ theme }) => theme.roles.text.subtle};
`

const EvidenceRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(20rem, 0.8fr);
  gap: ${({ theme }) => theme.spacing(1.5)};
  align-items: start;
`

const TeachingPanel = styled(Surface)`
  min-height: 0;
`

const SideEvidence = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.5)};
`

const CompactPanel = styled(Surface)`
  min-height: 0;
`

const Body = styled.div`
  max-width: 44rem;
`

const WideBody = styled.div`
  max-width: 58rem;
`

const MobileLead = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1)};
`

const MobilePresenceNote = styled.div`
  padding-top: ${({ theme }) => theme.spacing(1)};
  border-top: 1px solid ${({ theme }) => theme.roles.border.subtle};
`

const MobileCredentialList = styled.ol`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.8)};
  margin: 0;
  padding: 0;
  list-style: none;
`

const MobileCredentialItem = styled.li`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.2)};
`

const MobileDeck = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.75)};
`

const MobileTrack = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: ${({ theme }) => theme.spacing(0.25)};
  padding: ${({ theme }) =>
    `${theme.spacing(0.25)} ${theme.spacing(0.25)} ${theme.spacing(1)}`};
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

const MobileSlide = styled.article`
  flex: 0 0 100%;
  min-width: 0;
  scroll-snap-align: start;
`

const MobileSegments = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing(0.4)};
`

const Segment = styled.button<{ $active: boolean }>`
  min-width: 0;
  border: 1px solid
    ${({ theme, $active }) =>
      $active
        ? theme.getAxisRole('axisDensity').border
        : theme.roles.border.subtle};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: ${({ theme, $active }) =>
    $active
      ? theme.getAxisRole('axisDensity').surface
      : theme.getMovementRole('recognition').quiet};
  color: ${({ theme, $active }) =>
    $active ? theme.getAxisRole('axisDensity').text : theme.roles.text.subtle};
  padding: ${({ theme }) =>
    `${theme.spacingHalf(1.35)} ${theme.spacing(0.75)}`};
  font: inherit;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.roles.focus.ring};
    outline-offset: 2px;
  }
`

const blockAccent = (block: { accent?: AxisKey }) =>
  block.accent ?? 'axisDensity'

const MobileProfileSurface = ({
  block,
  movement,
}: {
  block: ProfileBlock
  movement: MovementKey
}) => {
  const accent = blockAccent(block)

  return (
    <Surface
      tone={block.tone ?? 'card'}
      movement={movement}
      radius="large"
      bordered
      padding="lg"
      weight="steady"
      asset={block.asset}
    >
      <Body>
        <Stack gap={3}>
          <Typography as="p" variant="caption" gutter={false} accent={accent}>
            {block.label}
          </Typography>

          <Typography as="h3" variant="h3" gutter={false} color="primary">
            {block.title}
          </Typography>

          <Typography
            as="p"
            variant="body"
            gutter={false}
            tone="soft"
            cadence="open"
          >
            {block.children}
          </Typography>
        </Stack>
      </Body>
    </Surface>
  )
}

const DesktopCredentials = ({
  block,
  movement,
}: {
  block: CredentialBlock
  movement: MovementKey
}) => {
  const accent = block.accent ?? 'axisDensity'

  return (
    <CredentialsPanel
      tone={block.tone ?? 'field'}
      movement={movement}
      radius="large"
      bordered
      padding="lg"
      weight="steady"
    >
      <Stack gap={3}>
        <Typography as="p" variant="caption" gutter={false} accent={accent}>
          {block.label}
        </Typography>

        <Typography as="h3" variant="h3" gutter={false} color="primary">
          {block.title}
        </Typography>

        <DesktopTimeline>
          {block.items.map((item, index) => (
            <DesktopTimelineItem key={index}>
              <Typography
                as="h4"
                variant="subtitle"
                gutter={false}
                color="primary"
                measure="full"
              >
                {item.title}
              </Typography>

              <Typography as="p" variant="caption" gutter={false}>
                {item.source}
              </Typography>

              <TimelineMeta>
                <Typography as="span" variant="caption" gutter={false}>
                  {item.period}
                </Typography>

                <MetaDivider aria-hidden="true">·</MetaDivider>

                <Typography
                  as="span"
                  variant="caption"
                  gutter={false}
                  accent={accent}
                >
                  {item.hours}
                </Typography>
              </TimelineMeta>
            </DesktopTimelineItem>
          ))}
        </DesktopTimeline>
      </Stack>
    </CredentialsPanel>
  )
}

const DesktopHuman = ({
  path,
  presence,
  movement,
}: {
  path: ProfileBlock
  presence: ProfileBlock
  movement: MovementKey
}) => (
  <HumanPanel
    tone={path.tone ?? 'threshold'}
    movement={movement}
    radius="large"
    bordered
    padding="lg"
    weight="steady"
    asset={path.asset}
  >
    <HumanContent>
      <HumanBody>
        <Stack gap={3}>
          <Typography
            as="p"
            variant="caption"
            gutter={false}
            accent={blockAccent(path)}
          >
            {path.label}
          </Typography>

          <Typography as="h3" variant="h3" gutter={false} color="primary">
            {path.title}
          </Typography>

          <Typography
            as="p"
            variant="body"
            gutter={false}
            tone="soft"
            cadence="open"
          >
            {path.children}
          </Typography>
        </Stack>
      </HumanBody>

      <PresenceAside>
        <Typography
          as="p"
          variant="caption"
          gutter={false}
          accent={blockAccent(presence)}
        >
          {presence.label}
        </Typography>

        <Typography as="h3" variant="subtitle" gutter={false} color="primary">
          {presence.title}
        </Typography>

        <Typography
          as="p"
          variant="body"
          gutter={false}
          tone="soft"
          cadence="open"
        >
          {presence.children}
        </Typography>
      </PresenceAside>
    </HumanContent>
  </HumanPanel>
)

const DesktopTeaching = ({
  block,
  movement,
}: {
  block: ProfileBlock
  movement: MovementKey
}) => (
  <TeachingPanel
    tone={block.tone ?? 'card'}
    movement={movement}
    radius="large"
    bordered
    padding="lg"
    weight="steady"
    asset={block.asset}
  >
    <WideBody>
      <Stack gap={3}>
        <Typography
          as="p"
          variant="caption"
          gutter={false}
          accent={blockAccent(block)}
        >
          {block.label}
        </Typography>

        <Typography as="h3" variant="h3" gutter={false} color="primary">
          {block.title}
        </Typography>

        <Typography
          as="p"
          variant="body"
          gutter={false}
          tone="soft"
          cadence="open"
        >
          {block.children}
        </Typography>
      </Stack>
    </WideBody>
  </TeachingPanel>
)

const DesktopCompact = ({
  block,
  movement,
}: {
  block: ProfileBlock
  movement: MovementKey
}) => (
  <CompactPanel
    tone={block.tone ?? 'card'}
    movement={movement}
    radius="large"
    bordered
    padding="lg"
    weight="steady"
    asset={block.asset}
  >
    <Stack gap={3}>
      <Typography
        as="p"
        variant="caption"
        gutter={false}
        accent={blockAccent(block)}
      >
        {block.label}
      </Typography>

      <Typography as="h3" variant="subtitle" gutter={false} color="primary">
        {block.title}
      </Typography>

      <Typography
        as="p"
        variant="body"
        gutter={false}
        tone="soft"
        cadence="open"
      >
        {block.children}
      </Typography>
    </Stack>
  </CompactPanel>
)

const MobileCredentialSummary = ({
  block,
  movement,
}: {
  block: CredentialBlock
  movement: MovementKey
}) => {
  const accent = block.accent ?? 'axisDensity'

  return (
    <Surface
      tone={block.tone ?? 'field'}
      movement={movement}
      radius="large"
      bordered
      padding="md"
      weight="steady"
    >
      <Stack gap={3}>
        <Typography as="p" variant="caption" gutter={false} accent={accent}>
          {block.label}
        </Typography>

        <Typography as="h3" variant="h3" gutter={false} color="primary">
          {block.title}
        </Typography>

        <MobileCredentialList>
          {block.items.map((item, index) => (
            <MobileCredentialItem key={index}>
              <Typography
                as="h4"
                variant="subtitle"
                gutter={false}
                color="primary"
              >
                {item.title}
              </Typography>

              <Typography as="p" variant="caption" gutter={false}>
                {item.source} · {item.period}
              </Typography>

              <Typography
                as="p"
                variant="caption"
                gutter={false}
                accent={accent}
              >
                {item.hours}
              </Typography>
            </MobileCredentialItem>
          ))}
        </MobileCredentialList>
      </Stack>
    </Surface>
  )
}

const MobileEvidenceDeck = ({
  movement,
  items,
}: {
  movement: MovementKey
  items: readonly ProfileBlock[]
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const frameRef = useRef<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const syncActiveIndex = useCallback(() => {
    const track = trackRef.current

    if (!track?.clientWidth) return

    setActiveIndex(
      Math.max(
        0,
        Math.min(
          items.length - 1,
          Math.round(track.scrollLeft / track.clientWidth)
        )
      )
    )
  }, [items.length])

  const handleScroll = useCallback(() => {
    if (frameRef.current !== null) return

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null
      syncActiveIndex()
    })
  }, [syncActiveIndex])

  const goTo = useCallback((index: number) => {
    const track = trackRef.current

    if (!track) return

    track.scrollTo({
      left: track.clientWidth * index,
      behavior: 'smooth',
    })
  }, [])

  useEffect(
    () => () => {
      if (frameRef.current === null) return

      window.cancelAnimationFrame(frameRef.current)
    },
    []
  )

  return (
    <MobileDeck>
      <MobileSegments>
        {items.map((item, index) => (
          <Segment
            key={index}
            type="button"
            $active={index === activeIndex}
            onClick={() => goTo(index)}
          >
            <Typography as="span" variant="caption" gutter={false}>
              {item.label}
            </Typography>
          </Segment>
        ))}
      </MobileSegments>

      <MobileTrack ref={trackRef} onScroll={handleScroll}>
        {items.map((item, index) => (
          <MobileSlide key={index}>
            <MobileProfileSurface block={item} movement={movement} />
          </MobileSlide>
        ))}
      </MobileTrack>
    </MobileDeck>
  )
}

const RecognitionProfile = ({
  movement,
  path,
  presence,
  credentials,
  teaching,
  style,
  scope,
}: Props) => (
  <>
    <DesktopShell>
      <DesktopLead>
        <DesktopHuman path={path} presence={presence} movement={movement} />
        <DesktopCredentials block={credentials} movement={movement} />
      </DesktopLead>

      <EvidenceRow>
        <DesktopTeaching block={teaching} movement={movement} />

        <SideEvidence>
          <DesktopCompact block={style} movement={movement} />
          <DesktopCompact block={scope} movement={movement} />
        </SideEvidence>
      </EvidenceRow>
    </DesktopShell>

    <MobileShell>
      <Surface
        tone={path.tone ?? 'threshold'}
        movement={movement}
        radius="large"
        bordered
        padding="md"
        weight="steady"
        asset={path.asset}
      >
        <MobileLead>
          <Typography
            as="p"
            variant="caption"
            gutter={false}
            accent={blockAccent(path)}
          >
            {path.label}
          </Typography>

          <Typography as="h3" variant="h3" gutter={false} color="primary">
            {path.title}
          </Typography>

          <Typography
            as="p"
            variant="body"
            gutter={false}
            tone="soft"
            cadence="open"
          >
            {path.children}
          </Typography>

          <MobilePresenceNote>
            <Typography
              as="p"
              variant="caption"
              gutter={false}
              accent={blockAccent(presence)}
            >
              {presence.label}
            </Typography>

            <Typography as="p" variant="body" gutter={false} tone="soft">
              {presence.children}
            </Typography>
          </MobilePresenceNote>
        </MobileLead>
      </Surface>

      <MobileCredentialSummary block={credentials} movement={movement} />

      <MobileEvidenceDeck
        movement={movement}
        items={[teaching, style, scope]}
      />
    </MobileShell>
  </>
)

export default RecognitionProfile
