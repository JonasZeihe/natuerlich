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
  title?: ReactNode
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
  title?: ReactNode
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

type ProfileCardProps = {
  block: ProfileBlock
  movement: MovementKey
  headingVariant?: 'h3' | 'subtitle'
  bodyWidth?: 'body' | 'wide' | 'full'
  padding?: 'md' | 'lg'
  children?: ReactNode
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

const EvidenceRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(20rem, 0.8fr);
  gap: ${({ theme }) => theme.spacing(1.5)};
  align-items: start;
`

const SideEvidence = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.5)};
`

const CardSurface = styled(Surface)`
  min-height: 0;
`

const LeadSurface = styled(Surface)`
  height: 100%;
`

const CredentialsSurface = styled(Surface)`
  height: 100%;
`

const CardBody = styled.div<{ $width: 'body' | 'wide' | 'full' }>`
  max-width: ${({ $width }) =>
    $width === 'wide' ? '58rem' : $width === 'body' ? '44rem' : 'none'};
`

const PresenceNote = styled.div`
  padding-top: ${({ theme }) => theme.spacing(1.25)};
  border-top: 1px solid ${({ theme }) => theme.roles.border.subtle};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-top: ${({ theme }) => theme.spacing(1)};
  }
`

const CredentialList = styled.ol`
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

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing(0.8)};
    padding-left: 0;

    &::before {
      display: none;
    }
  }
`

const CredentialItem = styled.li`
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

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing(0.2)};

    &::before {
      display: none;
    }
  }
`

const CredentialMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(0.25)}
    ${({ theme }) => theme.spacing(0.65)};
`

const MetaDivider = styled.span`
  color: ${({ theme }) => theme.roles.text.subtle};
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

const ProfileCard = ({
  block,
  movement,
  headingVariant = 'h3',
  bodyWidth = 'body',
  padding = 'lg',
  children,
}: ProfileCardProps) => {
  const accent = blockAccent(block)

  return (
    <CardSurface
      tone={block.tone ?? 'card'}
      movement={movement}
      radius="large"
      bordered
      padding={padding}
      weight="steady"
      asset={block.asset}
    >
      <CardBody $width={bodyWidth}>
        <Stack gap={3}>
          <Typography as="p" variant="caption" gutter={false} accent={accent}>
            {block.label}
          </Typography>

          {block.title ? (
            <Typography
              as="h3"
              variant={headingVariant}
              gutter={false}
              color="primary"
            >
              {block.title}
            </Typography>
          ) : null}

          <Typography
            as="p"
            variant="body"
            gutter={false}
            tone="soft"
            cadence="open"
          >
            {block.children}
          </Typography>

          {children}
        </Stack>
      </CardBody>
    </CardSurface>
  )
}

const LeadCard = ({
  path,
  presence,
  movement,
  padding = 'lg',
}: {
  path: ProfileBlock
  presence: ProfileBlock
  movement: MovementKey
  padding?: 'md' | 'lg'
}) => {
  const pathAccent = blockAccent(path)
  const presenceAccent = blockAccent(presence)

  return (
    <LeadSurface
      tone={path.tone ?? 'threshold'}
      movement={movement}
      radius="large"
      bordered
      padding={padding}
      weight="steady"
      asset={path.asset}
    >
      <Stack gap={4}>
        <CardBody $width="body">
          <Stack gap={3}>
            <Typography
              as="p"
              variant="caption"
              gutter={false}
              accent={pathAccent}
            >
              {path.label}
            </Typography>

            {path.title ? (
              <Typography as="h3" variant="h3" gutter={false} color="primary">
                {path.title}
              </Typography>
            ) : null}

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
        </CardBody>

        <PresenceNote>
          <Stack gap={2}>
            <Typography
              as="p"
              variant="caption"
              gutter={false}
              accent={presenceAccent}
            >
              {presence.label}
            </Typography>

            {presence.title ? (
              <Typography
                as="h3"
                variant="subtitle"
                gutter={false}
                color="primary"
              >
                {presence.title}
              </Typography>
            ) : null}

            <Typography
              as="p"
              variant="body"
              gutter={false}
              tone="soft"
              cadence="open"
            >
              {presence.children}
            </Typography>
          </Stack>
        </PresenceNote>
      </Stack>
    </LeadSurface>
  )
}

const CredentialTimeline = ({
  items,
  accent,
}: {
  items: readonly Credential[]
  accent: AxisKey
}) => (
  <CredentialList>
    {items.map((item, index) => (
      <CredentialItem key={index}>
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

        <CredentialMeta>
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
        </CredentialMeta>
      </CredentialItem>
    ))}
  </CredentialList>
)

const CredentialCard = ({
  block,
  movement,
  padding = 'lg',
}: {
  block: CredentialBlock
  movement: MovementKey
  padding?: 'md' | 'lg'
}) => {
  const accent = block.accent ?? 'axisDensity'

  return (
    <CredentialsSurface
      tone={block.tone ?? 'field'}
      movement={movement}
      radius="large"
      bordered
      padding={padding}
      weight="steady"
    >
      <Stack gap={3}>
        <Typography as="p" variant="caption" gutter={false} accent={accent}>
          {block.label}
        </Typography>

        {block.title ? (
          <Typography as="h3" variant="h3" gutter={false} color="primary">
            {block.title}
          </Typography>
        ) : null}

        <CredentialTimeline items={block.items} accent={accent} />
      </Stack>
    </CredentialsSurface>
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
            <ProfileCard block={item} movement={movement} padding="lg" />
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
        <LeadCard path={path} presence={presence} movement={movement} />
        <CredentialCard block={credentials} movement={movement} />
      </DesktopLead>

      <EvidenceRow>
        <ProfileCard block={teaching} movement={movement} bodyWidth="wide" />

        <SideEvidence>
          <ProfileCard
            block={style}
            movement={movement}
            headingVariant="subtitle"
            bodyWidth="full"
          />
          <ProfileCard
            block={scope}
            movement={movement}
            headingVariant="subtitle"
            bodyWidth="full"
          />
        </SideEvidence>
      </EvidenceRow>
    </DesktopShell>

    <MobileShell>
      <LeadCard
        path={path}
        presence={presence}
        movement={movement}
        padding="md"
      />

      <CredentialCard block={credentials} movement={movement} padding="md" />

      <MobileEvidenceDeck
        movement={movement}
        items={[teaching, style, scope]}
      />
    </MobileShell>
  </>
)

export default RecognitionProfile
