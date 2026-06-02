// src/components/content/RecognitionProfile.tsx
'use client'

import { useState, type ReactNode } from 'react'
import styled from 'styled-components'
import Button from '@/components/actions/Button'
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

const credentialsPanelId = 'recognition-credentials-panel'

const RecognitionProfile = ({
  path,
  teaching,
  style,
  credentials,
  scope,
}: Props) => {
  const [isCredentialsOpen, setIsCredentialsOpen] = useState(false)

  return (
    <Shell>
      <Lead>
        <BlockText block={path} heading="h2" />
      </Lead>

      <ProfileGrid>
        <ProfileCard
          tone="card"
          movement="recognition"
          radius="large"
          padding="lg"
        >
          <BlockText block={teaching} heading="h3" />
        </ProfileCard>

        <ProfileCard
          tone="card"
          movement="recognition"
          radius="large"
          padding="lg"
        >
          <BlockText block={style} heading="h2" />
        </ProfileCard>

        <PortraitFrame>
          <Portrait
            src="/jonas_zeihe.webp"
            alt="Jonas"
            loading="lazy"
            decoding="async"
          />
        </PortraitFrame>
      </ProfileGrid>

      <ProofPanel
        tone="quiet"
        movement="recognition"
        radius="large"
        padding="lg"
      >
        <ProofHeader>
          <SummaryText>
            {credentials.title ? (
              <Typography as="h2" variant="h3" color="primary" cadence="dense">
                {credentials.title}
              </Typography>
            ) : null}

            {scope.title ? (
              <Typography as="p" variant="subtitle" color="primary">
                {scope.title}
              </Typography>
            ) : null}

            <Typography as="p" variant="body" tone="soft" cadence="open">
              {scope.children}
            </Typography>
          </SummaryText>

          <ActionSlot>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              aria-expanded={isCredentialsOpen}
              aria-controls={credentialsPanelId}
              onClick={() => setIsCredentialsOpen((current) => !current)}
            >
              {isCredentialsOpen ? 'Nachweise ausblenden' : 'Nachweise ansehen'}
            </Button>
          </ActionSlot>
        </ProofHeader>

        {isCredentialsOpen ? (
          <CredentialList id={credentialsPanelId}>
            {credentials.items.map((item, index) => (
              <CredentialItem key={index}>
                <CredentialCard
                  tone="card"
                  movement="recognition"
                  radius="large"
                  padding="md"
                >
                  <Stack gap={undefined}>
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
        ) : null}
      </ProofPanel>
    </Shell>
  )
}

const BlockText = ({
  block,
  heading = 'h3',
}: {
  block: ProfileBlock
  heading?: 'h2' | 'h3' | 'subtitle'
}) => {
  const as = heading === 'subtitle' ? 'h3' : heading

  return (
    <BlockStack>
      {block.title ? (
        <Typography as={as} variant={heading} color="primary" cadence="dense">
          {block.title}
        </Typography>
      ) : null}

      <Typography as="p" variant="body" cadence="open" measure="wide">
        {block.children}
      </Typography>
    </BlockStack>
  )
}

const Shell = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.region};
  width: 100%;
  min-width: 0;
`

const Lead = styled.div`
  max-width: 64ch;
  min-width: 0;
`

const BlockStack = styled(Stack)`
  gap: ${({ theme }) => theme.layout.flow.block};
`

const ProfileGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.grid.gap};
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(18rem, 0.8fr);
  }
`

const ProfileCard = styled(Surface)`
  display: flex;
  height: 100%;
`

const PortraitFrame = styled.figure`
  display: grid;
  min-width: 0;
  min-height: 18rem;
  margin: 0;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  overflow: clip;
`

const Portrait = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  min-height: 18rem;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: center 35%;
`

const ProofPanel = styled(Surface)`
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.roles.movement.recognition.quiet} 78%,
    ${({ theme }) => theme.roles.movement.recognition.card}
  );
`

const ProofHeader = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.block};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
  }
`

const SummaryText = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.text};
  max-width: 64ch;
`

const ActionSlot = styled.div`
  display: flex;
  justify-content: flex-start;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: flex-end;
  }
`

const CredentialList = styled.ol`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.layout.grid.gap};
  margin: ${({ theme }) => `${theme.layout.flow.cluster} 0 0`};
  padding: 0;
  list-style: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
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
  gap: ${({ theme }) => theme.layout.flow.text};
  color: ${({ theme }) => theme.color.text.soft};
`

const MetaDivider = styled.span`
  color: ${({ theme }) => theme.roles.text.subtle};
`

export default RecognitionProfile
