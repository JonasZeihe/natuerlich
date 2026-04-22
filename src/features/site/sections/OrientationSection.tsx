// src/features/site/sections/OrientationSection.tsx
'use client'

import styled from 'styled-components'
import Section from '@/components/primitives/Section'
import Surface from '@/components/primitives/Surface'
import Stack from '@/components/primitives/Stack'
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

export default function OrientationSection() {
  return (
    <Section
      id="einordnung"
      titleId="einordnung-title"
      ariaLabel="Einordnung"
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
              Einordnung
            </Typography>

            <Typography
              as="h2"
              variant="h2"
              gutter={false}
              accent="axisDensity"
              id="einordnung-title"
            >
              Meta-Placeholder: Hier später die klare Setzung, was diese Arbeit
              im Kern ist und warum sie sich anders anfühlt als eine generische
              Yoga-, Achtsamkeits- oder Gesundheitspräsenz.
            </Typography>

            <Typography as="p" variant="body" gutter={false}>
              Meta-Placeholder: Diese Stelle muss später das Feld entnebeln.
              Nicht durch Polemik, sondern durch präzise Unterscheidung. Es soll
              lesbar werden, dass es hier um ernsthafte, freudige,
              alltagstaugliche Praxis geht und nicht um Kulisse, Konsum oder
              Pose.
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
                Worum es hier geht
              </Typography>

              <Typography as="h3" variant="h3" gutter={false} accent="axisFlow">
                Meta-Placeholder: Später die positive Einordnung dieser Arbeit.
              </Typography>

              <Typography as="p" variant="body" gutter={false}>
                Meta-Placeholder: Klarheit, Anspruch, Praxisfähigkeit, Freude,
                Resonanz, Lehrbarkeit und Anschluss im wirklichen Leben.
              </Typography>

              <Typography as="p" variant="body" gutter={false} tone="soft">
                Meta-Placeholder: Diese Fläche muss später ruhig und präzise
                zeigen, was Menschen hier tatsächlich finden können.
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
                Worum es hier nicht geht
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
                Meta-Placeholder: Keine Wellness-Kulisse. Kein
                Methodencontainer. Keine Öko-Romantik. Keine Guru-Rolle. Keine
                beruhigende Oberfläche ohne Tragfähigkeit.
              </Typography>

              <Typography as="p" variant="body" gutter={false} tone="soft">
                Meta-Placeholder: Diese Fläche darf später schneiden, aber nicht
                nörgeln. Sie klärt, statt sich zu beschweren.
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
              Übergang
            </Typography>

            <Typography as="p" variant="body" gutter={false}>
              Meta-Placeholder: Diese Schlussbewegung muss später die Brücke zur
              nächsten Sektion schlagen. Wenn diese Einordnung trägt, öffnet
              sich nun, was Jonas konkret unterrichtet und in welchen Formen ein
              Einstieg grundsätzlich möglich ist.
            </Typography>
          </Stack>
        </Surface>
      </SectionStack>
    </Section>
  )
}
