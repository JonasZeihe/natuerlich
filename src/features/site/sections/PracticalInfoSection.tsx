// src/features/site/sections/PracticalInfoSection.tsx
'use client'

import styled from 'styled-components'
import Button from '@/components/actions/Button'
import Card from '@/components/primitives/Card'
import Section from '@/components/primitives/Section'
import Stack from '@/components/primitives/Stack'
import Typography from '@/design/typography'

const GroupGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.25)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: ${({ theme }) => theme.spacing(1.5)};
  }
`

const FaqGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.1)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: ${({ theme }) => theme.spacing(1.25)};
  }
`

type Props = {
  onGoToContact: () => void
}

export default function PracticalInfoSection({ onGoToContact }: Props) {
  return (
    <Section
      id="rahmen"
      titleId="rahmen-title"
      ariaLabel="Rahmen"
      container="default"
      variant="body"
      rhythm="default"
    >
      <Stack gap={1.5}>
        <Card tone="neutral" radius="large" bordered padding="lg">
          <Stack gap={1}>
            <Typography as="p" variant="caption" gutter={false} tone="soft">
              Rahmen
            </Typography>

            <Typography as="h2" variant="h2" gutter={false} id="rahmen-title">
              Meta-Placeholder: Hier später die klare Einordnung, wie das
              Angebot grundsätzlich aufgebaut ist und wie aus Interesse
              praktische Orientierung wird.
            </Typography>

            <Typography as="p" variant="body" gutter={false}>
              Meta-Placeholder: Diese Stelle muss später Formate, Preise, Rahmen
              und typische Einstiegslagen so ordnen, dass ein Mensch verstehen
              kann, was grundsätzlich möglich ist, ohne in Produktkatalog,
              Vollständigkeitsdrang oder Bürokratie zu kippen.
            </Typography>

            <Typography as="p" variant="body" gutter={false} tone="soft">
              Meta-Placeholder: Das Angebot wird später nicht zuerst nach
              Methode, sondern nach Funktion und Anschlusslage lesbar gemacht:
              Einstieg, regelmäßige Praxis, individuell, professionell,
              Vertiefung.
            </Typography>
          </Stack>
        </Card>

        <GroupGrid>
          <Card tone="elevated" radius="large" bordered padding="md">
            <Stack gap={0.9}>
              <Typography as="p" variant="caption" gutter={false} tone="soft">
                Einstieg und Basis
              </Typography>

              <Typography as="h3" variant="h3" gutter={false} tone="strong">
                Meta-Placeholder: Hier später niederschwellige Formate, über die
                ein erster Zugang sinnvoll möglich ist.
              </Typography>

              <Typography as="p" variant="body" gutter={false}>
                Meta-Placeholder: Auftaktkurs, Baseline, kompakte Grundpraxis,
                Einführungsformate oder andere erste Schwellen. Später hier
                lesbar machen, welche Formate eher Orientierung, Wiederholung
                oder erste Erfahrung tragen.
              </Typography>

              <Typography as="p" variant="body" gutter={false} tone="soft">
                Meta-Placeholder: Typische Dauer, grobe Laufzeit, typische
                Einstiegssituation und eine grobe Preisrichtung statt harter
                Detailauflistung.
              </Typography>
            </Stack>
          </Card>

          <Card tone="neutral" radius="large" bordered padding="md">
            <Stack gap={0.9}>
              <Typography as="p" variant="caption" gutter={false} tone="soft">
                Regelmäßige Praxis
              </Typography>

              <Typography as="h3" variant="h3" gutter={false} tone="strong">
                Meta-Placeholder: Hier später Kurs- und Klassenformate für
                Menschen, die kontinuierlicher einsteigen oder weitergehen
                wollen.
              </Typography>

              <Typography as="p" variant="body" gutter={false}>
                Meta-Placeholder: Später hier geordnet sichtbar machen, wie
                regelmäßige Kurse, Praxisklassen oder fortlaufende Formate
                grundsätzlich aufgebaut sind und worin sich Kurs, Klasse und
                andere wiederkehrende Angebote funktional unterscheiden.
              </Typography>

              <Typography as="p" variant="body" gutter={false} tone="soft">
                Meta-Placeholder: Orientierung über Verbindlichkeit, Rhythmus,
                typische Dauer und grobe Preislogik. Keine Produktmatrix. Keine
                Methodenliste ohne Zusammenhang.
              </Typography>
            </Stack>
          </Card>

          <Card tone="neutral" radius="large" bordered padding="md">
            <Stack gap={0.9}>
              <Typography as="p" variant="caption" gutter={false} tone="soft">
                Individuelle Wege
              </Typography>

              <Typography as="h3" variant="h3" gutter={false} tone="strong">
                Meta-Placeholder: Hier später Einzelsettings und persönliche
                Praxisbegleitung.
              </Typography>

              <Typography as="p" variant="body" gutter={false}>
                Meta-Placeholder: Später hier erklären, wann Einzelunterricht,
                individuelle Praxisbegleitung oder ein präziseres 1:1-Format
                sinnvoll ist, für wen das passt und wie sich das von
                Gruppenformaten unterscheidet.
              </Typography>

              <Typography as="p" variant="body" gutter={false} tone="soft">
                Meta-Placeholder: Grobe Preisarchitektur, typische Dauer und
                Funktion der Formate. Nicht luxuriös inszenieren. Nicht
                verkaufen. Nur sauber einordnen.
              </Typography>
            </Stack>
          </Card>

          <Card tone="elevated" radius="large" bordered padding="md">
            <Stack gap={0.9}>
              <Typography as="p" variant="caption" gutter={false} tone="soft">
                Professionell und extern
              </Typography>

              <Typography as="h3" variant="h3" gutter={false} tone="strong">
                Meta-Placeholder: Hier später Firmen-, Team- oder andere
                professionelle Formate lesbar machen.
              </Typography>

              <Typography as="p" variant="body" gutter={false}>
                Meta-Placeholder: Bewegte Pause, Reset-Formate, Workshops,
                Gesundheits- oder Teamkontexte. Später hier sichtbar machen,
                dass diese Angebote einer eigenen professionellen Logik folgen
                und nicht einfach Gruppenkurse in anderem Gewand sind.
              </Typography>

              <Typography as="p" variant="body" gutter={false} tone="soft">
                Meta-Placeholder: Typische Einsatzformen, kompakte
                Verständlichkeit und eigene Preislogik. Kein BGM-Sprech. Keine
                Business-Fassade.
              </Typography>
            </Stack>
          </Card>
        </GroupGrid>

        <Card
          tone="accent"
          axis="axisClarity"
          radius="large"
          bordered
          padding="md"
        >
          <Stack gap={0.9}>
            <Typography as="p" variant="caption" gutter={false}>
              Funktionslogik
            </Typography>

            <Typography as="h3" variant="h3" gutter={false} tone="strong">
              Meta-Placeholder: Hier später die innere Ordnung des Angebots
              knapp erklären.
            </Typography>

            <Typography as="p" variant="body" gutter={false}>
              Meta-Placeholder: Später hier lesbar machen, dass Angebote nach
              Funktion unterschieden werden können: Einstieg und Zugang, Aufbau
              und Lernen, regelmäßige Praxis, individuelle Begleitung,
              professionelle Formate und Vertiefung.
            </Typography>

            <Typography as="p" variant="body" gutter={false} tone="soft">
              Meta-Placeholder: Diese Fläche ist kein Kategorienfriedhof,
              sondern der ruhige Schlüssel, mit dem Besucher die Angebotswelt
              später besser lesen können.
            </Typography>
          </Stack>
        </Card>

        <FaqGrid>
          <Card tone="neutral" radius="large" bordered padding="md">
            <Stack gap={0.75}>
              <Typography as="p" variant="caption" gutter={false} tone="soft">
                FAQ
              </Typography>

              <Typography as="h3" variant="h3" gutter={false}>
                Meta-Placeholder: Welche Form ist für einen Einstieg sinnvoll?
              </Typography>

              <Typography as="p" variant="body" gutter={false} tone="soft">
                Meta-Placeholder: Später hier eine ruhige, entlastende Antwort
                mit Bezug auf unterschiedliche Einstiegslagen statt pauschaler
                Empfehlung.
              </Typography>
            </Stack>
          </Card>

          <Card tone="neutral" radius="large" bordered padding="md">
            <Stack gap={0.75}>
              <Typography as="p" variant="caption" gutter={false} tone="soft">
                FAQ
              </Typography>

              <Typography as="h3" variant="h3" gutter={false}>
                Meta-Placeholder: Brauche ich Vorerfahrung oder bestimmte
                Voraussetzungen?
              </Typography>

              <Typography as="p" variant="body" gutter={false} tone="soft">
                Meta-Placeholder: Später hier klären, wie zugänglich die Arbeit
                grundsätzlich ist und wo Unterschiede zwischen Formaten relevant
                werden.
              </Typography>
            </Stack>
          </Card>

          <Card tone="neutral" radius="large" bordered padding="md">
            <Stack gap={0.75}>
              <Typography as="p" variant="caption" gutter={false} tone="soft">
                FAQ
              </Typography>

              <Typography as="h3" variant="h3" gutter={false}>
                Meta-Placeholder: Was ist online, vor Ort, mobil oder im
                Gruppenrahmen möglich?
              </Typography>

              <Typography as="p" variant="body" gutter={false} tone="soft">
                Meta-Placeholder: Später hier Settings und Rahmen so klären,
                dass praktische Unsicherheit sinkt, ohne in Logistiktext zu
                kippen.
              </Typography>
            </Stack>
          </Card>

          <Card tone="neutral" radius="large" bordered padding="md">
            <Stack gap={0.75}>
              <Typography as="p" variant="caption" gutter={false} tone="soft">
                FAQ
              </Typography>

              <Typography as="h3" variant="h3" gutter={false}>
                Meta-Placeholder: Wie transparent sind Preise, Laufzeiten und
                Verbindlichkeit?
              </Typography>

              <Typography as="p" variant="body" gutter={false} tone="soft">
                Meta-Placeholder: Später hier klar machen, dass Preise, Formate,
                Laufzeiten und Rahmen nicht im Nebel bleiben, sondern Teil der
                Glaubwürdigkeit sind.
              </Typography>
            </Stack>
          </Card>
        </FaqGrid>

        <Card tone="neutral" radius="large" bordered padding="md">
          <Stack gap={0.9}>
            <Typography as="p" variant="caption" gutter={false} tone="soft">
              Nächster Schritt
            </Typography>

            <Typography as="p" variant="body" gutter={false}>
              Meta-Placeholder: Diese Schlussbewegung muss später den Übergang
              in Kontakt oder Anfrage tragen. Wenn noch unklar ist, welches
              Format passt, soll der nächste Schritt nicht Druck erzeugen,
              sondern saubere Anschlussfähigkeit.
            </Typography>

            <Button variant="ghost" onClick={onGoToContact}>
              Meta-Placeholder: Kontakt und Einstieg
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Section>
  )
}
