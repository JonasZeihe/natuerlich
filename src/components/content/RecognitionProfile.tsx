// src/components/content/RecognitionProfile.tsx
'use client'

import { type ReactNode } from 'react'
import styled from 'styled-components'
import ContentRail, { ContentRailItem } from '@/components/content/ContentRail'
import Stack from '@/components/primitives/Stack'
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
  presence: ProfileBlock
  credentials: CredentialBlock
  scope: ProfileBlock
}

const Shell = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
`

const Lead = styled.div`
  width: min(100%, 64rem);
  margin-inline: auto;
`

const Evidence = styled.div`
  width: min(100%, 64rem);
  margin-inline: auto;
`

const CredentialList = styled.ol`
  display: grid;
  grid-template-columns: 1fr;
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
    <Stack gap={0.85}>
      {block.title ? (
        <Typography as={as} variant={heading} color="primary">
          {block.title}
        </Typography>
      ) : null}

      <Typography as="p" variant="body" tone="soft" cadence="open">
        {block.children}
      </Typography>
    </Stack>
  )
}

const RecognitionProfile = ({
  path,
  teaching,
  style,
  presence,
  credentials,
  scope,
}: Props) => (
  <Shell>
    <Lead>
      <BlockText block={path} heading="h2" />
    </Lead>

    <ContentRail columns={3} min="16rem" gap={1.5} max="64rem">
      {[teaching, style, presence].map((block, index) => (
        <ContentRailItem key={index}>
          <BlockText block={block} heading="subtitle" />
        </ContentRailItem>
      ))}
    </ContentRail>

    <Evidence>
      <Stack gap={1.5}>
        {credentials.title ? (
          <Typography as="h2" variant="h2" color="primary">
            {credentials.title}
          </Typography>
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
          {scope.title ? (
            <Typography as="p" variant="subtitle" color="primary">
              {scope.title}
            </Typography>
          ) : null}

          <Typography as="p" variant="body" tone="soft" cadence="open">
            {scope.children}
          </Typography>
        </Scope>
      </Stack>
    </Evidence>
  </Shell>
)

export default RecognitionProfile
