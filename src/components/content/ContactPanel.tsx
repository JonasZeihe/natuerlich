// src/components/content/ContactPanel.tsx
'use client'

import { useMemo, useState, type ReactNode } from 'react'
import styled from 'styled-components'
import Button from '@/components/actions/Button'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import type { AxisKey, MovementKey } from '@/design/theme'
import Typography from '@/design/typography'

type MailParts = {
  local: string
  domain: string
}

type ContactPrompt = {
  label: ReactNode
  title: ReactNode
  children: ReactNode
}

type Props = {
  movement: MovementKey
  mail: MailParts
  subject: string
  primaryLabel: ReactNode
  copyLabel: ReactNode
  copiedLabel: ReactNode
  prompt: ContactPrompt
  processLabel?: ReactNode
  process?: ReactNode
  accent?: AxisKey
}

const Shell = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.5)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: ${({ theme }) => theme.spacing(2)};
    gap: ${({ theme }) => theme.spacing(1.25)};
  }
`

const Gateway = styled(Surface)`
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
`

const GatewayGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.62fr);
  gap: ${({ theme }) => theme.spacing(2)};
  align-items: end;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing(1.5)};
  }
`

const TextColumn = styled.div`
  max-width: 50rem;
`

const ActionColumn = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.75)};
`

const Hint = styled.div`
  max-width: 26rem;
`

const SecondaryAction = styled.button`
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.getAxisRole('axisDensity').text};
  padding: ${({ theme }) => theme.spacingHalf(1)};
  font: inherit;
  text-align: center;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 0.16em;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.roles.focus.ring};
    outline-offset: 3px;
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }
`

const Process = styled(Surface)`
  max-width: 58rem;
`

const buildMail = ({ local, domain }: MailParts) => `${local}@${domain}`

const ContactPanel = ({
  movement,
  mail,
  subject,
  primaryLabel,
  copyLabel,
  copiedLabel,
  prompt,
  processLabel,
  process,
  accent = 'axisDensity',
}: Props) => {
  const [copied, setCopied] = useState(false)
  const address = useMemo(() => buildMail(mail), [mail])
  const mailto = useMemo(
    () => `mailto:${address}?subject=${encodeURIComponent(subject)}`,
    [address, subject]
  )

  const openMail = () => {
    window.location.href = mailto
  }

  const copyMail = async () => {
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = mailto
    }
  }

  return (
    <Shell>
      <Gateway
        tone="card"
        movement={movement}
        radius="large"
        bordered
        padding="lg"
        weight="steady"
      >
        <GatewayGrid>
          <TextColumn>
            <Stack gap={4}>
              <Typography
                as="p"
                variant="caption"
                gutter={false}
                accent={accent}
              >
                {prompt.label}
              </Typography>

              <Typography as="h3" variant="h3" gutter={false} color="primary">
                {prompt.title}
              </Typography>

              <Typography
                as="p"
                variant="body"
                gutter={false}
                tone="soft"
                cadence="open"
              >
                {prompt.children}
              </Typography>
            </Stack>
          </TextColumn>

          <ActionColumn>
            <Button variant="primary" fullWidth onClick={openMail}>
              {primaryLabel}
            </Button>

            <SecondaryAction type="button" onClick={copyMail}>
              <Typography as="span" variant="caption" gutter={false}>
                {copied ? copiedLabel : copyLabel}
              </Typography>
            </SecondaryAction>
          </ActionColumn>
        </GatewayGrid>
      </Gateway>

      {process ? (
        <Process
          tone="field"
          movement={movement}
          radius="large"
          bordered
          padding="md"
          weight="steady"
        >
          <Stack gap={3}>
            {processLabel ? (
              <Typography
                as="p"
                variant="caption"
                gutter={false}
                accent={accent}
              >
                {processLabel}
              </Typography>
            ) : null}

            <Typography
              as="p"
              variant="body"
              gutter={false}
              tone="soft"
              cadence="open"
              measure="prose"
            >
              {process}
            </Typography>
          </Stack>
        </Process>
      ) : null}
    </Shell>
  )
}

export default ContactPanel
