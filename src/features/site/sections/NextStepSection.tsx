// src/features/site/sections/NextStepSection.tsx
'use client'

import ContactPanel from '@/components/content/ContactPanel'
import SectionIntro from '@/components/content/SectionIntro'
import Section from '@/components/primitives/Section'
import Surface from '@/components/primitives/Surface'

const NextStepSection = () => (
  <Section
    id="anschluss"
    titleId="anschluss-title"
    ariaLabel="Anschluss"
    container="wide"
    content="default"
    variant="outro"
    rhythm="compact"
    tone="arrival"
    movement="nextStep"
    energy="flow"
    assets={[
      {
        name: '021_Ruhige_Wärme',
        right: 'clamp(-8rem, -5vw, -2rem)',
        top: 'clamp(1rem, 5vw, 6rem)',
        width: 'clamp(20rem, 33vw, 40rem)',
        presence: 'subtle',
        boundary: 'bleed',
        opacity: 0.2,
        mobile: {
          right: '-13rem',
          top: '2rem',
          width: '31rem',
          opacity: 0.12,
        },
      },
      {
        name: '030_Schutzfeld',
        left: 'clamp(-9rem, -6vw, -3rem)',
        bottom: 'clamp(-9rem, -7vw, -3rem)',
        width: 'clamp(18rem, 30vw, 36rem)',
        presence: 'subtle',
        boundary: 'bleed',
        opacity: 0.14,
        mobile: {
          left: '-12rem',
          bottom: '-7rem',
          width: '29rem',
          opacity: 0.08,
        },
      },
    ]}
  >
    <Surface
      tone="bare"
      movement="nextStep"
      radius="none"
      bordered={false}
      padding="lg"
      weight="quiet"
    >
      <SectionIntro
        label="Anschluss"
        titleId="anschluss-title"
        title="Wenn du wissen möchtest, ob das passt, schreib mir."
        accent="axisFlow"
        max="58rem"
      >
        Du musst noch nicht genau wissen, welches Format richtig ist. Ein paar
        Sätze reichen: wo du gerade stehst, was dich interessiert und ob es um
        Kurs, Einzelarbeit, eine Gruppe, ein Firmenformat oder erstmal
        Orientierung geht.
      </SectionIntro>

      <ContactPanel
        movement="nextStep"
        mail={{
          local: 'jonaszeihe',
          domain: 'gmail.com',
        }}
        subject="Anfrage zur Praxis"
        primaryLabel="E-Mail schreiben"
        copyLabel="Mailadresse kopieren"
        copiedLabel="Adresse kopiert"
        accent="axisFlow"
        prompt={{
          label: 'Kontakt',
          title: 'Schreib mir direkt.',
          children:
            'Schreib kurz, wer du bist, was dich hierher geführt hat und welche Form von Praxis dich interessiert. Unklarheit ist kein Problem: Wenn Kurs, Klasse, Einzelarbeit, Gruppe oder Firmenformat noch nicht klar sind, ordnen wir es gemeinsam.',
        }}
      />
    </Surface>
  </Section>
)

export default NextStepSection
