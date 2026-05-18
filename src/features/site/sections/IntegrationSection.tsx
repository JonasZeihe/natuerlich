// src/features/site/sections/IntegrationSection.tsx
'use client'

import styled from 'styled-components'
import Button from '@/components/actions/Button'
import PathCards, { type PathCardItem } from '@/components/content/PathCards'
import SectionIntro from '@/components/content/SectionIntro'
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

const Footnote = styled.div`
  max-width: 60rem;
`

const offerItems: readonly PathCardItem[] = [
  {
    label: 'Für dich',
    title: 'Wenn du selbst üben möchtest.',
    accent: 'axisDensity',
    children:
      'Für Einzelpersonen, die Yoga, Qigong, Taijiquan oder einen klar geführten Einzelunterricht suchen.',
    details: [
      {
        title: 'Yoga',
        text: 'Klar geführte Praxis mit Bewegung, Atem und Ruhe. Geeignet für Einsteiger, Wiedereinsteiger und alle, die regelmäßig üben wollen.',
        facts: [
          { label: 'Kursblock', value: 'ab 129 €' },
          { label: 'Einzelunterricht', value: 'ab 70 € pro Einheit' },
        ],
      },
      {
        title: 'Qigong',
        text: 'Ruhige, konzentrierte Bewegung für Sammlung, Aufrichtung und Fluss. Geeignet für regelmäßige Praxis und einen klaren Einstieg.',
        facts: [
          { label: 'Kursblock', value: 'ab 129 €' },
          { label: 'Einzelunterricht', value: 'ab 70 € pro Einheit' },
        ],
      },
      {
        title: 'Taijiquan',
        text: 'Präzise Bewegung mit Stand, Übergängen und Formprinzipien. Für Menschen, die ruhig und gleichzeitig klar arbeiten wollen.',
        facts: [
          { label: 'Kursblock', value: 'ab 129 €' },
          { label: 'Einzelunterricht', value: 'ab 70 € pro Einheit' },
        ],
      },
      {
        title: 'Einzelunterricht',
        text: 'Wenn du ein persönliches Format suchst, das genau auf deinen Stand, dein Thema oder dein Ziel abgestimmt ist.',
        facts: [
          { label: 'Einzeltermin', value: 'ab 70 € pro Einheit' },
          { label: 'Begleitung', value: 'ab 250 € als Paket' },
        ],
      },
    ],
  },
  {
    label: 'Für Gruppen',
    title: 'Wenn ihr als Gruppe etwas buchen möchtet.',
    tone: 'note',
    children:
      'Für private Gruppen, kleine Teams oder bestehende Kreise mit eigenen Räumlichkeiten oder einem passenden Ort vor Ort.',
    details: [
      {
        title: 'Gruppenkurs vor Ort',
        text: 'Yoga, Qigong oder Taijiquan für kleine Gruppen in vorhandenen Räumen, zuhause oder an einem passenden Ort.',
        facts: [
          { label: 'Gruppentermin', value: 'ab 95 € pro Einheit' },
          { label: 'Kursblock', value: 'auf Anfrage' },
        ],
      },
      {
        title: 'Workshop',
        text: 'Ein kompaktes Format für Gruppen, die einen klaren thematischen Rahmen möchten: Bewegung, Atem, Präsenz und Spannungsregulation.',
        facts: [{ label: 'Workshop', value: 'ab 240 €' }],
      },
      {
        title: 'Outdoor-Format',
        text: 'Einfach, direkt und gut geeignet für Gruppen, die draußen üben oder einen offenen Zugang wählen möchten.',
        facts: [{ label: 'Format', value: 'auf Anfrage' }],
      },
    ],
  },
  {
    label: 'Für Unternehmen',
    title: 'Wenn ein Team oder eine Einrichtung ein gutes Format braucht.',
    tone: 'field',
    accent: 'axisFlow',
    children:
      'Für Unternehmen, Einrichtungen und Teams, die ein professionelles Angebot für Bewegung, Regulation und Präsenz suchen.',
    details: [
      {
        title: 'Firmenmodul',
        text: 'Ein kompaktes Format für Fokus, Regulation und alltagstaugliche Praxis. Klar, direkt und ohne unnötigen Überbau.',
        facts: [{ label: 'Format', value: 'ab 160 €' }],
      },
      {
        title: 'Team-Workshop',
        text: 'Ein verdichtetes Format für Bewegung, Atem, Präsenz und Spannungsregulation in einem professionellen Rahmen.',
        facts: [{ label: 'Workshop', value: 'ab 240 €' }],
      },
      {
        title: 'Gesundheitstag',
        text: 'Ein klarer Rahmen für halbe oder ganze Tage mit Praxisblöcken, Workshops und einem stimmigen Ablauf.',
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
        title="Einfach, klar und direkt buchbar."
        accent="axisDensity"
        max="56rem"
      >
        Ob für dich selbst, für eine Gruppe oder für ein Unternehmen: Hier
        findest du die wichtigsten Formate auf einen Blick.
      </SectionIntro>

      <PathwayShell>
        <Stack>
          <PathCards
            movement="integration"
            mobileAriaLabel="Angebotswege"
            columns={3}
            items={offerItems}
          />
        </Stack>
      </PathwayShell>
    </Surface>
  </Section>
)

export default IntegrationSection
