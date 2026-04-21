// src/features/site/sections/TeacherSection.tsx
'use client'

import SectionRecipe from '@/components/patterns/sections/SectionRecipe'
import Stack from '@/components/primitives/Stack'
import Typography from '@/design/typography'

export default function TeacherSection() {
  return (
    <SectionRecipe
      id="lehrer"
      title="Lehrer"
      titleId="lehrer-title"
      ariaLabel="Lehrer"
      variant="info"
      intro="Frage dieser Stelle: Warum trägt gerade diese Person diese Arbeit glaubwürdig?"
    >
      <Stack gap={0.9}>
        <Typography as="p" variant="body" gutter={false}>
          Meta-Placeholder: Diese Stelle muss später Jonas als glaubwürdigen
          Lehrer verdichten: Haltung, Erfahrung, Reibung, Ausbildung,
          Unterschied.
        </Typography>

        <Typography as="p" variant="body" gutter={false} tone="soft">
          Bild-Placeholder: Ernsthafte, klare Bildsprache mit realer Präsenz.
          Keine Heldenpose. Keine Guru-Aufladung.
        </Typography>
      </Stack>
    </SectionRecipe>
  )
}
