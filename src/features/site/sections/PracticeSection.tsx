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

const SectionStack = styled(Stack)`
  gap: ${({ theme }) => theme.spacing(1.35)};
`

const IntroGrid = styled.div`
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
    gap: ${({ theme }) => theme.spacing(1.25)};
    align-items: stretch;
  }
`

const HeaderSurface = styled(Surface)`
  max-width: 58rem;
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
              Praxis
            </Typography>

            <Typography
              as="h2"
              variant="h2"
              gutter={false}
              accent="axisOpening"
              id="praxis-title"
            >
              Frage dieser Stelle: Was wird hier konkret getragen, wie hängt es
              zusammen und in welchen Formen ist ein Einstieg grundsätzlich
              möglich?
            </Typography>
          </Stack>
        </HeaderSurface>

        <IntroGrid>
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
                Ausfaltung
              </Typography>

              <Typography
                as="h3"
                variant="h3"
                gutter={false}
                accent="axisOpening"
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
        </IntroGrid>

        <PairGrid>
          <Surface
            tone="soft"
            energy="flow"
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
                Verwandtschaft
              </Typography>

              <Typography as="h3" variant="h3" gutter={false} accent="axisFlow">
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
            energy="density"
            radius="large"
            bordered
            padding="lg"
          >
            <Stack gap={0.82}>
              <Typography
                as="p"
                variant="caption"
                gutter={false}
                accent="axisDensity"
              >
                Formate
              </Typography>

              <Typography
                as="h3"
                variant="h3"
                gutter={false}
                accent="axisDensity"
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
      </SectionStack>
    </Section>
  )
}
