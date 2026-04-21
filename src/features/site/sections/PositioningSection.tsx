// src/features/site/sections/PositioningSection.tsx
'use client'

import styled from 'styled-components'
import Card from '@/components/primitives/Card'
import Section from '@/components/primitives/Section'
import Stack from '@/components/primitives/Stack'
import Typography from '@/design/typography'

const ContrastGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.25)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: ${({ theme }) => theme.spacing(1.5)};
  }
`

export default function PositioningSection() {
  return (
    <Section
      id="einordnung"
      titleId="einordnung-title"
      ariaLabel="Einordnung"
      container="default"
      variant="body"
      rhythm="default"
    >
      <Stack gap={1.5}>
        <Card tone="neutral" radius="large" bordered padding="lg">
          <Stack gap={1}>
            <Typography as="p" variant="caption" gutter={false} tone="soft">
              Einordnung
            </Typography>

            <Typography
              as="h2"
              variant="h2"
              gutter={false}
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
        </Card>

        <ContrastGrid>
          <Card tone="elevated" radius="large" bordered padding="md">
            <Stack gap={0.9}>
              <Typography as="p" variant="caption" gutter={false} tone="soft">
                Worum es hier geht
              </Typography>

              <Typography as="h3" variant="h3" gutter={false} tone="strong">
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
          </Card>

          <Card
            tone="accent"
            axis="axisClarity"
            radius="large"
            bordered
            padding="md"
          >
            <Stack gap={0.9}>
              <Typography as="p" variant="caption" gutter={false}>
                Worum es hier nicht geht
              </Typography>

              <Typography as="h3" variant="h3" gutter={false} tone="strong">
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
          </Card>
        </ContrastGrid>

        <Card tone="neutral" radius="large" bordered padding="md">
          <Stack gap={0.9}>
            <Typography as="p" variant="caption" gutter={false} tone="soft">
              Übergang
            </Typography>

            <Typography as="p" variant="body" gutter={false}>
              Meta-Placeholder: Diese Schlussbewegung muss später die Brücke zur
              nächsten Sektion schlagen. Wenn diese Einordnung trägt, öffnet
              sich nun, was Jonas konkret unterrichtet und in welchen Formen ein
              Einstieg grundsätzlich möglich ist.
            </Typography>
          </Stack>
        </Card>
      </Stack>
    </Section>
  )
}
