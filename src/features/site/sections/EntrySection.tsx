// src/features/site/sections/EntrySection.tsx
'use client'

import styled from 'styled-components'
import Button from '@/components/actions/Button'
import Section from '@/components/primitives/Section'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import Typography from '@/design/typography'

type Props = {
  onGoToPractice: () => void
  onGoToFrame: () => void
}

const EntryGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.06fr) minmax(0, 0.94fr);
  gap: ${({ theme }) => theme.spacing(1.5)};
  align-items: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing(1.05)};
  }
`

const HeadSurface = styled(Surface)`
  height: 100%;
`

const HeadStack = styled(Stack)`
  min-width: 0;
  min-height: 100%;
  justify-content: center;
`

const ActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.8)};
  margin-top: ${({ theme }) => theme.spacingHalf(0.6)};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    align-items: stretch;

    > * {
      flex: 1 1 auto;
    }
  }
`

const MediaSurface = styled(Surface)`
  height: 100%;
`

const MediaShell = styled(Stack)`
  height: 100%;
  justify-content: space-between;
  min-height: 0;
  padding: clamp(1rem, 2vw, 1.35rem);
`

const MediaBand = styled(Surface)`
  margin-top: auto;
`

const MediaFrame = styled.div`
  width: 100%;
  min-height: 100%;
  height: 100%;
  border-radius: inherit;

  .inner {
    position: relative;
    width: 100%;
    min-height: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: inherit;
    display: flex;
    align-items: stretch;
    aspect-ratio: 4 / 5;

    > * {
      width: 100%;
      min-height: 100%;
    }
  }
`

export default function EntrySection({ onGoToPractice, onGoToFrame }: Props) {
  return (
    <Section
      id="einstieg"
      container="wide"
      padY
      variant="intro"
      tone="opening"
      mix={['opening', 'tension']}
      ariaLabel="Einstieg"
      titleId="einstieg-title"
    >
      <EntryGrid>
        <HeadSurface
          tone="soft"
          mix={['opening', 'tension']}
          radius="large"
          bordered
          padding="lg"
          weight="steady"
        >
          <HeadStack gap={1}>
            <Typography
              as="p"
              variant="caption"
              gutter={false}
              tone="soft"
              measure="wide"
            >
              Meta-Placeholder: Hier später eine knappe erste Setzung, die Jonas
              als Lehrer sofort lesbar macht.
            </Typography>

            <Stack gap={0.7}>
              <Typography
                as="h1"
                variant="h1"
                id="einstieg-title"
                cadence="dense"
                measure="title"
                gutter={false}
                tone="strong"
              >
                Meta-Placeholder: Hier später die eigentliche erste
                Hauptaussage, die Jonas als Lehrer vor Methode, Stimmung und
                Kulisse setzt.
              </Typography>

              <Typography
                as="p"
                variant="body"
                gutter={false}
                tone="soft"
                cadence="open"
                measure="prose"
              >
                Meta-Placeholder: Hier später eine ruhige, präzise Verdichtung,
                die klar macht, warum diese Arbeit nicht nach Wellness,
                Kurscontainer oder Standard-Achtsamkeitsseite klingt.
              </Typography>
            </Stack>

            <ActionsRow>
              <Button variant="primary" onClick={onGoToPractice}>
                Meta-Placeholder: Zur Praxis
              </Button>
              <Button variant="ghost" onClick={onGoToFrame}>
                Meta-Placeholder: Rahmen ansehen
              </Button>
            </ActionsRow>
          </HeadStack>
        </HeadSurface>

        <MediaSurface
          tone="panel"
          mix={['opening', 'tension']}
          radius="large"
          bordered
          padding="none"
          weight="steady"
        >
          <MediaFrame>
            <div className="inner">
              <MediaShell gap={1}>
                <Stack gap={0.78}>
                  <Typography
                    as="p"
                    variant="caption"
                    gutter={false}
                    accent="axisTension"
                  >
                    Bild-Placeholder
                  </Typography>

                  <Typography
                    as="p"
                    variant="body"
                    gutter={false}
                    accent="axisTension"
                  >
                    Meta-Placeholder: Präsenzbild von Jonas oder eine
                    Bildsituation, die Haltung, Körperlichkeit und Wirklichkeit
                    trägt.
                  </Typography>
                </Stack>

                <MediaBand
                  tone="soft"
                  mix={['opening', 'tension']}
                  radius="large"
                  bordered
                  padding="md"
                  weight="steady"
                >
                  <Stack gap={0.48}>
                    <Typography
                      as="p"
                      variant="body"
                      gutter={false}
                      accent="axisTension"
                    >
                      Meta-Placeholder: Diese Medienfläche soll später nicht
                      Kulisse sein, sondern eine frühe Form von Lehrerpräsenz.
                    </Typography>

                    <Typography
                      as="p"
                      variant="body"
                      gutter={false}
                      tone="soft"
                    >
                      Keine Naturtapete. Keine Symbolik. Keine
                      Wellness-Anmutung.
                    </Typography>
                  </Stack>
                </MediaBand>
              </MediaShell>
            </div>
          </MediaFrame>
        </MediaSurface>
      </EntryGrid>
    </Section>
  )
}
