// src/features/site/sections/ContactSection.tsx
'use client'

import SectionRecipe from '@/components/patterns/sections/SectionRecipe'
import Stack from '@/components/primitives/Stack'
import Typography from '@/design/typography'

export default function ContactSection() {
  return (
    <SectionRecipe
      id="kontakt"
      title="Kontakt"
      titleId="kontakt-title"
      ariaLabel="Kontakt"
      variant="call"
      intro="Frage dieser Stelle: Wie komme ich jetzt tatsächlich in Kontakt oder in einen ersten passenden Schritt?"
    >
      <Stack gap={0.9}>
        <Typography as="p" variant="body" gutter={false}>
          Meta-Placeholder: Diese Stelle muss später den realen Eintritt
          ermöglichen, ohne Druck und ohne Unschärfe.
        </Typography>

        <Typography as="p" variant="body" gutter={false} tone="soft">
          Bild-Placeholder: Nur wenn es den Abschluss stärkt. Sonst klare
          Schlussfläche ohne dekorativen Ballast.
        </Typography>
      </Stack>
    </SectionRecipe>
  )
}
