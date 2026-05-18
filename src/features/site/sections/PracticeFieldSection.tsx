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

const FooterBody = styled.div`
  width: min(100%, 56rem);
`

const FooterAction = styled.div`
  display: flex;
  align-items: center;
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
        presence: 'subtle',
        boundary: 'bleed',
        opacity: 0.16,
        mobile: {
          right: '-15rem',
          top: '2rem',
          width: '34rem',
          opacity: 0.08,
        },
      },
      {
        name: '003_Standfeld',
        left: 'clamp(-12rem, -8vw, -4rem)',
        bottom: 'clamp(-9rem, -7vw, -3rem)',
        width: 'clamp(20rem, 34vw, 42rem)',
        presence: 'subtle',
        boundary: 'bleed',
        opacity: 0.14,
        mobile: {
          left: '-12rem',
          bottom: '-6rem',
          width: '29rem',
          opacity: 0.08,
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
        title="Ich unterrichte keine Methoden als Etiketten. Ich unterrichte Praxis."
        accent="axisDensity"
        max="58rem"
      >
        Yoga, Qigong und Taijiquan sind für mich keine Lifestyle-Produkte und
        keine schönen Kulissen für ein bisschen Entspannung. Es sind Werkzeuge.
        Sehr alte, sehr wirksame, manchmal missverstandene Werkzeuge. Sie können
        helfen, den Körper zu ordnen, den Atem wiederzufinden, den Kopf klarer
        zu machen und im eigenen Leben mehr Freiheit, Ruhe und Freude entstehen
        zu lassen. Aber nur, wenn man sie ernst genug nimmt, um sie nicht zu
        verkleiden.
      </SectionIntro>

      <PracticePanel>
        <PracticeFields
          movement="practice"
          mobileAriaLabel="Praxisfelder"
          items={[
            {
              label: 'Yoga',
              title:
                'Nicht Posen, nicht Wellness-Fassade, sondern Körper, Atem, Kraft und Ruhe in einer gemeinsamen Form.',
              tone: 'card',
              accent: 'axisDensity',
              asset: {
                name: '012_S-Kurve',
                right: '-6rem',
                bottom: '-7rem',
                width: 'clamp(12rem, 24vw, 20rem)',
                presence: 'subtle',
                boundary: 'bleed',
                opacity: 0.12,
              },
              children:
                'Yoga wird schnell entweder zu Fitness-Gehopse oder zu halber Esoterik. Beides interessiert mich nicht. Mich interessiert Yoga als lebendige Praxis: klar aufgebaut, körperlich ehrlich, regulierend, kräftigend und so geführt, dass du nicht nur Übungen machst, sondern merkst, was sie mit dir machen.',
            },
            {
              label: 'Qigong und Taijiquan',
              title:
                'Stand, Richtung, Gewichtsverlagerung und Fluss — ruhig genug, um fein zu werden, präzise genug, um wirklich zu wirken.',
              tone: 'field',
              accent: 'axisDensity',
              asset: {
                name: '005_Gewichtsverlagerung',
                right: '-7rem',
                top: '-7rem',
                width: 'clamp(12rem, 25vw, 20rem)',
                presence: 'subtle',
                boundary: 'bleed',
                opacity: 0.1,
              },
              children:
                'Qigong und Taijiquan sind keine Fernost-Deko und keine Flucht aus dem Alltag. Langsame Bewegung heißt hier nicht Beliebigkeit. Sie macht sichtbar, wo Spannung sitzt, wo der Stand fehlt, wo der Atem stockt und wo Bewegung wieder rund werden kann. Ruhe ist dabei nichts Passives. Sie wird aufgebaut.',
            },
          ]}
          footer={
            <Surface
              tone="note"
              movement="practice"
              radius="large"
              bordered
              padding="lg"
              weight="steady"
              asset={{
                name: '031_Tatkraft',
                right: '-5rem',
                bottom: '-6rem',
                width: 'clamp(13rem, 22vw, 20rem)',
                presence: 'subtle',
                boundary: 'bleed',
                opacity: 0.1,
              }}
            >
              <Stack gap={4} align="start">
                <Typography
                  as="p"
                  variant="caption"
                  gutter={false}
                  accent="axisDensity"
                >
                  Formen der Praxis
                </Typography>

                <FooterBody>
                  <Stack gap={3}>
                    <Typography
                      as="h3"
                      variant="h3"
                      gutter={false}
                      color="primary"
                    >
                      Aus diesen Werkzeugen entstehen Räume: für Einstieg,
                      Wiederholung, Vertiefung und persönliche Begleitung.
                    </Typography>

                    <Typography
                      as="p"
                      variant="body"
                      gutter={false}
                      tone="soft"
                      cadence="open"
                    >
                      Ein Kurs ist nicht dasselbe wie eine Klasse. Eine Gruppe
                      nicht dasselbe wie Einzelarbeit. Manchmal braucht es
                      Orientierung, manchmal Rhythmus, manchmal Korrektur,
                      manchmal einfach einen geschützten Rahmen, in dem Praxis
                      wieder selbstverständlich werden kann. Entscheidend ist
                      nicht der Name des Formats, sondern ob es zu dem passt,
                      was du wirklich brauchst.
                    </Typography>
                  </Stack>
                </FooterBody>

                <FooterAction>
                  <Button variant="primary" onClick={onGoToIntegration}>
                    Passenden Rahmen einordnen
                  </Button>
                </FooterAction>
              </Stack>
            </Surface>
          }
        />
      </PracticePanel>
    </Surface>
  </Section>
)

export default PracticeFieldSection
