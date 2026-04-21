// src/features/site/sections/ContactSection.tsx
'use client'

import styled from 'styled-components'
import Section from '@/components/primitives/Section'
import Surface from '@/components/primitives/Surface'
import Stack from '@/components/primitives/Stack'
import Typography from '@/design/typography'

const DetailGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.05)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: ${({ theme }) => theme.spacing(1.15)};
    align-items: stretch;
  }
`

export default function ContactSection() {
  return (
    <Section
      id="kontakt"
      titleId="kontakt-title"
      ariaLabel="Kontakt"
      container="default"
      variant="outro"
      rhythm="compact"
      tone="arrival"
    >
      <Stack gap={1.15}>
        <Surface
          tone="panel"
          accent="axisEnergy"
          radius="large"
          bordered
          padding="lg"
        >
          <Stack gap={0.82}>
            <Typography
              as="p"
              variant="caption"
              gutter={false}
              accent="axisEnergy"
            >
              Kontakt
            </Typography>

            <Typography
              as="h2"
              variant="h2"
              gutter={false}
              accent="axisEnergy"
              id="kontakt-title"
            >
              Meta-Placeholder: Hier später die klare Schlusssetzung, dass ein
              realer Eintritt jetzt möglich ist, ohne Druck und ohne Unschärfe.
            </Typography>

            <Typography as="p" variant="body" gutter={false}>
              Meta-Placeholder: Diese Stelle muss später so formuliert sein,
              dass ein Mensch nach allem davor nicht weiter suchen muss, sondern
              versteht, wie ein erster passender Schritt konkret aussehen kann.
            </Typography>

            <Typography as="p" variant="body" gutter={false} tone="soft">
              Meta-Placeholder: Kein Verkaufsdruck. Keine künstliche
              Dringlichkeit. Keine Schlussromantik. Nur klare
              Anschlussfähigkeit.
            </Typography>
          </Stack>
        </Surface>

        <DetailGrid>
          <Surface
            tone="soft"
            accent="axisClarity"
            radius="large"
            bordered
            padding="md"
          >
            <Stack gap={0.78}>
              <Typography
                as="p"
                variant="caption"
                gutter={false}
                accent="axisClarity"
              >
                Kontaktweg
              </Typography>

              <Typography
                as="h3"
                variant="h3"
                gutter={false}
                accent="axisClarity"
              >
                Meta-Placeholder: Hier später der konkrete Weg der
                Kontaktaufnahme.
              </Typography>

              <Typography as="p" variant="body" gutter={false}>
                Meta-Placeholder: Später hier klar benennen, wie Jonas
                erreichbar ist und welcher Kontaktweg für einen ersten Schritt
                gedacht ist.
              </Typography>

              <Typography as="p" variant="body" gutter={false} tone="soft">
                Meta-Placeholder: Diese Stelle muss später so konkret sein, dass
                kein Rätsel bleibt, aber auch keine technische Formularästhetik
                entsteht.
              </Typography>
            </Stack>
          </Surface>

          <Surface
            tone="soft"
            accent="axisResonance"
            radius="large"
            bordered
            padding="md"
          >
            <Stack gap={0.78}>
              <Typography
                as="p"
                variant="caption"
                gutter={false}
                accent="axisResonance"
              >
                Erster Schritt
              </Typography>

              <Typography
                as="h3"
                variant="h3"
                gutter={false}
                accent="axisResonance"
              >
                Meta-Placeholder: Hier später Orientierung für Menschen, die
                noch nicht genau wissen, welches Format passt.
              </Typography>

              <Typography as="p" variant="body" gutter={false}>
                Meta-Placeholder: Später hier lesbar machen, dass man sich auch
                dann melden kann, wenn die passende Form noch nicht ganz klar
                ist und erst gemeinsam eingeordnet werden muss.
              </Typography>

              <Typography as="p" variant="body" gutter={false} tone="soft">
                Meta-Placeholder: Diese Passage entlastet. Sie nimmt
                Unsicherheit ernst, ohne alles weich oder beliebig zu machen.
              </Typography>
            </Stack>
          </Surface>
        </DetailGrid>

        <Surface
          tone="soft"
          accent="axisResonance"
          radius="large"
          bordered
          padding="md"
        >
          <Stack gap={0.75}>
            <Typography
              as="p"
              variant="caption"
              gutter={false}
              accent="axisResonance"
            >
              Was dann geschieht
            </Typography>

            <Typography as="p" variant="body" gutter={false}>
              Meta-Placeholder: Hier später kurz und ruhig beschreiben, wie es
              nach einer Nachricht oder Anfrage weitergeht, damit der Eintritt
              nicht im Ungefähren bleibt.
            </Typography>

            <Typography as="p" variant="body" gutter={false} tone="soft">
              Meta-Placeholder: Kein Bild-Placeholder nötig. Diese Schlussfläche
              soll aus Klarheit, Ruhe und Würde tragen.
            </Typography>
          </Stack>
        </Surface>
      </Stack>
    </Section>
  )
}
