// src/features/site/sections/NextStepSection.tsx
'use client'

import ContactPanel from '@/components/content/ContactPanel'
import Headline from '@/components/content/Headline'
import Section from '@/components/primitives/Section'
import HighlightText from '@/components/utilities/HighlightText'

const NextStepSection = () => (
  <Section
    id="anschluss"
    titleId="anschluss-title"
    ariaLabel="Kontakt"
    container="wide"
    content="default"
    variant="outro"
    rhythm="spacious"
    tone="quiet"
    header={
      <Headline
        titleId="anschluss-title"
        title="Schreib mir, wenn du wissen möchtest, ob das passt."
        accent="daoyin"
        weight="poster"
      >
        Ein paar Sätze reichen. Wer du bist, was dich hierher geführt hat und ob
        du eher an Kurs, Einzelunterricht, einer Gruppe, einem Firmenformat oder
        erst einmal Orientierung interessiert bist.
      </Headline>
    }
  >
    <ContactPanel
      mail={{
        local: 'jonaszeihe',
        domain: 'gmail.com',
      }}
      subject="Anfrage zur Praxis"
      title="Du musst es noch nicht richtig benennen."
      text={
        <>
          Wenn du nicht sicher bist, welches Format passt, ist das kein Problem.
          Beschreib einfach kurz, wo du stehst. Dann schauen wir, ob und wie ein{' '}
          <HighlightText accent="daoyin">sinnvoller Rahmen</HighlightText>{' '}
          entstehen kann.
        </>
      }
      primaryLabel="E-Mail schreiben"
      copyLabel="Mailadresse kopieren"
      copiedLabel="Adresse kopiert"
    />
  </Section>
)

export default NextStepSection
