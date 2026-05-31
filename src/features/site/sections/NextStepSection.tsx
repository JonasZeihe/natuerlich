// src/features/site/sections/NextStepSection.tsx
'use client'

import styled from 'styled-components'
import ContactPanel from '@/components/content/ContactPanel'
import Headline from '@/components/content/Headline'
import Section from '@/components/primitives/Section'
import Surface from '@/components/primitives/Surface'

const NextStepSection = () => (
  <Section
    id="anschluss"
    titleId="anschluss-title"
    ariaLabel="Kontakt"
    container="wide"
    content="default"
    variant="outro"
    rhythm="spacious"
    tone="arrival"
    movement="nextStep"
    energy="flow"
  >
    <Surface tone="bare" movement="nextStep" padding="lg">
      <ClosingFrame>
        <Headline
          titleId="anschluss-title"
          title="Schreib mir, wenn du wissen möchtest, ob das passt."
          accent="axisFlow"
          weight="poster"
        >
          Ein paar Sätze reichen. Wer du bist, was dich hierher geführt hat und
          ob du eher an Kurs, Einzelunterricht, einer Gruppe, einem Firmenformat
          oder erst einmal Orientierung interessiert bist.
        </Headline>

        <ContactPanel
          mail={{
            local: 'jonaszeihe',
            domain: 'gmail.com',
          }}
          subject="Anfrage zur Praxis"
          title="Du musst es noch nicht richtig benennen."
          text="Wenn du nicht sicher bist, welches Format passt, ist das kein Problem. Beschreib einfach kurz, wo du stehst. Dann schauen wir, ob und wie ein sinnvoller Rahmen entstehen kann."
          primaryLabel="E-Mail schreiben"
          copyLabel="Mailadresse kopieren"
          copiedLabel="Adresse kopiert"
        />
      </ClosingFrame>
    </Surface>
  </Section>
)

const ClosingFrame = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.region};
  min-height: clamp(22rem, 42svh, 34rem);
  align-content: center;
`

export default NextStepSection
