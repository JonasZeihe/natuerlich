// src/features/site/sections/IntegrationSection.tsx
'use client'

import styled from 'styled-components'
import PathCards, { type PathCardItem } from '@/components/content/PathCards'
import SectionIntro from '@/components/content/SectionIntro'
import Section from '@/components/primitives/Section'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'

type Props = {
  onGoToNextStep: () => void
}

const PathwayShell = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3)};
`

const offerItems: readonly PathCardItem[] = [
  {
    label: 'Für dich',
    title: 'Wenn du selbst üben möchtest.',
    accent: 'axisDensity',
    children:
      'Für dich, wenn du einen Kurs suchst, wieder einsteigen willst oder persönliche Begleitung brauchst.',
    details: [
      {
        title: 'Yoga',
        text: 'Geführte Praxis mit Bewegung, Atem, Entspannung und Ruhe. Für Einsteiger, Wiedereinsteiger und Menschen, die regelmäßig üben möchten.',
        facts: [
          { label: 'Kursblock', value: 'ab 129 €' },
          { label: 'Einzelunterricht', value: 'ab 70 € pro Einheit' },
        ],
      },
      {
        title: 'Qigong',
        text: 'Ruhige, wiederholbare Bewegung für Sammlung, Aufrichtung, Atem und innere Ordnung.',
        facts: [
          { label: 'Kursblock', value: 'ab 129 €' },
          { label: 'Einzelunterricht', value: 'ab 70 € pro Einheit' },
        ],
      },
      {
        title: 'Taijiquan',
        text: 'Langsame, präzise Bewegung mit Stand, Gewichtsverlagerung, Richtung und Formbewusstsein.',
        facts: [
          { label: 'Kursblock', value: 'ab 129 €' },
          { label: 'Einzelunterricht', value: 'ab 70 € pro Einheit' },
        ],
      },
      {
        title: 'Einzelunterricht',
        text: 'Wenn du genauer arbeiten möchtest: an deinem Stand, deinem Thema, deinem Körper, deinem Einstieg oder deiner Praxis zuhause.',
        facts: [
          { label: 'Einzeltermin', value: 'ab 70 € pro Einheit' },
          { label: 'Begleitung', value: 'ab 250 € als Paket' },
        ],
      },
    ],
  },
  {
    label: 'Für euch',
    title: 'Wenn ihr als Gruppe üben möchtet.',
    tone: 'note',
    children:
      'Für private Gruppen, kleine Kreise oder Menschen, die jemanden für einen passenden Ort suchen.',
    details: [
      {
        title: 'Gruppenkurs vor Ort',
        text: 'Yoga, Qigong oder Taijiquan für kleine Gruppen in vorhandenen Räumen, zuhause, im Garten, im Wintergarten oder an einem anderen passenden Ort.',
        facts: [
          { label: 'Gruppentermin', value: 'ab 95 € pro Einheit' },
          { label: 'Kursblock', value: 'auf Anfrage' },
        ],
      },
      {
        title: 'Workshop',
        text: 'Ein kompakter Rahmen für Bewegung, Atem, Entspannung, Präsenz und ein gemeinsames Thema.',
        facts: [{ label: 'Workshop', value: 'ab 240 €' }],
      },
      {
        title: 'Outdoor-Format',
        text: 'Ein unkomplizierter Zugang draußen: klar geführt, gut machbar und ohne großen Aufbau.',
        facts: [{ label: 'Format', value: 'auf Anfrage' }],
      },
    ],
  },
  {
    label: 'Für Unternehmen',
    title: 'Wenn ein Team ein klares Gesundheitsformat braucht.',
    tone: 'field',
    accent: 'axisFlow',
    children:
      'Für Unternehmen, Einrichtungen und Teams, die Bewegung, Regulation und Präsenz in einen professionellen Rahmen bringen möchten.',
    details: [
      {
        title: 'Firmenmodul',
        text: 'Ein klarer Praxisblock für Fokus, Entspannung, Atem und alltagstaugliche Regulation.',
        facts: [{ label: 'Format', value: 'ab 160 €' }],
      },
      {
        title: 'Team-Workshop',
        text: 'Ein verdichtetes Format für Bewegung, Präsenz, Spannungsregulation und gemeinsame Erfahrung.',
        facts: [{ label: 'Workshop', value: 'ab 240 €' }],
      },
      {
        title: 'Gesundheitstag',
        text: 'Ein halber oder ganzer Tag mit stimmigem Ablauf, Praxisblöcken und gut dosierten Impulsen.',
        facts: [{ label: 'Tagesformat', value: 'ab 550 €' }],
      },
    ],
  },
]

const IntegrationSection = ({ onGoToNextStep }: Props) => (
  <Section
    id="integrieren"
    titleId="integrieren-title"
    ariaLabel="Angebote"
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
        mobile: {
          right: '-14rem',
          top: '3rem',
          width: '34rem',
        },
      },
      {
        name: '028_Dialogform',
        left: 'clamp(-10rem, -6vw, -3rem)',
        bottom: 'clamp(-9rem, -7vw, -3rem)',
        width: 'clamp(18rem, 31vw, 38rem)',
        presence: 'subtle',
        boundary: 'bleed',
        mobile: {
          left: '-12rem',
          bottom: '-7rem',
          width: '30rem',
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
        label="Angebote"
        titleId="integrieren-title"
        title="Was passt zu dir oder zu euch?"
        accent="axisDensity"
        max="56rem"
      >
        Du musst das nicht perfekt einordnen. Schau erst einmal, welcher Rahmen
        am nächsten liegt: du allein, ihr als Gruppe oder ein professionelles
        Format für ein Team.
      </SectionIntro>

      <PathwayShell>
        <Stack>
          <PathCards
            movement="integration"
            mobileAriaLabel="Angebote"
            columns={3}
            items={offerItems}
          />
        </Stack>
      </PathwayShell>
    </Surface>
  </Section>
)

export default IntegrationSection
