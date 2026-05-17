// src/features/site/screens/RecognitionSection.tsx
'use client'

import styled from 'styled-components'
import Section from '@/components/primitives/Section'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import Typography from '@/design/typography'

const SectionStack = styled(Stack)`
  gap: ${({ theme }) => theme.spacing(1.2)};
`

const TopSurface = styled(Surface)`
  max-width: 58rem;
`

const MiddleLayout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.15)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: minmax(0, 1.36fr) minmax(18rem, 0.9fr);
    gap: ${({ theme }) => theme.spacing(1.3)};
    align-items: stretch;
  }
`

const SideColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.1)};
  min-width: 0;
`

const MediaPlaceholder = styled.div`
  min-height: 18rem;
  border: 1px dashed ${({ theme }) => theme.getAxisRole('axisDensity').border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme }) => theme.roles.surface.inset};
  display: flex;
  align-items: flex-end;
  padding: ${({ theme }) => theme.spacing(1.05)};
`

const RecognitionSection = () => (
  <Section
    id="erkennen"
    titleId="erkennen-title"
    ariaLabel="Erkennen"
    container="default"
    variant="body"
    rhythm="default"
    tone="threshold"
    mix={['density', 'tension']}
  >
    <SectionStack>
      <TopSurface
        tone="panel"
        mix={['density', 'tension']}
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
            measure="wide"
          >
            Erkennen
          </Typography>

          <Typography
            as="h2"
            variant="h2"
            gutter={false}
            accent="axisTension"
            cadence="dense"
            measure="title"
            id="erkennen-title"
          >
            Meta-Placeholder: Diese Bewegung macht sichtbar, warum diese Arbeit
            trägt und wer sie verantwortet.
          </Typography>

          <Typography
            as="p"
            variant="body"
            gutter={false}
            measure="prose"
            cadence="dense"
          >
            Meta-Placeholder: Hier später Lehrerhaltung, Erfahrung,
            Unterrichtsverständnis und fachliche Grundlage. Nicht als
            Über-mich-Block, sondern als Erkenntnisschicht nach der Arbeit.
          </Typography>

          <Typography
            as="p"
            variant="body"
            gutter={false}
            tone="soft"
            measure="prose"
          >
            Meta-Placeholder: Diese Passage eröffnet Vertrauen. Sie behauptet
            nichts, sie trägt.
          </Typography>
        </Stack>
      </TopSurface>

      <MiddleLayout>
        <Surface
          tone="accent"
          energy="tension"
          radius="large"
          bordered
          padding="lg"
          weight="strong"
        >
          <Stack gap={0.9}>
            <Typography
              as="p"
              variant="caption"
              gutter={false}
              accent="axisTension"
              measure="wide"
            >
              Weg und Reibung
            </Typography>

            <Typography
              as="h3"
              variant="h3"
              gutter={false}
              accent="axisTension"
              cadence="dense"
              measure="title"
            >
              Meta-Placeholder: Hier später die eigene Erfahrung, Reibung und
              der Weg in die Praxis.
            </Typography>

            <Typography
              as="p"
              variant="body"
              gutter={false}
              measure="prose"
              cadence="dense"
            >
              Meta-Placeholder: Später muss hier sichtbar werden, welche
              Erfahrungen, Bruchstellen oder Wiederannäherungen diese Arbeit
              glaubwürdig gemacht haben.
            </Typography>

            <Typography
              as="p"
              variant="body"
              gutter={false}
              tone="soft"
              measure="prose"
            >
              Meta-Placeholder: Nicht dramatisieren. Nicht pathologisieren.
              Nicht biografisch ausufern.
            </Typography>
          </Stack>
        </Surface>

        <SideColumn>
          <Surface
            tone="panel"
            energy="density"
            radius="large"
            bordered
            padding="md"
            weight="steady"
          >
            <Stack gap={0.8}>
              <Typography
                as="p"
                variant="caption"
                gutter={false}
                accent="axisDensity"
                measure="wide"
              >
                Unterricht
              </Typography>

              <Typography
                as="h3"
                variant="h3"
                gutter={false}
                accent="axisDensity"
                cadence="dense"
                measure="title"
              >
                Meta-Placeholder: Hier später lesbar machen, wie Jonas lehrt und
                warum das im Alltag trägt.
              </Typography>

              <Typography as="p" variant="body" gutter={false} measure="prose">
                Meta-Placeholder: Systemisch, pragmatisch, alltagstauglich,
                nicht dogmatisch. Methoden erscheinen als Werkzeuge.
              </Typography>
            </Stack>
          </Surface>

          <Surface
            tone="inset"
            energy="density"
            radius="large"
            bordered
            padding="sm"
            weight="quiet"
          >
            <MediaPlaceholder>
              <Typography
                as="p"
                variant="body"
                gutter={false}
                accent="axisDensity"
                measure="prose"
              >
                Bild-Placeholder: Reale Lehrerpräsenz. Ruhige, klare
                Körperlichkeit. Keine Heldenpose.
              </Typography>
            </MediaPlaceholder>
          </Surface>
        </SideColumn>
      </MiddleLayout>

      <Surface
        tone="soft"
        energy="density"
        radius="large"
        bordered
        padding="md"
        weight="steady"
      >
        <Stack gap={0.8}>
          <Typography
            as="p"
            variant="caption"
            gutter={false}
            accent="axisDensity"
            measure="wide"
          >
            Fachliche Grundlage
          </Typography>

          <Typography
            as="h3"
            variant="h3"
            gutter={false}
            accent="axisDensity"
            measure="title"
          >
            Meta-Placeholder: Hier später die geordnete, belastbare Ausbildung.
          </Typography>

          <Typography as="p" variant="body" gutter={false} measure="prose">
            Meta-Placeholder: Yoga, Qigong, Taijiquan, Meditation, Entspannung,
            dokumentierter Gesamtumfang, Vermittlung, Methodik und Didaktik.
          </Typography>

          <Typography
            as="p"
            variant="body"
            gutter={false}
            tone="soft"
            measure="prose"
          >
            Meta-Placeholder: Nachweise stützen die Haltung, sie ersetzen sie
            nicht.
          </Typography>
        </Stack>
      </Surface>
    </SectionStack>
  </Section>
)

export default RecognitionSection
