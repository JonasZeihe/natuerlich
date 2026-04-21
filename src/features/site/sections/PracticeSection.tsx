// src/features/site/sections/PracticeSection.tsx
'use client'

import styled from 'styled-components'
import Button from '@/components/actions/Button'
import Section from '@/components/primitives/Section'
import Surface from '@/components/primitives/Surface'
import Stack from '@/components/primitives/Stack'
import Typography from '@/design/typography'

type Props = {
  onGoToFrame: () => void
}

const SplitGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.15)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: minmax(0, 1.14fr) minmax(0, 0.86fr);
    gap: ${({ theme }) => theme.spacing(1.3)};
    align-items: stretch;
  }
`

const PairGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.1)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: ${({ theme }) => theme.spacing(1.3)};
    align-items: stretch;
  }
`

export default function PracticeSection({ onGoToFrame }: Props) {
  return (
    <Section
      id="praxis"
      titleId="praxis-title"
      ariaLabel="Praxis"
      container="default"
      variant="body"
      rhythm="default"
      tone="expand"
    >
      <Stack gap={1.3}>
        <Stack gap={0.7}>
          <Typography
            as="p"
            variant="caption"
            gutter={false}
            accent="axisEnergy"
          >
            Praxis
          </Typography>

          <Typography
            as="h2"
            variant="h2"
            gutter={false}
            accent="axisEnergy"
            id="praxis-title"
          >
            Frage dieser Stelle: Was wird hier konkret getragen, wie hängt es
            zusammen und in welchen Formen ist ein Einstieg grundsätzlich
            möglich?
          </Typography>
        </Stack>

        <SplitGrid>
          <Surface
            tone="accent"
            accent="axisEnergy"
            radius="large"
            bordered
            padding="lg"
          >
            <Stack gap={0.9}>
              <Typography
                as="p"
                variant="caption"
                gutter={false}
                accent="axisEnergy"
              >
                Grundlage
              </Typography>

              <Typography
                as="h3"
                variant="h3"
                gutter={false}
                accent="axisEnergy"
              >
                Meta-Placeholder: Hier später die tragende Grundfläche von
                Meditation, Achtsamkeit und Entspannung als gemeinsamer Boden
                aller Praxisfelder.
              </Typography>

              <Typography as="p" variant="body" gutter={false}>
                Meta-Placeholder: Diese Fläche muss später lesbar machen, dass
                diese Kräfte nicht bloß Zusatz oder Nebenthema sind, sondern
                allem innewohnen und die Arbeit von innen her tragen.
              </Typography>

              <Typography as="p" variant="body" gutter={false} tone="soft">
                Bild-Placeholder: Eine ruhige, reale Situation oder eine stille
                Präsenzfläche, die Sammlung, Aufmerksamkeit und Wirklichkeit
                trägt. Keine Naturtapete. Keine Meditationssymbolik.
              </Typography>
            </Stack>
          </Surface>

          <Surface
            tone="panel"
            accent="axisResonance"
            radius="large"
            bordered
            padding="lg"
          >
            <Stack gap={0.82}>
              <Typography
                as="p"
                variant="caption"
                gutter={false}
                accent="axisResonance"
              >
                Ausfaltung
              </Typography>

              <Typography
                as="h3"
                variant="h3"
                gutter={false}
                accent="axisResonance"
              >
                Meta-Placeholder: Hier später Yoga als eigenständige Sparte mit
                klarem Charakter, eigener Ausrichtung und spürbarer Verbindung
                zur gemeinsamen Grundlage.
              </Typography>

              <Typography as="p" variant="body" gutter={false}>
                Meta-Placeholder: Diese Stelle muss später zeigen, was Yoga in
                Jonas&apos; Arbeit ausmacht, ohne es aus dem Gesamtfeld
                herauszulösen oder in Produktsprache zu zerlegen.
              </Typography>

              <Typography as="p" variant="body" gutter={false} tone="soft">
                Bild-Placeholder: Körperliche, klare, reale Praxisnähe. Keine
                Posen-Show. Keine Fitness- oder Wellness-Anmutung.
              </Typography>
            </Stack>
          </Surface>
        </SplitGrid>

        <PairGrid>
          <Surface
            tone="soft"
            accent="axisResonance"
            radius="large"
            bordered
            padding="lg"
          >
            <Stack gap={0.82}>
              <Typography
                as="p"
                variant="caption"
                gutter={false}
                accent="axisResonance"
              >
                Verwandtschaft
              </Typography>

              <Typography
                as="h3"
                variant="h3"
                gutter={false}
                accent="axisResonance"
              >
                Meta-Placeholder: Hier später Qigong und Tai Chi als nähere
                Verwandtschaft sichtbar machen: unterschieden, aber aus einer
                engeren Linie lesbar.
              </Typography>

              <Typography as="p" variant="body" gutter={false}>
                Meta-Placeholder: Diese Fläche muss später verständlich machen,
                warum Qigong und Tai Chi enger nebeneinander stehen als Yoga,
                ohne die Eigenheit der beiden Felder einzuebnen.
              </Typography>

              <Typography as="p" variant="body" gutter={false} tone="soft">
                Bild-Placeholder: Reale Praxisnähe oder Präsenzbild mit ruhiger
                Bewegung und Formbewusstsein. Keine Fernost-Deko. Keine Kulisse.
              </Typography>
            </Stack>
          </Surface>

          <Surface
            tone="panel"
            accent="axisClarity"
            radius="large"
            bordered
            padding="lg"
          >
            <Stack gap={0.82}>
              <Typography
                as="p"
                variant="caption"
                gutter={false}
                accent="axisClarity"
              >
                Formate
              </Typography>

              <Typography
                as="h3"
                variant="h3"
                gutter={false}
                accent="axisClarity"
              >
                Meta-Placeholder: Hier später die Grundformate knapp und klar
                benennen, in denen diese Arbeit grundsätzlich stattfindet.
              </Typography>

              <Typography as="p" variant="body" gutter={false}>
                Meta-Placeholder: Später hier lesbar machen, dass Einstieg über
                unterschiedliche Formen möglich ist, zum Beispiel Kurs, Klasse,
                Einzelsetting oder mobile Formate, ohne in eine Produktmatrix zu
                kippen.
              </Typography>

              <Typography as="p" variant="body" gutter={false} tone="soft">
                Meta-Placeholder: Diese Stelle soll Orientierung geben, nicht
                Vollständigkeit simulieren. Der konkrete Rahmen wird später im
                Abschnitt Rahmen geklärt.
              </Typography>

              <Button variant="ghost" onClick={onGoToFrame}>
                Meta-Placeholder: Zum Rahmen
              </Button>
            </Stack>
          </Surface>
        </PairGrid>
      </Stack>
    </Section>
  )
}
