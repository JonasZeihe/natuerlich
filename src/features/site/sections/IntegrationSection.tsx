// src/features/site/screens/IntegrationSection.tsx
'use client'

import styled from 'styled-components'
import Button from '@/components/actions/Button'
import Card from '@/components/primitives/Card'
import Section from '@/components/primitives/Section'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import Typography from '@/design/typography'

type Props = {
  onGoToNextStep: () => void
}

const SectionStack = styled(Stack)`
  gap: ${({ theme }) => theme.spacing(1.35)};
`

const GroupGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.05)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: ${({ theme }) => theme.spacing(1.2)};
  }
`

const FaqGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.95)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: ${({ theme }) => theme.spacing(1.05)};
  }
`

const IntegrationSection = ({ onGoToNextStep }: Props) => (
  <Section
    id="integrieren"
    titleId="integrieren-title"
    ariaLabel="Integrieren"
    container="default"
    variant="body"
    rhythm="default"
    tone="relief"
    mix={['opening', 'flow']}
  >
    <SectionStack>
      <Surface
        tone="panel"
        energy="density"
        radius="large"
        bordered
        padding="lg"
        weight="strong"
      >
        <Stack gap={0.82}>
          <Typography
            as="p"
            variant="caption"
            gutter={false}
            accent="axisDensity"
            measure="wide"
          >
            Integrieren
          </Typography>

          <Typography
            as="h2"
            variant="h2"
            gutter={false}
            accent="axisDensity"
            cadence="dense"
            measure="title"
            id="integrieren-title"
          >
            Meta-Placeholder: Diese Bewegung ordnet die Formen, ohne den Raum
            wieder in Produktkatalog und Website-Logik zurückfallen zu lassen.
          </Typography>

          <Typography
            as="p"
            variant="body"
            gutter={false}
            measure="prose"
            cadence="dense"
          >
            Meta-Placeholder: Hier später Formate, Preise, Rahmen und typische
            Einstiegslagen so ordnen, dass ein Mensch Anschluss findet.
          </Typography>

          <Typography
            as="p"
            variant="body"
            gutter={false}
            tone="soft"
            measure="prose"
          >
            Meta-Placeholder: Das Angebot wird nach Funktion lesbar: Einstieg,
            regelmäßige Praxis, individuelle Begleitung, professionelle Formate
            und Vertiefung.
          </Typography>
        </Stack>
      </Surface>

      <GroupGrid>
        <Card tone="soft" energy="opening" radius="large" bordered padding="md">
          <Stack gap={0.82}>
            <Typography
              as="p"
              variant="caption"
              gutter={false}
              accent="axisOpening"
              measure="wide"
            >
              Einstieg
            </Typography>

            <Typography
              as="h3"
              variant="h3"
              gutter={false}
              accent="axisOpening"
              measure="title"
            >
              Meta-Placeholder: Hier später niederschwellige Formate für den
              ersten sinnvollen Zugang.
            </Typography>

            <Typography as="p" variant="body" gutter={false} measure="prose">
              Meta-Placeholder: Auftaktkurs, Baseline, kompakte Grundpraxis,
              Einführungsformate oder andere erste Schwellen.
            </Typography>
          </Stack>
        </Card>

        <Card
          tone="panel"
          energy="density"
          radius="large"
          bordered
          padding="md"
        >
          <Stack gap={0.82}>
            <Typography
              as="p"
              variant="caption"
              gutter={false}
              accent="axisDensity"
              measure="wide"
            >
              Regelmäßigkeit
            </Typography>

            <Typography
              as="h3"
              variant="h3"
              gutter={false}
              accent="axisDensity"
              measure="title"
            >
              Meta-Placeholder: Hier später Kurs- und Klassenformate für
              Menschen, die kontinuierlicher üben wollen.
            </Typography>

            <Typography as="p" variant="body" gutter={false} measure="prose">
              Meta-Placeholder: Rhythmus, Verbindlichkeit, Aufbau und Funktion
              der wiederkehrenden Praxis.
            </Typography>
          </Stack>
        </Card>

        <Card tone="panel" energy="flow" radius="large" bordered padding="md">
          <Stack gap={0.82}>
            <Typography
              as="p"
              variant="caption"
              gutter={false}
              accent="axisFlow"
              measure="wide"
            >
              Individuell
            </Typography>

            <Typography
              as="h3"
              variant="h3"
              gutter={false}
              accent="axisFlow"
              measure="title"
            >
              Meta-Placeholder: Hier später Einzelsettings und persönliche
              Praxisbegleitung.
            </Typography>

            <Typography as="p" variant="body" gutter={false} measure="prose">
              Meta-Placeholder: Wann Einzelunterricht sinnvoll ist, für wen das
              passt und wie sich das von Gruppenformaten unterscheidet.
            </Typography>
          </Stack>
        </Card>

        <Card tone="soft" energy="opening" radius="large" bordered padding="md">
          <Stack gap={0.82}>
            <Typography
              as="p"
              variant="caption"
              gutter={false}
              accent="axisOpening"
              measure="wide"
            >
              Professionell
            </Typography>

            <Typography
              as="h3"
              variant="h3"
              gutter={false}
              accent="axisOpening"
              measure="title"
            >
              Meta-Placeholder: Hier später Firmen-, Team- oder andere externe
              Formate.
            </Typography>

            <Typography as="p" variant="body" gutter={false} measure="prose">
              Meta-Placeholder: Bewegte Pause, Reset-Formate, Workshops,
              Gesundheits- oder Teamkontexte.
            </Typography>
          </Stack>
        </Card>
      </GroupGrid>

      <FaqGrid>
        <Card tone="soft" energy="density" radius="large" bordered padding="md">
          <Stack gap={0.72}>
            <Typography
              as="p"
              variant="caption"
              gutter={false}
              accent="axisDensity"
              measure="wide"
            >
              Orientierung
            </Typography>

            <Typography
              as="h3"
              variant="h3"
              gutter={false}
              accent="axisDensity"
              measure="title"
            >
              Meta-Placeholder: Welche Form ist für einen Einstieg sinnvoll?
            </Typography>

            <Typography
              as="p"
              variant="body"
              gutter={false}
              tone="soft"
              measure="prose"
            >
              Meta-Placeholder: Später hier eine entlastende Antwort mit Bezug
              auf unterschiedliche Einstiegslagen.
            </Typography>
          </Stack>
        </Card>

        <Card tone="soft" energy="density" radius="large" bordered padding="md">
          <Stack gap={0.72}>
            <Typography
              as="p"
              variant="caption"
              gutter={false}
              accent="axisDensity"
              measure="wide"
            >
              Rahmen
            </Typography>

            <Typography
              as="h3"
              variant="h3"
              gutter={false}
              accent="axisDensity"
              measure="title"
            >
              Meta-Placeholder: Wie transparent sind Preise, Laufzeiten und
              Verbindlichkeit?
            </Typography>

            <Typography
              as="p"
              variant="body"
              gutter={false}
              tone="soft"
              measure="prose"
            >
              Meta-Placeholder: Preise, Formate und Laufzeiten bleiben nicht im
              Nebel, sondern gehören zur Glaubwürdigkeit.
            </Typography>
          </Stack>
        </Card>
      </FaqGrid>

      <Surface
        tone="panel"
        energy="flow"
        radius="large"
        bordered
        padding="md"
        weight="steady"
      >
        <Stack gap={0.78}>
          <Typography
            as="p"
            variant="caption"
            gutter={false}
            accent="axisFlow"
            measure="wide"
          >
            Übergang
          </Typography>

          <Typography as="p" variant="body" gutter={false} measure="prose">
            Meta-Placeholder: Diese Schlussbewegung trägt in den nächsten
            Schritt, ohne Druck zu erzeugen.
          </Typography>

          <Button variant="ghost" onClick={onGoToNextStep}>
            Meta-Placeholder: Anschluss finden
          </Button>
        </Stack>
      </Surface>
    </SectionStack>
  </Section>
)

export default IntegrationSection
