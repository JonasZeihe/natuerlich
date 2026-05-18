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
        opacity: 0.24,
        mobile: {
          right: '-13rem',
          top: '2rem',
          width: '31rem',
          opacity: 0.16,
        },
      },
      {
        name: '030_Schutzfeld',
        left: 'clamp(-9rem, -6vw, -3rem)',
        bottom: 'clamp(-9rem, -7vw, -3rem)',
        width: 'clamp(18rem, 30vw, 36rem)',
        presence: 'subtle',
        boundary: 'bleed',
        opacity: 0.18,
        mobile: {
          left: '-12rem',
          bottom: '-7rem',
          width: '29rem',
          opacity: 0.12,
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
        title="Du musst noch nicht alles wissen. Aber der nächste Schritt darf klar sein."
        accent="axisFlow"
        max="58rem"
      >
        Das Ende der Seite ist kein CTA-Gebrüll. Es ist ein sauberer Ausgang.
        Wer Kontakt aufnehmen will, soll wissen, wie. Wer noch unsicher ist,
        soll merken: Genau damit darf man kommen.
      </SectionIntro>

      <ContactPanel
        movement="nextStep"
        items={[
          {
            label: 'Kontaktweg',
            title: 'Schreib kurz, wer du bist und was du suchst.',
            accent: 'axisDensity',
            asset: {
              name: '027_Flusskörper',
              right: '-5rem',
              bottom: '-6rem',
              width: 'clamp(12rem, 23vw, 18rem)',
              presence: 'subtle',
              boundary: 'bleed',
              opacity: 0.2,
            },
            children:
              'Später hier E-Mail, Telefon, Kontaktzeiten oder Formular. Konkret genug, dass kein Rätsel bleibt. Ruhig genug, dass es nicht nach Formularmaschine wirkt.',
          },
          {
            label: 'Erster Schritt',
            title:
              'Wenn die passende Form noch nicht klar ist, ist das kein Problem.',
            tone: 'note',
            accent: 'axisFlow',
            asset: {
              name: '030_Schutzfeld',
              right: '-6rem',
              top: '-6rem',
              width: 'clamp(12rem, 24vw, 19rem)',
              presence: 'subtle',
              boundary: 'bleed',
              opacity: 0.2,
            },
            children:
              'Hier wird später entlastet, ohne beliebig zu werden. Man darf mit Unklarheit kommen — aber am Ende soll daraus ein konkreter Rahmen entstehen.',
          },
        ]}
        footerLabel="Was dann geschieht"
        footerAccent="axisDensity"
        footerAsset={{
          name: '024_Feine_Restenergie',
          right: '-6rem',
          bottom: '-6rem',
          width: 'clamp(11rem, 22vw, 18rem)',
          presence: 'subtle',
          boundary: 'bleed',
          opacity: 0.2,
        }}
        footer="Hier später kurz und würdig erklären, was nach einer Anfrage passiert: einordnen, passenden Rahmen finden, transparent bleiben. Kein Druck. Keine künstliche Dringlichkeit."
      />
    </Surface>
  </Section>
)

export default NextStepSection
