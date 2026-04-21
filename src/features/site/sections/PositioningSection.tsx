// src/features/site/sections/PositioningSection.tsx
'use client'

import SectionRecipe from '@/components/patterns/sections/SectionRecipe'
import Stack from '@/components/primitives/Stack'
import Typography from '@/design/typography'

export default function PositioningSection() {
  return (
    <SectionRecipe
      id="einordnung"
      title="Einordnung"
      titleId="einordnung-title"
      ariaLabel="Einordnung"
      variant="info"
      intro="Frage dieser Stelle: Was ist das hier für eine Art von Arbeit und was ist es bewusst nicht?"
    >
      <Stack gap={0.9}>
        <Typography as="p" variant="body" gutter={false}>
          Meta-Placeholder: Diese Stelle muss später das Feld klären und zeigen,
          worum es hier geht und wovon sich diese Arbeit ausdrücklich
          unterscheidet.
        </Typography>

        <Typography as="p" variant="body" gutter={false} tone="soft">
          Bild-Placeholder: Nur falls nötig. Eher strukturierende oder
          atmosphärische Ruhe als illustrative Dekoration.
        </Typography>
      </Stack>
    </SectionRecipe>
  )
}
