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
        title="Schmiede die Schwerter vor dem Krieg"
        accent="axisDensity"
        max="58rem"
      />

      <PracticePanel>
        <PracticeFields
          movement="practice"
          mobileAriaLabel="Praxisweg"
          scene={{
            title:
              'Manchmal liegt man wach und merkt- der Atem allein findet den Weg nicht zurück: Phasenverschiebung',
            body: 'Nicht, weil die Übung falsch ist. Sondern weil der Körper schon lange vorher in eine andere Richtung geraten ist. Ruhe lässt sich dann nicht einfach einschalten. Sie braucht einen Weg, der früher beginnt.',
          }}
          forge={{
            title: 'Stressmanagement ist der Schlüssel.',
            body: 'Nicht als Theorie über Stress. Als praktische Fähigkeit, den eigenen Zustand früher zu lesen: bevor Schlaf kippt, bevor Spannung normal wird, bevor der Körper erst nachts zeigt, was tagsüber keinen Raum hatte.',
            items: [
              {
                label: 'Atmung',
                text: 'öffnet Rhythmus, Weite und einen ersten direkten Zugang zum eigenen Zustand',
              },
              {
                label: 'Entspannung',
                text: 'macht spürbar, wo Spannung sitzt, wie sie gehalten wird und wo sie nachlassen kann',
              },
              {
                label: 'Achtsamkeit',
                text: 'ordnet Wahrnehmung, ohne sofort zu bewerten, zu reparieren oder wegzudrücken',
              },
            ],
          }}
          center={{
            title: 'In 導引養生功 wird daraus eine zusammenhängende Praxis.',
            body: 'Daoyin Yangsheng Gong ist für mich die Mitte dieser Arbeit: führen, bis Bewegung antwortet; nähren, was lebendig werden darf; üben, bis daraus Können entsteht.',
          }}
          ways={[
            {
              label: 'Qigong',
              title: '氣功 ist oft der zugänglichste Einstieg.',
              body: 'Atem, Stand, Aufmerksamkeit und wiederholbare Bewegungen verbinden sich zu einer ruhigen Praxis. Sie kann einfach beginnen und mit der Zeit tiefer werden.',
            },
            {
              label: 'Taijiquan',
              title: '太極拳 braucht mehr Unterbau.',
              body: 'Die Form ist nicht der Anfang. Erst wenn Stand, Gewicht, Richtung und Mitte lesbar werden, kann aus langsamer Bewegung geführte Kraft entstehen.',
            },
            {
              label: 'Yoga',
              title: 'Yoga steht als eigener klarer Weg daneben.',
              body: 'Haltung, Atem, Konzentration und Entspannung kommen in eine feste Praxisform. Nicht als Lifestyle, sondern als vollständiger körperlicher Übungsweg.',
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
                      Manchmal ist ein Kurs der richtige Anfang. Manchmal
                      braucht es Einzelunterricht. Manchmal entsteht daraus eine
                      regelmäßige Gruppe.
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
