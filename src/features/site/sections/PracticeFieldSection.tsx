// src/features/site/sections/PracticeFieldSection.tsx
'use client'

import styled from 'styled-components'
import Button from '@/components/actions/Button'
import Section from '@/components/primitives/Section'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import Typography from '@/design/typography'

type Props = {
  onGoToIntegration: () => void
}

const SectionStack = styled(Stack)`
  gap: ${({ theme }) => theme.spacing(1.35)};
`

const PairGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.1)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: ${({ theme }) => theme.spacing(1.25)};
    align-items: stretch;
  }
`

const HeaderSurface = styled(Surface)`
  max-width: 58rem;
`

const PracticeFieldSection = ({ onGoToIntegration }: Props) => (
  <Section
    id="arbeiten"
    titleId="arbeiten-title"
    ariaLabel="Arbeiten"
    container="default"
    variant="body"
    rhythm="default"
    tone="pressure"
    mix={['density', 'tension']}
  >
    <SectionStack>
      <HeaderSurface
        tone="deep"
        movement="practice"
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
            accent="axisTension"
          >
            Arbeiten
          </Typography>

          <Typography
            as="h2"
            variant="h2"
            gutter={false}
            accent="axisTension"
            id="arbeiten-title"
          >
            Meta-Placeholder: Diese Bewegung zeigt die eigentliche Praxis als
            lebendige Arbeit: körperlich, aufmerksam, fordernd und freudig.
          </Typography>

          <Typography as="p" variant="body" gutter={false} measure="prose">
            Meta-Placeholder: Hier später Yoga, Qigong und Taijiquan nicht als
            Produktliste, sondern als unterschiedliche Zugänge zu Körper, Atem,
            Stand, Richtung und Selbstführung.
          </Typography>
        </Stack>
      </HeaderSurface>

      <PairGrid>
        <Surface
          tone="card"
          movement="practice"
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
              accent="axisOpening"
            >
              Yoga
            </Typography>

            <Typography
              as="h3"
              variant="h3"
              gutter={false}
              accent="axisOpening"
            >
              Meta-Placeholder: Hier später Yoga als klare körperliche Praxis
              mit eigenem Charakter und Verbindung zur gemeinsamen Grundlage.
            </Typography>

            <Typography as="p" variant="body" gutter={false}>
              Meta-Placeholder: Keine Posen-Show. Keine Fitness- oder
              Wellness-Anmutung. Praxis, die Kraft, Beweglichkeit, Atem und
              innere Ordnung zusammenführt.
            </Typography>
          </Stack>
        </Surface>

        <Surface
          tone="field"
          movement="practice"
          radius="large"
          bordered
          padding="lg"
        >
          <Stack gap={0.82}>
            <Typography
              as="p"
              variant="caption"
              gutter={false}
              accent="axisFlow"
            >
              Qigong und Taijiquan
            </Typography>

            <Typography as="h3" variant="h3" gutter={false} accent="axisFlow">
              Meta-Placeholder: Hier später Qigong und Taijiquan als verwandte,
              aber unterscheidbare Bewegungswege.
            </Typography>

            <Typography as="p" variant="body" gutter={false}>
              Meta-Placeholder: Ruhige Bewegung, Stand, Richtung,
              Gewichtsverlagerung, Formbewusstsein und Verbindung ohne
              Fernost-Deko oder Kulisse.
            </Typography>
          </Stack>
        </Surface>
      </PairGrid>

      <Surface
        tone="card"
        movement="practice"
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
            accent="axisDensity"
          >
            Formen der Arbeit
          </Typography>

          <Typography as="h3" variant="h3" gutter={false} accent="axisDensity">
            Meta-Placeholder: Hier später Kurse, Klassen, Einzelarbeit und
            Gruppenformate als unterschiedliche Arbeitsräume.
          </Typography>

          <Typography as="p" variant="body" gutter={false}>
            Meta-Placeholder: Diese Stelle gibt Orientierung, ohne in eine
            Produktmatrix zu kippen. Der konkrete Rahmen wird später integriert.
          </Typography>

          <Button variant="ghost" onClick={onGoToIntegration}>
            Meta-Placeholder: Rahmen einordnen
          </Button>
        </Stack>
      </Surface>
    </SectionStack>
  </Section>
)

export default PracticeFieldSection
