// src/features/site/sections/EntrySection.tsx
'use client'

import styled from 'styled-components'
import Button from '@/components/actions/Button'
import LeadBlock from '@/components/compositions/lead/LeadBlock'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import Typography from '@/design/typography'

type Props = {
  onGoToPractice: () => void
  onGoToFrame: () => void
}

const MediaShell = styled(Stack)`
  height: 100%;
  justify-content: space-between;
  min-height: 0;
  padding: clamp(1rem, 2vw, 1.35rem);
`

const MediaBand = styled(Surface)`
  margin-top: auto;
`

export default function EntrySection({ onGoToPractice, onGoToFrame }: Props) {
  return (
    <LeadBlock
      container="wide"
      isPageHeader
      variant="split"
      tone="opening"
      accent="axisEnergy"
      mediaTone="panel"
      titleId="einstieg-title"
      kicker="Meta-Placeholder: Hier später eine knappe erste Setzung, die Jonas als Lehrer sofort lesbar macht."
      title="Meta-Placeholder: Hier später die eigentliche erste Hauptaussage, die Jonas als Lehrer vor Methode, Stimmung und Kulisse setzt."
      lead="Meta-Placeholder: Hier später eine ruhige, präzise Verdichtung, die klar macht, warum diese Arbeit nicht nach Wellness, Kurscontainer oder Standard-Achtsamkeitsseite klingt."
      actions={
        <>
          <Button variant="primary" onClick={onGoToPractice}>
            Meta-Placeholder: Zur Praxis
          </Button>
          <Button variant="ghost" onClick={onGoToFrame}>
            Meta-Placeholder: Rahmen ansehen
          </Button>
        </>
      }
      mediaAspect="4 / 5"
      media={
        <MediaShell gap={1}>
          <Stack gap={0.78}>
            <Typography
              as="p"
              variant="caption"
              gutter={false}
              accent="axisClarity"
            >
              Bild-Placeholder
            </Typography>

            <Typography
              as="p"
              variant="body"
              gutter={false}
              accent="axisClarity"
            >
              Meta-Placeholder: Präsenzbild von Jonas oder eine Bildsituation,
              die Haltung, Körperlichkeit und Wirklichkeit trägt.
            </Typography>
          </Stack>

          <MediaBand
            tone="soft"
            accent="axisClarity"
            radius="large"
            bordered
            padding="md"
          >
            <Stack gap={0.48}>
              <Typography
                as="p"
                variant="body"
                gutter={false}
                accent="axisClarity"
              >
                Meta-Placeholder: Diese Medienfläche soll später nicht Kulisse
                sein, sondern eine frühe Form von Lehrerpräsenz.
              </Typography>

              <Typography as="p" variant="body" gutter={false} tone="soft">
                Keine Naturtapete. Keine Symbolik. Keine Wellness-Anmutung.
              </Typography>
            </Stack>
          </MediaBand>
        </MediaShell>
      }
    />
  )
}
