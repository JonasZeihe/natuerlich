// src/features/site/screens/ActivationSection.tsx
'use client'

import styled from 'styled-components'
import Button from '@/components/actions/Button'
import Section from '@/components/primitives/Section'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import Typography from '@/design/typography'

type Props = {
  onGoToPracticeField: () => void
}

const SectionStack = styled(Stack)`
  gap: ${({ theme }) => theme.spacing(1.35)};
`

const ActivationGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.15)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: minmax(0, 1.14fr) minmax(0, 0.86fr);
    gap: ${({ theme }) => theme.spacing(1.3)};
    align-items: stretch;
  }
`

const HeaderSurface = styled(Surface)`
  max-width: 58rem;
`

const ActivationSection = ({ onGoToPracticeField }: Props) => (
  <Section
    id="aktivieren"
    titleId="aktivieren-title"
    ariaLabel="Aktivieren"
    container="default"
    variant="body"
    rhythm="default"
    tone="expand"
    energy="tension"
  >
    <SectionStack>
      <HeaderSurface
        tone="soft"
        energy="opening"
        radius="large"
        bordered
        padding="lg"
        weight="steady"
      >
        <Stack gap={0.74}>
          <Typography
            as="p"
            variant="caption"
            gutter={false}
            accent="axisOpening"
          >
            Aktivieren
          </Typography>

          <Typography
            as="h2"
            variant="h2"
            gutter={false}
            accent="axisOpening"
            id="aktivieren-title"
          >
            Meta-Placeholder: Diese Bewegung bringt den Besucher aus bloßer
            Orientierung in eine erste spürbare Körper- und
            Aufmerksamkeitslogik.
          </Typography>
        </Stack>
      </HeaderSurface>

      <ActivationGrid>
        <Surface
          tone="accent"
          energy="flow"
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
              accent="axisFlow"
            >
              Grundlage
            </Typography>

            <Typography as="h3" variant="h3" gutter={false} accent="axisFlow">
              Meta-Placeholder: Hier später Meditation, Atem, Achtsamkeit und
              Entspannung als Boden aller weiteren Praxis.
            </Typography>

            <Typography as="p" variant="body" gutter={false}>
              Meta-Placeholder: Diese Kräfte sind kein Zusatz. Sie schaffen
              Sammlung, Wahrnehmung und die Fähigkeit, überhaupt sinnvoll zu
              üben.
            </Typography>

            <Typography as="p" variant="body" gutter={false} tone="soft">
              Bild-Placeholder: Ruhige reale Praxisnähe oder eine stille
              Präsenzfläche. Keine Meditationssymbolik.
            </Typography>
          </Stack>
        </Surface>

        <Surface
          tone="panel"
          energy="opening"
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
              Erste Wärme
            </Typography>

            <Typography
              as="h3"
              variant="h3"
              gutter={false}
              accent="axisOpening"
            >
              Meta-Placeholder: Hier später die erste körperliche Öffnung: nicht
              spektakulär, aber klar, wach und unmittelbar.
            </Typography>

            <Typography as="p" variant="body" gutter={false}>
              Meta-Placeholder: Diese Stelle bereitet die eigentliche Arbeit vor
              und zeigt, dass Praxis nicht aus Zuschauen, Lesen oder Meinung
              entsteht.
            </Typography>

            <Button variant="ghost" onClick={onGoToPracticeField}>
              Meta-Placeholder: Weiter zur Arbeit
            </Button>
          </Stack>
        </Surface>
      </ActivationGrid>
    </SectionStack>
  </Section>
)

export default ActivationSection
