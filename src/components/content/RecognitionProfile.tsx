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
  display: grid;
  gap: ${({ theme }) => theme.spacing(1)};
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

const Card = styled(Surface)`
  height: 100%;
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.85)};
  align-content: start;
`

const Evidence = styled(Surface)`
  width: min(100%, 64rem);
  margin-inline: auto;
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
  padding-top: ${({ theme }) => theme.spacing(1)};
  border-top: 1px solid ${({ theme }) => theme.roles.border.subtle};
  max-width: 50rem;
`

const accentOf = (block: { accent?: AxisKey }) => block.accent ?? 'axisDensity'

const BlockText = ({
  block,
  heading = 'h3',
}: {
  block: ProfileBlock
  heading?: 'h2' | 'h3' | 'subtitle'
}) => {
  const accent = accentOf(block)
  const as = heading === 'subtitle' ? 'h3' : heading

  return (
    <>
      <Typography as="p" variant="caption" gutter={false} accent={accent}>
        {block.label}
      </Typography>

      {block.title ? (
        <Typography as={as} variant={heading} gutter={false} color="primary">
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
    </>
  )
}

const ProfileCard = ({
  block,
  movement,
}: {
  block: ProfileBlock
  movement: MovementKey
}) => (
  <Card
    tone={block.tone ?? 'card'}
    movement={movement}
    radius="large"
    bordered
    padding="lg"
    weight="steady"
    asset={block.asset}
  >
    <BlockText block={block} heading="subtitle" />
  </Card>
)

const RecognitionProfile = ({
  movement,
  path,
  teaching,
  style,
  presence,
  credentials,
  scope,
}: Props) => {
  const credentialAccent = credentials.accent ?? 'axisDensity'

  return (
    <Shell>
      <Lead
        tone={path.tone ?? 'threshold'}
        movement={movement}
        radius="large"
        bordered
        padding="lg"
        weight="steady"
        asset={path.asset}
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
        bordered
        padding="lg"
        weight="steady"
      >
        <EvidenceHead>
          <Typography
            as="p"
            variant="caption"
            gutter={false}
            accent={credentialAccent}
          >
            {credentials.label}
          </Typography>

          {credentials.title ? (
            <Typography as="h2" variant="h2" gutter={false} color="primary">
              {credentials.title}
            </Typography>
          ) : null}
        </EvidenceHead>

        <CredentialList>
          {credentials.items.map((item, index) => (
            <CredentialItem key={index}>
              <Typography
                as="h3"
                variant="subtitle"
                gutter={false}
                color="primary"
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
                  accent={credentialAccent}
                >
                  {item.hours}
                </Typography>
              </CredentialMeta>
            </CredentialItem>
          ))}
        </CredentialList>

        <Scope>
          <Typography as="p" variant="subtitle" gutter={false} color="primary">
            {scope.title}
          </Typography>

          <Typography
            as="p"
            variant="body"
            gutter={false}
            tone="soft"
            cadence="open"
          >
            {scope.children}
          </Typography>
        </Scope>
      </Evidence>
    </Shell>
  )
}

export default RecognitionProfile
