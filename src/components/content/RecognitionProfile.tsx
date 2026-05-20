// src/components/content/RecognitionProfile.tsx
'use client'

import { type ReactNode } from 'react'
import styled from 'styled-components'
import type { AssetConsumerSpec } from '@/components/assets/registry'
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
  teaching: ProfileBlock
  style: ProfileBlock
  presence: ProfileBlock
  credentials: CredentialBlock
  scope: ProfileBlock
}

const Shell = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.25)};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    gap: ${({ theme }) => theme.spacing(1.5)};
  }
`

const Lead = styled(Surface)`
  width: min(100%, 64rem);
  margin-inline: auto;
`

const Track = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: min(82vw, 23rem);
  gap: ${({ theme }) => theme.spacing(1)};
  margin-inline: ${({ theme }) => `-${theme.spacing(1)}`};
  padding-inline: ${({ theme }) => theme.spacing(1)};
  padding-bottom: ${({ theme }) => theme.spacing(0.25)};
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: min(100%, 64rem);
    margin-inline: auto;
    padding-inline: 0;
    grid-auto-flow: initial;
    grid-auto-columns: initial;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    overflow: visible;
  }
`

const TrackItem = styled.div`
  scroll-snap-align: start;
`

const ProfileBody = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.85)};
  height: 100%;
  align-content: start;
`

const Evidence = styled(Surface)`
  width: min(100%, 64rem);
  margin-inline: auto;
`

const EvidenceBody = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.25)};
`

const EvidenceHead = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.7)};
  max-width: 48rem;
`

const CredentialList = styled.ol`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.75)};
  margin: 0;
  padding: 0;
  list-style: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const CredentialItem = styled.li`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.25)};
  padding-top: ${({ theme }) => theme.spacing(0.75)};
  border-top: 1px solid ${({ theme }) => theme.roles.border.subtle};
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

const Scope = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.65)};
  max-width: 50rem;
  padding-top: ${({ theme }) => theme.spacing(1)};
  border-top: 1px solid ${({ theme }) => theme.roles.border.subtle};
`

const BlockText = ({
  block,
  heading = 'h3',
}: {
  block: ProfileBlock
  heading?: 'h2' | 'h3' | 'subtitle'
}) => {
  const as = heading === 'subtitle' ? 'h3' : heading

  return (
    <ProfileBody>
      {block.title ? (
        <Typography as={as} variant={heading} color="primary">
          {block.title}
        </Typography>
      ) : null}

      <Typography as="p" variant="body" tone="soft" cadence="open">
        {block.children}
      </Typography>
    </ProfileBody>
  )
}

const ProfileCard = ({
  block,
  movement,
}: {
  block: ProfileBlock
  movement: MovementKey
}) => (
  <Surface
    tone={block.tone ?? 'card'}
    movement={movement}
    radius="large"
    padding="lg"
  >
    <BlockText block={block} heading="subtitle" />
  </Surface>
)

const RecognitionProfile = ({
  movement,
  path,
  teaching,
  style,
  presence,
  credentials,
  scope,
}: Props) => (
  <Shell>
    <Lead
      tone={path.tone ?? 'threshold'}
      movement={movement}
      radius="large"
      padding="lg"
    >
      <BlockText block={path} heading="h2" />
    </Lead>

    <Track>
      {[teaching, style, presence].map((block, index) => (
        <TrackItem key={index}>
          <ProfileCard block={block} movement={movement} />
        </TrackItem>
      ))}
    </Track>

    <Evidence
      tone={credentials.tone ?? 'field'}
      movement={movement}
      radius="large"
      padding="lg"
    >
      <EvidenceBody>
        {credentials.title ? (
          <EvidenceHead>
            <Typography as="h2" variant="h2" color="primary">
              {credentials.title}
            </Typography>
          </EvidenceHead>
        ) : null}

        <CredentialList>
          {credentials.items.map((item, index) => (
            <CredentialItem key={index}>
              <Typography as="h3" variant="subtitle" color="primary">
                {item.title}
              </Typography>

              <Typography as="p" variant="body" tone="soft">
                {item.source}
              </Typography>

              <CredentialMeta>
                <Typography as="span" variant="body" tone="soft">
                  {item.period}
                </Typography>

                <MetaDivider aria-hidden="true">·</MetaDivider>

                <Typography as="span" variant="body" tone="soft">
                  {item.hours}
                </Typography>
              </CredentialMeta>
            </CredentialItem>
          ))}
        </CredentialList>

        <Scope>
          <Typography as="p" variant="subtitle" color="primary">
            {scope.title}
          </Typography>

          <Typography as="p" variant="body" tone="soft" cadence="open">
            {scope.children}
          </Typography>
        </Scope>
      </EvidenceBody>
    </Evidence>
  </Shell>
)

export default RecognitionProfile
