// src/components/content/ContactPanel.tsx
'use client'

import { useMemo, useState, type ReactNode } from 'react'
import styled from 'styled-components'
import Button from '@/components/actions/Button'
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
    <Panel tone="card" radius="lg" padding="lg" bordered>
      <Copy>
        <Typography as="h2" variant="h3" tone="strong">
          {title}
        </Typography>

        <Typography as="p" variant="body" tone="soft" measure="text">
          {text}
        </Typography>
      </Copy>

      <Actions>
        <PrimaryLink href={href}>{primaryLabel}</PrimaryLink>

        <CopyButton type="button" variant="link" onClick={copyAddress}>
          {copied ? copiedLabel : copyLabel}
        </CopyButton>
      </Actions>
    </Panel>
  )
}

const Panel = styled(Surface)`
  display: grid;
  gap: ${({ theme }) => theme.layout.gap.cluster};

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
  }
`

const Copy = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.gap.text};
  max-width: ${({ theme }) => theme.font.measure.text};
  min-width: 0;
`

const Actions = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space(0.65)};
  justify-items: start;

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    justify-items: stretch;
    min-width: 14rem;
  }
`

const PrimaryLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.75rem;
  min-width: 3.75rem;
  max-width: 100%;
  padding: ${({ theme }) => `${theme.space(3)} ${theme.space(5)}`};
  border: 1px solid
    ${({ theme }) => theme.component.button.primary.default.border};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) =>
    theme.component.button.primary.default.background};
  color: ${({ theme }) => theme.component.button.primary.default.text};
  font-family: ${({ theme }) => theme.font.family.main};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  line-height: 1.12;
  letter-spacing: ${({ theme }) => theme.font.letterSpacing.normal};
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.css.interactive.control};

  &:hover {
    background: ${({ theme }) =>
      theme.component.button.primary.hover.background};
    border-color: ${({ theme }) => theme.component.button.primary.hover.border};
    color: ${({ theme }) => theme.component.button.primary.hover.text};
    text-decoration: none;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid transparent;
    box-shadow: ${({ theme }) => theme.color.focus.shadow};
  }

  @media ${({ theme }) => theme.motion.reduced.media} {
    transition: none;
  }
`

const CopyButton = styled(Button)`
  justify-self: start;

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    justify-self: center;
  }
`

export default ContactPanel
