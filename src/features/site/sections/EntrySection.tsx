// src/features/site/sections/EntrySection.tsx
'use client'

import Button from '@/components/actions/Button'
import HeroRecipe from '@/components/patterns/hero/HeroRecipe'
import Stack from '@/components/primitives/Stack'
import Typography from '@/design/typography'

type Props = {
  onGoToPractice: () => void
  onGoToFrame: () => void
}

export default function EntrySection({ onGoToPractice, onGoToFrame }: Props) {
  return (
    <HeroRecipe
      container="wide"
      isPageHeader
      variant="split"
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
        <Stack
          gap={0.7}
          style={{
            height: '100%',
            justifyContent: 'flex-end',
            padding: 'clamp(1rem, 2vw, 1.5rem)',
          }}
          role="img"
          aria-label="Meta-Placeholder für das Einstiegsbild"
        >
          <Typography as="p" variant="caption" gutter={false} tone="soft">
            Bild-Placeholder
          </Typography>
          <Typography as="p" variant="body" gutter={false} tone="strong">
            Meta-Placeholder: Präsenzbild von Jonas oder eine Bildsituation, die
            Haltung, Körperlichkeit und Wirklichkeit trägt.
          </Typography>
          <Typography as="p" variant="body" gutter={false} tone="soft">
            Keine Naturtapete. Keine Symbolik. Keine Wellness-Anmutung.
          </Typography>
        </Stack>
      }
    />
  )
}
