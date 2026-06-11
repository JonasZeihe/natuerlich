// src/features/site/sections/IntegrationSection.tsx
'use client'

import { useState, type ReactNode } from 'react'
import styled from 'styled-components'
import Button from '@/components/actions/Button'
import Headline from '@/components/content/Headline'
import PathCards, { type PathCardItem } from '@/components/content/PathCards'
import Section from '@/components/primitives/Section'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import Typography from '@/design/typography'

type Props = {
  onGoToNextStep: () => void
}

type Credential = {
  title: ReactNode
  source: ReactNode
  period: ReactNode
  hours: ReactNode
}

const credentialsPanelId = 'integration-credentials-panel'

const credentials: readonly Credential[] = [
  {
    title: 'Qigong Kursleiter',
    source: 'Daoyin Zentrum Deutschland',
    period: 'März 2015 bis März 2017',
    hours: '276 Stunden',
  },
  {
    title: 'Taijiquan Kursleiter',
    source: 'Daoyin Zentrum Deutschland',
    period: 'März 2016 bis April 2018',
    hours: '276 Stunden',
  },
  {
    title: 'Qigong Lehrer',
    source: 'Daoyin Zentrum Deutschland',
    period: 'März 2015 bis Dezember 2018',
    hours: '480 Stunden',
  },
  {
    title: 'Yogalehrer-Ausbildung',
    source: 'Sivananda Yoga Europe / Yoga Vedanta Forest Academy',
    period: '2017',
    hours: '300 Stunden',
  },
  {
    title: 'Meditationslehrer und Entspannungspädagoge',
    source: 'Daoyin Zentrum Deutschland',
    period: '2018',
    hours: '60 Stunden',
  },
]

const offerItems: readonly PathCardItem[] = [
  {
    title: 'Grundlage',
    line: 'Atem, Entspannung, Achtsamkeit.',
    text: (
      <>
        Der beste Anfang, wenn noch nicht klar ist, ob es später{' '}
        <strong>Qigong</strong>, <strong>Yoga</strong> oder{' '}
        <strong>Taijiquan</strong> werden soll.
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
        Oft der beste bewegte Einstieg: <strong>Atem</strong>, Stand,
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
          <strong>Daoyin Yangsheng Gong</strong>.
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
        und <strong>Entspannung</strong> greifen ineinander.
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
        Taijiquan braucht <strong>Unterbau</strong>. Sonst bleibt von der Form
        nur langsame Bewegung.
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

const IntegrationSection = ({ onGoToNextStep: _onGoToNextStep }: Props) => {
  const [isCredentialsOpen, setIsCredentialsOpen] = useState(false)

  return (
    <OfferSection
      id="integrieren"
      titleId="integrieren-title"
      ariaLabel="Angebote"
      container="wide"
      content="default"
      variant="body"
      rhythm="spacious"
      tone="quiet"
      header={
        <Headline
          titleId="integrieren-title"
          title="Du musst nicht schon wissen, ob es Yoga, Qigong oder Taijiquan ist."
          accent="taiji"
          weight="poster"
        />
      }
    >
      <OfferFlow>
        <PathCards items={offerItems} />

        <ProofPanel tone="quiet" radius="lg" padding="lg">
          <ProofHeader>
            <SummaryText>
              <Typography as="h2" variant="h3" tone="strong">
                Ausbildung und Nachweise
              </Typography>

              <Typography as="p" variant="body" tone="strong" measure="wide">
                Rund 1.350 bis 1.400 dokumentierte Zeitstunden.
              </Typography>

              <Typography as="p" variant="body" tone="soft" measure="wide">
                In dieser Arbeit liegen mehrere Jahre Ausbildung, Methodik,
                Didaktik, Körperarbeit, Theorie, Meditation, Atemarbeit,
                Entspannungsverfahren und eigener Übung. Die Nachweise zeigen
                diesen Weg. Die Begegnung beginnt trotzdem immer im{' '}
                <strong>gemeinsamen Üben</strong>.
              </Typography>
            </SummaryText>

            <ActionSlot>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                aria-expanded={isCredentialsOpen}
                aria-controls={credentialsPanelId}
                onClick={() => setIsCredentialsOpen((current) => !current)}
              >
                {isCredentialsOpen
                  ? 'Nachweise ausblenden'
                  : 'Nachweise ansehen'}
              </Button>
            </ActionSlot>
          </ProofHeader>

          {isCredentialsOpen ? (
            <CredentialList id={credentialsPanelId}>
              {credentials.map((item, index) => (
                <CredentialItem key={index}>
                  <CredentialCard tone="card" radius="lg" padding="md">
                    <Stack>
                      <Typography as="h3" variant="h3" tone="strong">
                        {item.title}
                      </Typography>

                      <Typography as="p" variant="body">
                        {item.source}
                      </Typography>

                      <CredentialMeta>
                        <Typography as="span" variant="small">
                          {item.period}
                        </Typography>

                        <MetaDivider aria-hidden="true">·</MetaDivider>

                        <Typography as="span" variant="small">
                          {item.hours}
                        </Typography>
                      </CredentialMeta>
                    </Stack>
                  </CredentialCard>
                </CredentialItem>
              ))}
            </CredentialList>
          ) : null}
        </ProofPanel>
      </OfferFlow>
    </OfferSection>
  )
}

const OfferSection = styled(Section)`
  background: linear-gradient(180deg, #f8f4ea 0%, #f2eddf 56%, #eee8d7 100%);
`

const OfferFlow = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.gap.region};
  min-width: 0;
`

const ProofPanel = styled(Surface)`
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.color.surface.paper} 78%,
    transparent
  );
  box-shadow: 0 1.1rem 2.8rem
    color-mix(in srgb, ${({ theme }) => theme.palette.ink} 5%, transparent);
`

const ProofHeader = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.gap.block};

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
  }
`

const SummaryText = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.gap.text};
  max-width: 64ch;
`

const ActionSlot = styled.div`
  display: flex;
  justify-content: flex-start;

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    justify-content: flex-end;
  }
`

const CredentialList = styled.ol`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.layout.gap.grid};
  margin: ${({ theme }) => `${theme.layout.gap.cluster} 0 0`};
  padding: 0;
  list-style: none;

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const CredentialItem = styled.li`
  min-width: 0;
`

const CredentialCard = styled(Surface)`
  height: 100%;
`

const CredentialMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.layout.gap.text};
  color: ${({ theme }) => theme.color.text.soft};
`

const MetaDivider = styled.span`
  color: ${({ theme }) => theme.color.text.muted};
`

export default IntegrationSection
