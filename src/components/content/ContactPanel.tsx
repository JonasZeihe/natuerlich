// src/components/content/ContactPanel.tsx
'use client'

import { useMemo, useState, type ReactNode } from 'react'
import styled from 'styled-components'
import Button from '@/components/actions/Button'
import Surface from '@/components/primitives/Surface'
import Typography from '@/design/typography'

type MailParts = {
  local: string
  domain: string
}

type Props = {
  mail: MailParts
  subject: string
  title: ReactNode
  text: ReactNode
  hint?: ReactNode
  primaryLabel: ReactNode
  copyLabel: ReactNode
  copiedLabel: ReactNode
}

const buildMail = ({ local, domain }: MailParts) => `${local}@${domain}`

const ContactPanel = ({
  mail,
  subject,
  title,
  text,
  hint,
  primaryLabel,
  copyLabel,
  copiedLabel,
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
    <Shell tone="quiet" movement="nextStep" radius="large" padding="lg">
      <Layout>
        <Text>
          <Typography as="h3" variant="h2" color="primary" cadence="dense">
            {title}
          </Typography>

          <Typography as="p" variant="body" tone="soft" cadence="open">
            {text}
          </Typography>

          {hint ? (
            <Hint>
              <Typography as="p" variant="body" tone="soft" cadence="open">
                {hint}
              </Typography>
            </Hint>
          ) : null}
        </Text>

        <Actions>
          <Button variant="primary" fullWidth onClick={openMail}>
            {primaryLabel}
          </Button>

          <CopyButton type="button" onClick={copyMail}>
            {copied ? copiedLabel : copyLabel}
          </CopyButton>
        </Actions>
      </Layout>
    </Shell>
  )
}

const Shell = styled(Surface)`
  width: min(100%, 72rem);
  margin-inline: auto;
`

const Layout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.cluster};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: minmax(0, 1fr) minmax(17rem, 0.42fr);
    align-items: center;
    gap: ${({ theme }) => theme.layout.flow.region};
  }
`

const Text = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.block};
  max-width: 52rem;
`

const Hint = styled.div`
  max-width: 42rem;
  padding-top: ${({ theme }) => theme.layout.flow.block};
  border-top: 1px solid ${({ theme }) => theme.roles.border.subtle};
`

const Actions = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.text};
`

const CopyButton = styled.button`
  appearance: none;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.roles.text.subtle};
  padding: ${({ theme }) => theme.spacingHalf(1)};
  font: inherit;
  cursor: pointer;
  text-align: center;

  &:hover {
    color: ${({ theme }) => theme.roles.text.primary};
    text-decoration: underline;
    text-underline-offset: 0.16em;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.roles.focus.ring};
    outline-offset: 3px;
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }
`

export default ContactPanel
