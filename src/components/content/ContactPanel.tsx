// src/components/content/ContactPanel.tsx
'use client'

import { useMemo, useState, type ReactNode } from 'react'
import styled from 'styled-components'
import Surface from '@/components/primitives/Surface'
import Typography from '@/design/typography'

type Mail = {
  local: string
  domain: string
}

type Props = {
  mail: Mail
  subject: string
  title: ReactNode
  text: ReactNode
  primaryLabel: string
  copyLabel: string
  copiedLabel: string
}

const ContactPanel = ({
  mail,
  subject,
  title,
  text,
  primaryLabel,
  copyLabel,
  copiedLabel,
}: Props) => {
  const [copied, setCopied] = useState(false)
  const address = `${mail.local}@${mail.domain}`
  const href = useMemo(
    () => `mailto:${address}?subject=${encodeURIComponent(subject)}`,
    [address, subject]
  )

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Panel tone="card" movement="nextStep" radius="large" padding="lg">
      <Copy>
        <Typography as="h2" variant="h3" color="primary" cadence="dense">
          {title}
        </Typography>

        <Typography as="p" variant="body" tone="soft" cadence="open">
          {text}
        </Typography>
      </Copy>

      <Actions>
        <PrimaryLink href={href}>{primaryLabel}</PrimaryLink>

        <CopyButton type="button" onClick={copyAddress}>
          {copied ? copiedLabel : copyLabel}
        </CopyButton>
      </Actions>
    </Panel>
  )
}

const Panel = styled(Surface)`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.cluster};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
  }
`

const Copy = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.text};
  max-width: 64ch;
  min-width: 0;
`

const Actions = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.65)};
  justify-items: start;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-items: stretch;
    min-width: 14rem;
  }
`

const PrimaryLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: ${({ theme }) => theme.spacing(4.6)};
  min-width: ${({ theme }) => theme.spacing(7.2)};
  padding: ${({ theme }) => `${theme.spacingHalf(1.45)} ${theme.spacing(1.6)}`};
  border: 0;
  border-radius: 0.78rem;
  background: ${({ theme }) => theme.roles.interactive.button.primary.bg};
  color: ${({ theme }) => theme.roles.interactive.button.primary.fg};
  font-family: ${({ theme }) => theme.typography.fontFamily.button};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1.12;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.normal};
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.css.interactive.control};

  &:hover {
    background: ${({ theme }) =>
      theme.roles.interactive.button.primary.hoverBg};
    color: ${({ theme }) => theme.roles.interactive.button.primary.hoverFg};
    text-decoration: none;
    transform: translateY(
      calc(${({ theme }) => theme.motion.foundations.distances.nudge} * -1)
    );
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid transparent;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.color.border.focus};
  }

  @media ${({ theme }) => theme.motion.reduced.media} {
    transition: none;
  }
`

const CopyButton = styled.button`
  appearance: none;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.roles.movement.nextStep.deep};
  padding: ${({ theme }) => theme.spacing(0.25)} 0;
  font: inherit;
  cursor: pointer;
  text-align: left;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.border.focus};
    outline-offset: 3px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    text-align: center;
  }
`

export default ContactPanel
