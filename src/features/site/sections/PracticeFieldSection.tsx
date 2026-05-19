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
        titleId="arbeiten-title"
        title="Yoga, Qigong und Taijiquan — ich bin, was ich tue."
        accent="axisDensity"
        max="58rem"
      >
        Jetzt geht es nicht mehr um schöne Begriffe. Jetzt geht es um Praxis. Um
        alte Übungswege, die im Körper landen müssen: Atem, Kraft, Ruhe,
        Aufmerksamkeit, Regulation und die Fähigkeit, wirklich bei dem zu
        bleiben, was du tust.
      </SectionIntro>

      <PracticePanel>
        <PracticeFields
          movement="practice"
          mobileAriaLabel="Praxisfelder"
          items={[
            {
              label: 'Yoga',
              title:
                'Von yuj: verbinden, anschirren, ausrichten — ein Übungsweg für Körper, Atem, Geist und Alltag.',
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
                'Yoga ist hier kein einzelner Trick und keine Körperform zum Abhaken. Es geht darum, den Menschen wieder in Beziehung zu bringen: Haltung, Bewegung, Atmung, Entspannung, Konzentration und die Art, wie du mit dir selbst umgehst.',
            },
            {
              label: 'Qigong',
              title:
                '氣功: Qi als Atem, Dampf und Lebenskraft. Gong als Übung, Arbeit und erworbenes Können.',
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
                'Im alten Zeichen steckt dieses starke Bild: Reis, aus dem Wärme aufsteigt. Qigong ist keine Energiebehauptung, sondern Übung an der Lebendigkeit. Im Daoyin Yangsheng Gong nach Prof. Zhang Guangde wird daraus Lebenspflege in Bewegung: führen, atmen, drehen, wahrnehmen, wiederholen — einfach genug für den Einstieg, präzise genug für echte Arbeit.',
            },
            {
              label: 'Taijiquan',
              title:
                '太極拳: Taiji, das höchste Prinzip. Quan, die Faust. Ruhe als geführte Kraft.',
              tone: 'card',
              accent: 'axisOpening',
              asset: {
                name: '003_Standfeld',
                right: '-6rem',
                bottom: '-7rem',
                width: 'clamp(12rem, 24vw, 20rem)',
                presence: 'subtle',
                boundary: 'bleed',
                opacity: 0.1,
              },
              children:
                'Taijiquan ist nicht langsames Qigong und nicht Entspannungsbewegung mit schöner Form. Es ist eine innere Kampfkunst: Arbeit an Struktur, Mitte, Gewicht, Richtung, Wandlung und Kraft ohne Verkrampfung. Ruhig von außen, sehr genau von innen.',
            },
            {
              label: 'Meditation und Entspannung',
              title:
                'Entspannungsfähigkeit ist keine Stimmung. Sie ist eine trainierbare Form neurovegetativer Regulation.',
              tone: 'field',
              accent: 'axisFlow',
              asset: {
                name: '021_Ruhige_Wärme',
                right: '-7rem',
                top: '-6rem',
                width: 'clamp(12rem, 24vw, 20rem)',
                presence: 'subtle',
                boundary: 'bleed',
                opacity: 0.12,
              },
              children:
                'Stress ist nicht nur ein Moment, der wieder verschwindet. Er kann dein System verschieben, bis Anspannung normal wirkt und Erholung nicht mehr richtig greift. Darum üben wir parasympathikotone Umschaltung: Atem, Wahrnehmung, Rhythmus, Stille und einen Körper, der wieder lernen darf, vom Angriff in Regeneration zu wechseln.',
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
                  Der passende Rahmen
                </Typography>

                <FooterBody>
                  <Stack gap={3}>
                    <Typography
                      as="h3"
                      variant="h3"
                      gutter={false}
                      color="primary"
                    >
                      Manchmal reicht ein Kurs. Manchmal braucht es
                      Einzelunterricht. Manchmal wollt ihr als Gruppe üben.
                    </Typography>

                    <Typography
                      as="p"
                      variant="body"
                      gutter={false}
                      tone="soft"
                      cadence="open"
                    >
                      Entscheidend ist nicht, wie das Format heißt. Entscheidend
                      ist, ob es zu deinem Stand, deinem Alltag und deiner
                      Richtung passt.
                    </Typography>
                  </Stack>
                </FooterBody>

                <FooterAction>
                  <Button variant="primary" onClick={onGoToIntegration}>
                    Angebote ansehen
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
