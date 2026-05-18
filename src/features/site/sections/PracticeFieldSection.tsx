// src/features/site/sections/PracticeFieldSection.tsx
'use client'

import styled from 'styled-components'
import Button from '@/components/actions/Button'
import PracticeFields from '@/components/content/PracticeFields'
import SectionIntro from '@/components/content/SectionIntro'
import Section from '@/components/primitives/Section'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import Typography from '@/design/typography'

type Props = {
  onGoToIntegration: () => void
}

const PracticePanel = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3)};
`

const PracticeFieldSection = ({ onGoToIntegration }: Props) => (
  <Section
    id="arbeiten"
    titleId="arbeiten-title"
    ariaLabel="Arbeiten"
    container="wide"
    content="default"
    variant="body"
    rhythm="spacious"
    tone="pressure"
    movement="practice"
    mix={['density', 'tension']}
    assets={[
      {
        name: '025_Druckfeld',
        right: 'clamp(-10rem, -7vw, -3rem)',
        top: 'clamp(2rem, 6vw, 7rem)',
        width: 'clamp(24rem, 44vw, 52rem)',
        presence: 'default',
        boundary: 'bleed',
        opacity: 0.26,
        mobile: {
          right: '-15rem',
          top: '2rem',
          width: '34rem',
          opacity: 0.16,
        },
      },
      {
        name: '003_Standfeld',
        left: 'clamp(-12rem, -8vw, -4rem)',
        bottom: 'clamp(-9rem, -7vw, -3rem)',
        width: 'clamp(20rem, 34vw, 42rem)',
        presence: 'subtle',
        boundary: 'bleed',
        opacity: 0.2,
        mobile: {
          left: '-12rem',
          bottom: '-6rem',
          width: '29rem',
          opacity: 0.14,
        },
      },
    ]}
  >
    <Surface
      tone="bare"
      movement="practice"
      radius="none"
      bordered={false}
      padding="lg"
      weight="quiet"
    >
      <SectionIntro
        label="Arbeiten"
        titleId="arbeiten-title"
        title="Anspruch und Freude widersprechen sich nicht. Gute Praxis darf fordern, ohne dich gegen dich selbst zu richten."
        accent="axisTension"
        max="58rem"
      >
        Diese Section ist der körperliche Schwerpunkt der Seite. Hier wird aus
        Motivation Arbeit: schwitzen, üben, wiederholen, korrigieren, lachen,
        tiefer gehen. Nicht Selbstoptimierung. Handwerk.
      </SectionIntro>

      <PracticePanel>
        <PracticeFields
          movement="practice"
          mobileAriaLabel="Praxisfelder auswählen"
          items={[
            {
              label: 'Yoga',
              title: 'Körperarbeit, Atem und Ruhe als gemeinsame Form.',
              tone: 'deep',
              accent: 'axisOpening',
              asset: {
                name: '012_S-Kurve',
                right: '-6rem',
                bottom: '-7rem',
                width: 'clamp(12rem, 24vw, 20rem)',
                presence: 'subtle',
                boundary: 'bleed',
                opacity: 0.26,
              },
              children:
                'Kein Posen-Schaufenster, kein Fitness-Gehopse, keine Wellness-Fassade. Yoga wird später als klare, freudige und präzise Praxis lesbar.',
            },
            {
              label: 'Qigong und Taijiquan',
              title: 'Stand, Richtung, Fluss und Formbewusstsein.',
              tone: 'card',
              accent: 'axisFlow',
              asset: {
                name: '005_Gewichtsverlagerung',
                right: '-7rem',
                top: '-7rem',
                width: 'clamp(12rem, 25vw, 20rem)',
                presence: 'subtle',
                boundary: 'bleed',
                opacity: 0.22,
              },
              children:
                'Ruhige Bewegung ohne Fernost-Deko. Präzision ohne Starrheit. Wiederholung, die den Körper ordnet und den Kopf klarer macht.',
            },
          ]}
          footer={
            <Surface
              tone="threshold"
              movement="practice"
              radius="large"
              bordered
              padding="lg"
              weight="strong"
              asset={{
                name: '031_Tatkraft',
                right: '-5rem',
                bottom: '-6rem',
                width: 'clamp(13rem, 22vw, 20rem)',
                presence: 'subtle',
                boundary: 'bleed',
                opacity: 0.24,
              }}
            >
              <Stack gap={4}>
                <Typography
                  as="p"
                  variant="caption"
                  gutter={false}
                  accent="axisDensity"
                >
                  Formen der Arbeit
                </Typography>

                <Typography
                  as="h3"
                  variant="h3"
                  gutter={false}
                  accent="axisDensity"
                >
                  Später werden hier Kurse, Klassen, Einzelarbeit und
                  Gruppenformate als Arbeitsräume sichtbar.
                </Typography>

                <Typography as="p" variant="body" gutter={false}>
                  Noch kein Produktkatalog. Diese Fläche bereitet nur vor, dass
                  die späteren Angebote aus der Praxis heraus entstehen:
                  Einstieg, Wiederholung, Vertiefung, individuelle Begleitung.
                </Typography>

                <Button variant="ghost" onClick={onGoToIntegration}>
                  Passenden Rahmen einordnen
                </Button>
              </Stack>
            </Surface>
          }
        />
      </PracticePanel>
    </Surface>
  </Section>
)

export default PracticeFieldSection
