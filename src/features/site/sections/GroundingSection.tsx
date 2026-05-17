// src/features/site/screens/GroundingSection.tsx
'use client'

import styled from 'styled-components'
import Section from '@/components/primitives/Section'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import Typography from '@/design/typography'

const SectionStack = styled(Stack)`
  gap: ${({ theme }) => theme.spacing(1.35)};
`

const ContrastGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.1)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: minmax(0, 1.12fr) minmax(0, 0.88fr);
    gap: ${({ theme }) => theme.spacing(1.3)};
    align-items: stretch;
  }
`

const IntroSurface = styled(Surface)`
  max-width: 56rem;
`

const GroundingSection = () => (
  <Section
    id="sammeln"
    titleId="sammeln-title"
    ariaLabel="Sammeln"
    container="default"
    variant="body"
    rhythm="default"
    tone="clarify"
    energy="opening"
  >
    <SectionStack>
      <IntroSurface
        tone="panel"
        energy="opening"
        radius="large"
        bordered
        padding="lg"
        weight="steady"
      >
        <Stack gap={0.9}>
          <Typography
            as="p"
            variant="caption"
            gutter={false}
            accent="axisDensity"
          >
            Sammeln
          </Typography>

          <Typography
            as="h2"
            variant="h2"
            gutter={false}
            accent="axisDensity"
            id="sammeln-title"
          >
            Meta-Placeholder: Diese Bewegung sammelt Aufmerksamkeit und klärt
            das Feld, bevor die Praxis körperlicher und fordernder wird.
          </Typography>

          <Typography as="p" variant="body" gutter={false}>
            Meta-Placeholder: Hier später die ruhige Unterscheidung. Nicht
            Wellness, nicht Pose, nicht Methode als Identität, sondern Praxis
            als Werkzeug für Alltag, Körper und Selbstführung.
          </Typography>
        </Stack>
      </IntroSurface>

      <ContrastGrid>
        <Surface
          tone="panel"
          energy="flow"
          radius="large"
          bordered
          padding="lg"
          weight="steady"
        >
          <Stack gap={0.82}>
            <Typography
              as="p"
              variant="caption"
              gutter={false}
              accent="axisFlow"
            >
              Was trägt
            </Typography>

            <Typography as="h3" variant="h3" gutter={false} accent="axisFlow">
              Meta-Placeholder: Später die positive Setzung dieser Arbeit.
            </Typography>

            <Typography as="p" variant="body" gutter={false}>
              Meta-Placeholder: Klarheit, Freude, Anspruch, Lehrbarkeit,
              Praxisfähigkeit, Resonanz und Anschluss im wirklichen Leben.
            </Typography>

            <Typography as="p" variant="body" gutter={false} tone="soft">
              Meta-Placeholder: Diese Fläche zeigt, was Menschen hier finden
              können, ohne in Versprechen oder Werbesprache zu kippen.
            </Typography>
          </Stack>
        </Surface>

        <Surface
          tone="accent"
          energy="tension"
          radius="large"
          bordered
          padding="lg"
          weight="steady"
        >
          <Stack gap={0.82}>
            <Typography
              as="p"
              variant="caption"
              gutter={false}
              accent="axisTension"
            >
              Was abfällt
            </Typography>

            <Typography
              as="h3"
              variant="h3"
              gutter={false}
              accent="axisTension"
            >
              Meta-Placeholder: Später die klare Negativabgrenzung ohne
              Bitterkeit.
            </Typography>

            <Typography as="p" variant="body" gutter={false}>
              Meta-Placeholder: Keine Wellness-Kulisse. Kein Methodencontainer.
              Keine Öko-Romantik. Keine Guru-Rolle. Keine beruhigende Oberfläche
              ohne Tragfähigkeit.
            </Typography>

            <Typography as="p" variant="body" gutter={false} tone="soft">
              Meta-Placeholder: Diese Fläche darf schneiden, aber nicht nörgeln.
              Sie klärt, statt sich zu beschweren.
            </Typography>
          </Stack>
        </Surface>
      </ContrastGrid>

      <Surface
        tone="soft"
        energy="density"
        radius="large"
        bordered
        padding="md"
      >
        <Stack gap={0.72}>
          <Typography
            as="p"
            variant="caption"
            gutter={false}
            accent="axisDensity"
          >
            Erste Schärfung
          </Typography>

          <Typography as="p" variant="body" gutter={false}>
            Meta-Placeholder: Diese Schlussbewegung macht klar, dass Entspannung
            hier nicht Flucht ist. Sie bereitet Arbeit, Wachheit und Bewegung
            vor.
          </Typography>
        </Stack>
      </Surface>
    </SectionStack>
  </Section>
)

export default GroundingSection
