// src/features/site/sections/RecognitionSection.tsx
'use client'

import styled from 'styled-components'
import SectionIntro from '@/components/content/SectionIntro'
import ProofGrid from '@/components/content/ProofGrid'
import Section from '@/components/primitives/Section'
import Surface from '@/components/primitives/Surface'

const ProofArea = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3)};
`

const RecognitionSection = () => (
  <Section
    id="erkennen"
    titleId="erkennen-title"
    ariaLabel="Erkennen"
    container="wide"
    content="default"
    variant="body"
    rhythm="default"
    tone="threshold"
    movement="recognition"
    mix={['density', 'tension']}
    assets={[
      {
        name: '018_Fokusfeld',
        right: 'clamp(0rem, 7vw, 10rem)',
        top: 'clamp(1rem, 5vw, 6rem)',
        width: 'clamp(16rem, 28vw, 34rem)',
        presence: 'default',
        boundary: 'bleed',
        opacity: 0.28,
        mobile: {
          right: '-9rem',
          top: '1rem',
          width: '28rem',
          opacity: 0.16,
        },
      },
      {
        name: '022_Kühle_Präzision',
        left: 'clamp(-12rem, -7vw, -4rem)',
        bottom: 'clamp(-10rem, -8vw, -4rem)',
        width: 'clamp(20rem, 34vw, 42rem)',
        presence: 'subtle',
        boundary: 'bleed',
        opacity: 0.18,
        mobile: {
          left: '-12rem',
          bottom: '-7rem',
          width: '30rem',
          opacity: 0.12,
        },
      },
    ]}
  >
    <Surface
      tone="bare"
      movement="recognition"
      radius="none"
      bordered={false}
      padding="lg"
      weight="quiet"
    >
      <SectionIntro
        label="Erkennen"
        titleId="erkennen-title"
        title="Vertrauen entsteht nicht durch perfekte Oberfläche. Es entsteht, wenn sichtbar wird, was wirklich trägt."
        accent="axisTension"
        max="58rem"
      >
        Diese Section ist nicht „Über mich“. Sie zeigt später, warum Jonas diese
        Arbeit verantworten kann: Erfahrung, Brüche, Unterrichtsfreude,
        Ausbildung, Kritikfähigkeit und der Anspruch, nicht bei Oberfläche
        stehenzubleiben.
      </SectionIntro>

      <ProofArea>
        <ProofGrid
          movement="recognition"
          items={[
            {
              label: 'Weg und Reibung',
              tone: 'threshold',
              accent: 'axisTension',
              title:
                'Praxis wurde nicht aus einem perfekten Lebenslauf geboren.',
              asset: {
                name: '032_Kern',
                right: '-6rem',
                bottom: '-7rem',
                width: 'clamp(12rem, 24vw, 20rem)',
                presence: 'subtle',
                boundary: 'bleed',
                opacity: 0.2,
              },
              children:
                'Hier darf später stehen, dass diese Arbeit durch echte Krisen, Verluste, Neuaufbau und Wiederannäherung glaubwürdig wurde. Nicht dramatisieren. Nicht therapieren. Nur zeigen, dass der Weg nicht künstlich glatt war.',
            },
            {
              label: 'Unterricht',
              tone: 'card',
              accent: 'axisDensity',
              title: 'Locker, direkt, präzise — und mit hohem Anspruch.',
              asset: {
                name: '022_Kühle_Präzision',
                right: '-8rem',
                top: '-8rem',
                width: 'clamp(13rem, 24vw, 21rem)',
                presence: 'subtle',
                boundary: 'bleed',
                opacity: 0.2,
              },
              children:
                'Später wird hier sichtbar, dass Freude und Niveau zusammengehören. Kein Guru-Auftritt, keine Wellnessrolle, keine Methode als Selbstzweck.',
            },
            {
              label: 'Präsenz',
              tone: 'note',
              accent: 'axisDensity',
              media: true,
              children:
                'Component-Placeholder: Reale Lehrerpräsenz. Bildfläche für Jonas ohne Heldenpose, ohne Naturtapete, ohne Yogaklischee.',
            },
            {
              label: 'Fachliche Grundlage',
              tone: 'field',
              accent: 'axisDensity',
              title: 'Ausbildung als Substanz, nicht als Eingangsschild.',
              children:
                'Hier später dokumentierter Umfang in Yoga, Qigong, Taijiquan, Meditation, Entspannung, Methodik und Didaktik. Die Nachweise stützen die Haltung, aber sie ersetzen sie nicht.',
            },
          ]}
        />
      </ProofArea>
    </Surface>
  </Section>
)

export default RecognitionSection
