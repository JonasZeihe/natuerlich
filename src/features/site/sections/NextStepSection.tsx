// src/features/site/sections/NextStepSection.tsx
'use client'

import { useMemo, useState } from 'react'
import styled from 'styled-components'
import Button from '@/components/actions/Button'
import Headline from '@/components/content/Headline'
import Section from '@/components/primitives/Section'
import Typography from '@/design/typography'

const mail = {
  local: 'jonaszeihe',
  domain: 'gmail.com',
}

const subject = 'Anfrage zur Praxis'

const NextStepSection = () => {
  const [copied, setCopied] = useState(false)
  const address = `${mail.local}@${mail.domain}`
  const href = useMemo(
    () => `mailto:${address}?subject=${encodeURIComponent(subject)}`,
    [address]
  )

  const openMail = () => {
    window.location.href = href
  }

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
    <ContactSection
      id="anschluss"
      titleId="anschluss-title"
      ariaLabel="Kontakt"
      container="wide"
      content="default"
      variant="outro"
      rhythm="spacious"
      tone="quiet"
      header={
        <HeaderBlock>
          <Headline
            titleId="anschluss-title"
            title="Schreib mir, wenn du wissen möchtest, ob das passt."
            accent="daoyin"
            weight="poster"
          >
            Ein paar Sätze reichen. Wer du bist, was dich hierher geführt hat
            und ob du eher an Kurs, Einzelunterricht, einer Gruppe, einem
            Firmenformat oder erst einmal Orientierung interessiert bist.
          </Headline>
        </HeaderBlock>
      }
    >
      <ArrivalField>
        <ArrivalCircle aria-hidden="true" />

        <ContactBody>
          <ContactCopy>
            <Typography as="h2" variant="h3">
              Du musst es noch nicht richtig benennen.
            </Typography>

            <Typography as="p" variant="body" measure="text">
              Wenn du nicht sicher bist, welches Format passt, ist das kein
              Problem. Beschreib einfach kurz, wo du stehst. Dann schauen wir,
              ob und wie ein <Strong>sinnvoller Rahmen</Strong> entstehen kann.
            </Typography>
          </ContactCopy>

          <Actions>
            <Button type="button" variant="primary" onClick={openMail}>
              E-Mail schreiben
            </Button>

            <Button type="button" variant="ghost" onClick={copyAddress}>
              {copied ? 'Adresse kopiert' : 'Mailadresse kopieren'}
            </Button>
          </Actions>
        </ContactBody>
      </ArrivalField>
    </ContactSection>
  )
}

const ContactSection = styled(Section)`
  position: relative;
  overflow: hidden;
  color: ${({ theme }) => theme.palette.ivory};
  background: ${({ theme }) => theme.palette.blueDeep};
`

const HeaderBlock = styled.div`
  max-width: 66rem;
  min-width: 0;

  h1,
  h2,
  p {
    color: ${({ theme }) => theme.palette.ivory};
  }
`

const ArrivalField = styled.div`
  position: relative;
  display: grid;
  justify-items: center;
  min-width: 0;
  padding-top: clamp(2.6rem, 8vw, 5.2rem);
  isolation: isolate;
`

const ArrivalCircle = styled.div`
  position: absolute;
  z-index: 0;
  top: clamp(0.2rem, 1.5vw, 1rem);
  left: 50%;
  width: min(42rem, calc(100vw - 3rem));
  aspect-ratio: 1;
  border-radius: 50%;
  background: ${({ theme }) => theme.palette.ivory};
  transform: translateX(-50%);
  box-shadow: 0 1.5rem 4rem
    color-mix(
      in srgb,
      ${({ theme }) => theme.palette.backdrop} 26%,
      transparent
    );

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    width: min(50rem, 56vw);
  }
`

const ContactBody = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  gap: clamp(1.8rem, 4vw, 2.8rem);
  width: min(100%, 48rem);
  min-width: 0;
  padding: clamp(2.2rem, 6vw, 4.6rem) clamp(1.4rem, 5vw, 3.8rem);
  color: ${({ theme }) => theme.palette.ink};
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    padding-block: clamp(3.2rem, 6vw, 5.2rem);
  }
`

const ContactCopy = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.gap.block};
  max-width: 39rem;
  margin-inline: auto;
  min-width: 0;

  h2 {
    color: ${({ theme }) => theme.palette.ink};
  }

  p {
    color: ${({ theme }) => theme.palette.inkSoft};
  }
`

const Strong = styled.strong`
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.palette.mossDeep};
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: clamp(0.9rem, 2.2vw, 1.25rem);
  min-width: 0;

  @media (max-width: ${({ theme }) => theme.breakpoint.sm}) {
    display: grid;
    justify-items: stretch;
  }
`

export default NextStepSection
