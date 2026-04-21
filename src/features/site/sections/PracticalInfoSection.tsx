// src/features/site/sections/PracticalInfoSection.tsx
'use client'

import SectionRecipe from '@/components/patterns/sections/SectionRecipe'
import Stack from '@/components/primitives/Stack'
import Typography from '@/design/typography'

export default function PracticalInfoSection() {
  return (
    <SectionRecipe
      id="rahmen"
      title="Rahmen"
      titleId="rahmen-title"
      ariaLabel="Rahmen"
      variant="info"
      intro="Frage dieser Stelle: Was heißt das konkret für mich, wenn ich diese Arbeit ernsthaft prüfen will?"
    >
      <Stack gap={0.9}>
        <Typography as="p" variant="body" gutter={false}>
          Meta-Placeholder: Diese Stelle muss später Formate, Preise, Rahmen und
          FAQ so klären, dass aus Interesse praktische Orientierung wird.
        </Typography>

        <Typography as="p" variant="body" gutter={false} tone="soft">
          Bild-Placeholder: Wahrscheinlich keine Bildlast. Fokus auf Klarheit,
          Lesbarkeit und ruhige Struktur.
        </Typography>
      </Stack>
    </SectionRecipe>
  )
}
