// src/features/site/sections/IntegrationSection.tsx
'use client'

import styled from 'styled-components'
import Headline from '@/components/content/Headline'
import PathCards, { type PathCardItem } from '@/components/content/PathCards'
import Section from '@/components/primitives/Section'
import Surface from '@/components/primitives/Surface'
import HighlightText from '@/components/utilities/HighlightText'

type Props = {
  onGoToNextStep: () => void
}

const offerItems: readonly PathCardItem[] = [
  {
    title: 'Grundlage',
    line: 'Atem, Entspannung, Achtsamkeit.',
    text: (
      <>
        Der beste Anfang, wenn noch nicht klar ist, ob es später{' '}
        <HighlightText accent="axisOpening">Qigong</HighlightText>,{' '}
        <HighlightText accent="axisFlow">Yoga</HighlightText> oder{' '}
        <HighlightText accent="axisTension">Taijiquan</HighlightText> werden
        soll.
      </>
    ),
    individual: {
      format: 'Einzeltraining',
      price: 'ab 70 € pro Einheit',
      text: 'Für persönlichen Einstieg, Sortierung, Stressregulation oder eine ruhige eigene Praxis. Kein Kursersatz, sondern gezielte Begleitung.',
    },
    group: {
      format: 'Auftaktkurs',
      duration: '6–8 Termine',
      price: 'ab 690 € pro Kursblock',
      text: 'Ein gemeinsamer Einstieg in Atem, Entspannung, Body Scan, Achtsamkeit und einfache Selbstregulation.',
      classText:
        'Daraus kann eine ruhige fortlaufende Praxis entstehen, wenn die Gruppe weiter üben möchte.',
      classPrice: 'fortlaufend ab 110 € pro Termin',
    },
    company: {
      format: 'BGM-Impuls oder Workshop',
      duration: '60–180 Minuten',
      price: 'ab 390 €',
      text: 'Stressregulation, Entspannung und alltagstaugliche Körperwahrnehmung für Teams. Als Einzeltermin, Workshop oder kleine Reihe möglich.',
    },
  },
  {
    title: 'Qigong',
    line: 'Ruhig beginnen, später tiefer gehen.',
    text: (
      <>
        Oft der beste bewegte Einstieg:{' '}
        <HighlightText accent="axisOpening">Atem</HighlightText>, Stand,
        Aufmerksamkeit und einfache Bewegung kommen zusammen.
      </>
    ),
    individual: {
      format: 'Einzeltraining',
      price: 'ab 70 € pro Einheit',
      text: 'Für Aufbau, Korrektur und Vertiefung. Sinnvoll, wenn du genau, ruhig und persönlich lernen möchtest.',
    },
    group: {
      format: 'Qigong-Einsteigerkurs',
      duration: '10 Termine',
      price: 'ab 1.100 € pro Kursblock',
      text: (
        <>
          Ein klarer Kursblock mit Acht Brokaten oder einfachen Übungen aus dem{' '}
          <HighlightText accent="axisOpening">
            Daoyin Yangsheng Gong
          </HighlightText>
          .
        </>
      ),
      classText:
        'Nach dem Kurs kann daraus eine fortlaufende Klasse entstehen: Wiederholung, Varianten, Wahrnehmung und später tiefere Formen.',
      classPrice: 'fortlaufend ab 110 € pro Termin',
    },
    company: {
      format: 'BGM-Workshop',
      duration: '90–180 Minuten',
      price: 'ab 490 €',
      text: 'Ruhige, körperlich zugängliche Praxis für Teams. Gut als Workshop, Gesundheitstag oder kurze Kursreihe.',
    },
  },
  {
    title: 'Yoga',
    line: 'Ein klarer Weg in vollständige Praxis.',
    text: (
      <>
        Yoga ist zugänglich, aber größer als ein kurzer Einstieg. Haltung, Atem
        und <HighlightText accent="axisFlow">Entspannung</HighlightText> greifen
        ineinander.
      </>
    ),
    individual: {
      format: 'Einzeltraining',
      price: 'ab 70 € pro Einheit',
      text: 'Für persönlichen Aufbau, Anpassung und saubere Grundlagen. Besonders sinnvoll, wenn der Körper eigene Rücksicht braucht.',
    },
    group: {
      format: 'Yoga-Kursblock',
      duration: '14–16 Termine',
      price: 'ab 1.680 € pro Kursblock',
      text: 'Ein ruhiger Aufbau in eine vollständige Hatha-Yoga-Praxis mit Asana, Atem, Konzentration und Entspannung.',
      classText:
        'Wenn die Grundlagen sitzen, kann daraus eine regelmäßige Yogaklasse mit vollständigem Übungsrahmen entstehen.',
      classPrice: 'fortlaufend ab 120 € pro Termin',
    },
    company: {
      format: 'Workshop oder Kursreihe',
      duration: '90–180 Minuten',
      price: 'ab 490 €',
      text: 'Für Unternehmen nur sinnvoll, wenn genug Raum für Ruhe, Aufbau und Praxis da ist. Nicht als schnelle Fitnesspause gedacht.',
    },
  },
  {
    title: 'Taijiquan',
    line: 'Nicht schnell. Nicht nebenbei.',
    text: (
      <>
        Taijiquan braucht{' '}
        <HighlightText accent="axisTension">Unterbau</HighlightText>. Sonst
        bleibt von der Form nur langsame Bewegung.
      </>
    ),
    individual: {
      format: 'Einzeltraining',
      price: 'ab 70 € pro Einheit',
      text: 'Für ernsthaften Einstieg oder gezielte Vertiefung. Langsam, genau und mit viel Korrektur.',
    },
    group: {
      format: 'Taijiquan-Aufbaukurs',
      duration: 'ca. 20 Termine',
      price: 'ab 2.600 € pro Kursblock',
      text: 'Ein sauberer Einstieg braucht Zeit für Stand, Gewicht, Richtung, Schritte, Struktur und Bewegungsprinzipien.',
      classText:
        'Formarbeit gehört in eine stabile Praxis. Dann können Übergänge, Korrektur und innere Ordnung wirklich wachsen.',
      classPrice: 'fortlaufend ab 130 € pro Termin',
    },
    company: {
      format: 'Sonderformat',
      duration: 'nach Rahmen',
      price: 'auf Anfrage',
      text: 'Nicht als Standardworkshop gedacht. Möglich nur, wenn Zeit, Ziel und Gruppe wirklich dazu passen.',
    },
  },
  {
    title: 'Besondere Situationen',
    line: 'Wenn es nicht sauber in eine Preisliste passt.',
    text: 'Manchmal geht es nicht um ein Standardangebot, sondern darum, ob etwas menschlich, körperlich oder praktisch sinnvoll möglich ist.',
    individual: {
      format: 'nach Absprache',
      price: 'flexibel',
      text: 'Für Menschen mit wenig Geld, Schwangerschaft, körperlichen Themen, Einschränkungen oder besonderem Bedarf.',
    },
    group: {
      format: 'soziales oder freies Format',
      duration: 'nach Absprache',
      price: 'nach Absprache',
      text: 'Für kleine Gruppen, soziale Kontexte, Ehrenamt, Outdoor-Termine oder gemeinsames Üben draußen.',
      classText:
        'Wenn Ort, Menschen und Situation passen, kann daraus ein offenes oder gemeinschaftliches Format entstehen.',
      classPrice: 'flexibel',
    },
  },
]

const IntegrationSection = ({ onGoToNextStep: _onGoToNextStep }: Props) => (
  <Section
    id="integrieren"
    titleId="integrieren-title"
    ariaLabel="Angebote"
    container="wide"
    content="default"
    variant="body"
    rhythm="spacious"
    tone="relief"
    movement="integration"
    mix={['opening', 'flow']}
  >
    <Surface tone="bare" movement="integration" padding="lg">
      <Flow>
        <Headline
          titleId="integrieren-title"
          title="Du musst nicht schon wissen, ob es Yoga, Qigong oder Taijiquan ist."
          accent="axisFlow"
          weight="poster"
        />

        <PathCards items={offerItems} />
      </Flow>
    </Surface>
  </Section>
)

const Flow = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.region};
`

export default IntegrationSection
