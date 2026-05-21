// src/components/content/RecognitionProfile.tsx
'use client'

import { type ReactNode } from 'react'
import styled from 'styled-components'
import ContentRail, { ContentRailItem } from '@/components/content/ContentRail'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import Typography from '@/design/typography'

type ProfileBlock = {
  title?: ReactNode
  children: ReactNode
}

type Credential = {
  title: ReactNode
  source: ReactNode
  period: ReactNode
  hours: ReactNode
}

type CredentialBlock = {
  title?: ReactNode
  items: readonly Credential[]
}

type Props = {
  path: ProfileBlock
  teaching: ProfileBlock
  style: ProfileBlock
  credentials: CredentialBlock
  scope: ProfileBlock
}

const RecognitionProfile = ({
  path,
  teaching,
  style,
  credentials,
  scope,
}: Props) => (
  <Shell>
    <Lead>
      <BlockText block={path} heading="h2" />
    </Lead>

    <ContentRail columns={3} min="17rem" gap={1.25} max="68rem" align="start">
      {[teaching, style].map((block, index) => (
        <ContentRailItem key={index} mode="card" stretch={false}>
          <BlockText block={block} heading="subtitle" />
        </ContentRailItem>
      ))}

      <ContentRailItem mode="card" stretch={false}>
        <Portrait
          src="/jonas_zeihe.webp"
          alt="Jonas"
          loading="lazy"
          decoding="async"
        />
      </ContentRailItem>
    </ContentRail>

    <Evidence>
      <Stack gap={2}>
        {credentials.title ? (
          <Typography as="h2" variant="h2" color="primary" cadence="dense">
            {credentials.title}
          </Typography>
        ) : null}

        <CredentialList>
          {credentials.items.map((item, index) => (
            <CredentialItem key={index}>
              <CredentialCard
                tone="quiet"
                movement="recognition"
                radius="large"
                padding="md"
                bordered
              >
                <Stack gap={0.65}>
                  <Typography as="h3" variant="subtitle" color="primary">
                    {item.title}
                  </Typography>

                  <Typography as="p" variant="body">
                    {item.source}
                  </Typography>

                  <CredentialMeta>
                    <Typography as="span" variant="caption">
                      {item.period}
                    </Typography>

                    <MetaDivider aria-hidden="true">·</MetaDivider>

                    <Typography as="span" variant="caption">
                      {item.hours}
                    </Typography>
                  </CredentialMeta>
                </Stack>
              </CredentialCard>
            </CredentialItem>
          ))}
        </CredentialList>

        <Scope>
          {scope.title ? (
            <Typography as="p" variant="subtitle" color="primary">
              {scope.title}
            </Typography>
          ) : null}

          <Typography as="p" variant="body" cadence="open" measure="wide">
            {scope.children}
          </Typography>
        </Scope>
      </Stack>
    </Evidence>
  </Shell>
)

const BlockText = ({
  block,
  heading = 'h3',
}: {
  block: ProfileBlock
  heading?: 'h2' | 'h3' | 'subtitle'
}) => {
  const as = heading === 'subtitle' ? 'h3' : heading

  return (
    <Stack gap={0.85}>
      {block.title ? (
        <Typography as={as} variant={heading} color="primary" cadence="dense">
          {block.title}
        </Typography>
      ) : null}

      <Typography as="p" variant="body" cadence="open" measure="wide">
        {block.children}
      </Typography>
    </Stack>
  )
}

const Shell = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(2.25)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing(3.25)};
  }
`

const Lead = styled.div`
  width: min(100%, 68rem);
  margin-inline: auto;
`

const Portrait = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  object-fit: cover;
  object-position: center;
`

const Evidence = styled.div`
  width: min(100%, 68rem);
  margin-inline: auto;
`

const CredentialList = styled.ol`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing(1)};
  margin: 0;
  padding: 0;
  list-style: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: ${({ theme }) => theme.spacing(1.25)};
  }
`

const CredentialItem = styled.li`
  min-width: 0;
`

const CredentialCard = styled(Surface)`
  height: 100%;
`

const CredentialMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacingHalf(1)}
    ${({ theme }) => theme.spacing(0.65)};
  color: ${({ theme }) => theme.roles.text.secondary};
`

const MetaDivider = styled.span`
  color: ${({ theme }) => theme.roles.text.subtle};
`

const Scope = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.85)};
  max-width: 58rem;
  padding-top: ${({ theme }) => theme.spacing(1.25)};
  border-top: 1px solid ${({ theme }) => theme.roles.border.subtle};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-top: ${({ theme }) => theme.spacing(1.75)};
  }
`

export default RecognitionProfile
