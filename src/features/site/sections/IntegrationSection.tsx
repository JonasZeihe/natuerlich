// src/features/site/sections/IntegrationSection.tsx
'use client'

import styled from 'styled-components'
import Button from '@/components/actions/Button'
import PathCards from '@/components/content/PathCards'
import SectionIntro from '@/components/content/SectionIntro'
import Grid from '@/components/primitives/Grid'
import Section from '@/components/primitives/Section'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import Typography from '@/design/typography'

type Props = {
  onGoToNextStep: () => void
}

const PathwayShell = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3)};
`

const IntegrationSection = ({ onGoToNextStep }: Props) => (
  <Section
    id="integrieren"
    titleId="integrieren-title"
    ariaLabel="Integrieren"
    container="wide"
    content="default"
    variant="body"
    rhythm="default"
    tone="relief"
    movement="integration"
    mix={['opening', 'flow']}
    assets={[
      {
        name: '019_Trägerform',
        right: 'clamp(-9rem, -6vw, -3rem)',
        top: 'clamp(2rem, 5vw, 7rem)',
        width: 'clamp(22rem, 38vw, 48rem)',
        presence: 'subtle',
        boundary: 'bleed',
        opacity: 0.22,
        mobile: {
          right: '-14rem',
          top: '3rem',
          width: '34rem',
          opacity: 0.14,
        },
      },
      {
        name: '028_Dialogform',
        left: 'clamp(-10rem, -6vw, -3rem)',
        bottom: 'clamp(-9rem, -7vw, -3rem)',
        width: 'clamp(18rem, 31vw, 38rem)',
        presence: 'subtle',
        boundary: 'bleed',
        opacity: 0.2,
        mobile: {
          left: '-12rem',
          bottom: '-7rem',
          width: '30rem',
          opacity: 0.12,
        },
      },
    ]}
  >
    <Surface
      tone="bare"
      movement="integration"
      radius="none"
      bordered={false}
      padding="lg"
      weight="quiet"
    >
      <SectionIntro
        label="Integrieren"
        titleId="integrieren-title"
        title="Jetzt wird aus Erfahrung ein möglicher Einstieg."
        accent="axisDensity"
        max="60rem"
      >
        Hier darf die Angebotslogik erscheinen, aber nicht als Katalog. Der
        Leser soll sich nicht durch Produkte wühlen, sondern erkennen: Welche
        Form passt zu meiner Lage, meinem Körper, meiner Gruppe, meinem Alltag?
      </SectionIntro>

      <PathwayShell>
        <PathCards
          movement="integration"
          mobileAriaLabel="Einstiegswege auswählen"
          items={[
            {
              label: 'Einstieg',
              title: 'Wenn du erst einmal herausfinden willst, was passt.',
              accent: 'axisOpening',
              asset: {
                name: '016_Schwelle',
                right: '-4rem',
                bottom: '-5rem',
                width: '11rem',
                presence: 'subtle',
                boundary: 'bleed',
                opacity: 0.18,
              },
              children:
                'Auftaktkurs, Baseline, Einführungsworkshop oder Grundpraxis. Nicht „kleiner Kurs“, sondern sinnvolle Schwelle.',
            },
            {
              label: 'Regelmäßigkeit',
              title: 'Wenn Wiederholung und Rhythmus tragen sollen.',
              accent: 'axisDensity',
              asset: {
                name: '019_Trägerform',
                right: '-5rem',
                bottom: '-5rem',
                width: '12rem',
                presence: 'subtle',
                boundary: 'bleed',
                opacity: 0.16,
              },
              children:
                'Kurs, Klasse, Aufbau, Vertiefung. Hier wird später sichtbar, wie Praxis wiederkehrend und lebendig werden kann.',
            },
            {
              label: 'Individuell',
              title: 'Wenn die Form genauer zu dir passen muss.',
              tone: 'field',
              accent: 'axisFlow',
              asset: {
                name: '028_Dialogform',
                right: '-5rem',
                top: '-5rem',
                width: '12rem',
                presence: 'subtle',
                boundary: 'bleed',
                opacity: 0.18,
              },
              children:
                'Einzelunterricht und Praxisbegleitung. Nicht Premium-Gehabe, sondern präziser Rahmen, wenn Gruppe oder Standard nicht reichen.',
            },
            {
              label: 'Gruppen und Firmen',
              title: 'Wenn ein Raum, Team oder Alltag einen Reset braucht.',
              tone: 'note',
              accent: 'axisOpening',
              asset: {
                name: '026_Neuöffnung',
                right: '-5rem',
                bottom: '-5rem',
                width: '12rem',
                presence: 'subtle',
                boundary: 'bleed',
                opacity: 0.18,
              },
              children:
                'Bewegte Pause, Workshop, Firmenmodul, private Gruppe. Klar professionell, aber ohne Corporate-Gesundheitsblabla.',
            },
          ]}
        />

        <Grid columns={2} gap={2} offset={2} switchAt="md">
          <Surface
            tone="note"
            movement="integration"
            radius="large"
            bordered
            padding="md"
          >
            <Stack gap={4}>
              <Typography
                as="p"
                variant="caption"
                gutter={false}
                accent="axisDensity"
              >
                Orientierung
              </Typography>

              <Typography
                as="h3"
                variant="h3"
                gutter={false}
                accent="axisDensity"
              >
                Du musst nicht wissen, welches Format richtig ist.
              </Typography>

              <Typography as="p" variant="body" gutter={false} tone="soft">
                Später kurze Antwortlogik: Einstiegslage, Erfahrung, Ziel,
                Gruppe, Ort, Preisrahmen. Hier entsteht die Entscheidungshilfe.
              </Typography>
            </Stack>
          </Surface>

          <Surface
            tone="note"
            movement="integration"
            radius="large"
            bordered
            padding="md"
          >
            <Stack gap={4}>
              <Typography
                as="p"
                variant="caption"
                gutter={false}
                accent="axisDensity"
              >
                Transparenz
              </Typography>

              <Typography
                as="h3"
                variant="h3"
                gutter={false}
                accent="axisDensity"
              >
                Preise und Rahmen gehören zur Glaubwürdigkeit.
              </Typography>

              <Typography as="p" variant="body" gutter={false} tone="soft">
                Später muss sichtbar werden, was ungefähr auf Menschen zukommt.
                Nicht verstecken, nicht überfrachten, nicht Tabellenästhetik als
                erstes Erlebnis.
              </Typography>
            </Stack>
          </Surface>
        </Grid>

        <Surface
          tone="field"
          movement="integration"
          radius="large"
          bordered
          padding="md"
          weight="steady"
        >
          <Stack gap={4}>
            <Typography
              as="p"
              variant="caption"
              gutter={false}
              accent="axisFlow"
            >
              Übergang
            </Typography>

            <Typography as="p" variant="body" gutter={false} measure="prose">
              Diese Section muss später den Sprung schaffen: genug Klarheit, um
              nicht im Nebel zu bleiben; genug Ruhe, um nicht wie ein Verkauf zu
              wirken.
            </Typography>

            <Button variant="ghost" onClick={onGoToNextStep}>
              Nächsten Schritt klären
            </Button>
          </Stack>
        </Surface>
      </PathwayShell>
    </Surface>
  </Section>
)

export default IntegrationSection
