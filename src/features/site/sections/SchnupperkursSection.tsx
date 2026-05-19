// src/features/site/sections/SchnupperkursSection.tsx
'use client'

import styled from 'styled-components'
import BreathingExercise from '@/components/schnupperkurs/BreathingExercise'
import Section from '@/components/primitives/Section'
import Surface from '@/components/primitives/Surface'
import Typography from '@/design/typography'

type Props = {
  onGoToPracticeField: () => void
}

const guidedText = [
  'Mach’s dir gemütlich,\negal, wo du gerade bist\nund wie du gerade bist.',
  'Egal, ob im Sitzen\noder im Liegen.',
  'Mach dich einfach nur innerlich ganz lang.',
  'Schließ die Augen irgendwann,\nwenn du magst.',
  'Und dann lass mal alles fallen.',
  'Wie kommst du dahin?',
  'Mit deiner Atmung.',
  'Mit dem Einatmen\nund mit dem Ausatmen.',
  'Und wenn du einatmest,\nversuch mal, in deinen unteren Bauch zu spüren\nund die Atembewegung ganz natürlich\nin den unteren Bauch zu verlagern,\n\nfalls du noch zu sehr\nin der Brust\noder im oberen Bauchbereich bist.',
  'Und beim Ausatmen wirst du schwerer.',
  'Mit dem Einatmen stell dir vor:\nDu wirst leicht wie eine Feder.',
  'Ausatmen:\nDu wirst ganz schwer.',
  'Einatmen:\nDer Bauch wölbt sich vor Leichtigkeit.',
  'Ausatmen:\nLösen.\nEntspannen.',
  'Und jetzt spüren wir in deinen Körper hinein.',
  'Wenn du magst,\nvon oben nach unten\noder von unten nach oben.',
  'Ich beginne gerne in den Fußsohlen.',
  'Wie fühlen sich die Fußsohlen gerade an?',
  'Und dann mit jedem Atemzug\nein Stück weit höher.',
  'Zum Beispiel Sprunggelenke\noder Knie.',
  'Bis du ganz oben angekommen bist.',
  'Oder bei der Stirn.',
  'Gesicht.\nNacken.\nSchultern.\nArme.',
  'Such dir was aus,\nwas dir gefällt.',
  'Durchwandere einmal deinen Körper\nwie ein Scan.',
  'Und dann irgendwann,\nwenn du fertig bist:',
  'Mach die Augen wieder auf.',
  'Komm wieder ins Hier und Jetzt zurück.',
]

const introductionText = [
  'Das, was wir hier gemacht haben, ist eine einfache Anfangsentspannung kombiniert mit Atemübung und einem Body Scan. Egal, wo du eben warst, vielleicht bist du jetzt ein Stückchen mehr bei dir.',
  'Ich will dir keine Heilversprechen machen. Aber ich bin persönlich davon überzeugt, dass, wenn man so etwas regelmäßig täglich praktiziert, sich eine gewisse Entspannungsfähigkeit daraus entwickeln kann.',
  'Nicht erst, wenn du schon müde und abgebrannt bist.',
  'Man schmiedet die Schwerter vor dem Krieg.',
  'Und Prävention ist nichts, was wir uns für die Rente aufsparen sollten, sondern Prävention ist ein Muster, was genau so von morgens bis abends läuft.',
  'Wer über den Tag verteilt präventiv agiert, ist abends nicht mehr im Dauercrash erschöpft.',
  'Und jetzt stell dir vor, aus diesem Momentum heraus könntest du Übungen praktizieren. Zum Beispiel aus dem Yoga. Oder sanfte und dennoch teils überraschend anstrengende, langsame, fließende Bewegungen aus dem 氣功 (qìgōng), Qigong. Oder eine Kombination von beidem, gefühlt mit viel mehr Koordination und Bewegungsanspruch und Anstrengung. Dann bist du bei 太極拳 (tàijíquán), Taijiquan.',
  'Und in diesen Bewegungsabfolgen und dem, was ich unterrichte, sind natürlich auch Vorträge jeglicher Art enthalten.',
  'Einerseits, um ein tieferes Verständnis für den eigenen Körper, Stress, Stressmanagement, Gesundheit, Meditation, Achtsamkeit und präventives, gesundheitsbasiertes, achtsamkeitsorientiertes Stressmanagement aufzubauen.',
  'Aber ebenso natürlich auch Vorträge über die Herkunft von diesen verschiedenen Praktiken, über die wissenschaftliche Seite, aber ebenso über Spiritualität und philosophisch-ethische Ansätze.',
  'Solltest du neugierig sein, verstehst du jetzt vielleicht, was ich unterrichte, und hast auch genau dieses Interesse, wofür ich brenne.',
  'Meine Kursstrukturen sind recht simpel und wahlweise für dich alleine oder für euch als Gruppe, aber genauso vielleicht für euch als Unternehmen interessant.',
  'Ich unterrichte gerne so, wie es gerade passt: in kleineren Einheiten oder als übergreifender Kurs in verschiedenen Disziplinen. Workshops wären genauso möglich.',
  'Hier siehst du jetzt noch mal auf meiner Website, wer ich bin, was ich unterrichte und was konkret mein Angebot an dich und euch ist.',
]

const SchnupperkursSection = ({ onGoToPracticeField }: Props) => (
  <Section
    id="schnupperkurs"
    titleId="schnupperkurs-title"
    ariaLabel="Schnupperkurs"
    container="full"
    content="default"
    variant="intro"
    rhythm="spacious"
    tone="opening"
    movement="arrival"
    padY={false}
  >
    <Surface
      tone="deep"
      movement="arrival"
      radius="none"
      bordered={false}
      padding="none"
      weight="quiet"
    >
      <NightCourse>
        <Opening>
          <Typography
            as="p"
            variant="caption"
            gutter={false}
            accent="axisOpening"
            cadence="dense"
          >
            Schnupperkurs
          </Typography>

          <Title id="schnupperkurs-title">Komm erst mal an.</Title>
        </Opening>

        <BreathingArea>
          <BreathingExercise showWebsiteAction={false} />
        </BreathingArea>

        <TextFlow aria-label="Geführter Schnupperkurs">
          {guidedText.map((text) => (
            <LineBlock key={text}>{text}</LineBlock>
          ))}
        </TextFlow>
      </NightCourse>
    </Surface>

    <Surface
      tone="stage"
      movement="practice"
      radius="none"
      bordered={false}
      padding="none"
      weight="quiet"
    >
      <DayCourse>
        <Introduction aria-label="Einführung in die Website">
          {introductionText.map((text) =>
            text === 'Man schmiedet die Schwerter vor dem Krieg.' ? (
              <Statement key={text}>{text}</Statement>
            ) : (
              <Paragraph key={text}>{text}</Paragraph>
            )
          )}
        </Introduction>

        <Navigation aria-label="Weiter auf der Website">
          <NavigationButton type="button" onClick={onGoToPracticeField}>
            Zur Praxis
          </NavigationButton>
          <NavigationLink href="#erkennen">Über mich</NavigationLink>
          <NavigationLink href="#integrieren">Angebot</NavigationLink>
          <NavigationLink href="#anschluss">Kontakt</NavigationLink>
        </Navigation>
      </DayCourse>
    </Surface>
  </Section>
)

const NightCourse = styled.div`
  display: grid;
  gap: clamp(
    ${({ theme }) => theme.spacing(4)},
    8vw,
    ${({ theme }) => theme.spacing(12)}
  );
  width: 100%;
  min-height: calc(100svh - var(--site-header-height, 0px));
  padding: clamp(4rem, 9svh, 7rem) ${({ theme }) => theme.layout.containerInset}
    clamp(5rem, 12svh, 9rem);
`

const Opening = styled.header`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.25)};
  align-content: end;
  width: min(100%, ${({ theme }) => theme.layout.containers.wide});
  min-height: clamp(16rem, 38svh, 30rem);
  margin-inline: auto;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: clamp(13rem, 34svh, 22rem);
    text-align: left;
  }
`

const Title = styled.h1`
  max-width: 9.5ch;
  margin: 0 auto;
  color: ${({ theme }) => theme.roles.text.inverse};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: clamp(3.2rem, 10vw, 8.75rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: -0.075em;
  line-height: 0.82;
  text-wrap: balance;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-inline: 0;
    font-size: clamp(3rem, 15vw, 6rem);
  }
`

const BreathingArea = styled.div`
  display: grid;
  place-items: center;
  width: min(100%, ${({ theme }) => theme.layout.containers.wide});
  min-height: clamp(28rem, 70svh, 48rem);
  margin-inline: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: clamp(22rem, 58svh, 34rem);
  }
`

const TextFlow = styled.div`
  display: grid;
  gap: clamp(
    ${({ theme }) => theme.spacing(1.25)},
    3vw,
    ${({ theme }) => theme.spacing(3.25)}
  );
  width: min(100%, ${({ theme }) => theme.layout.containers.content});
  margin-inline: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    > *:nth-child(6n + 4),
    > *:nth-child(6n + 5),
    > *:nth-child(6n + 6) {
      margin-left: auto;
    }
  }
`

const LineBlock = styled.p`
  width: min(100%, 44rem);
  margin: 0;
  color: ${({ theme }) => theme.roles.text.inverse};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: clamp(1.35rem, 3vw, 2.6rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  line-height: 1.1;
  white-space: pre-line;
  text-wrap: balance;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: clamp(1.28rem, 6.4vw, 2.05rem);
    line-height: 1.12;
    text-wrap: auto;
  }
`

const DayCourse = styled.div`
  display: grid;
  gap: clamp(
    ${({ theme }) => theme.spacing(4)},
    8vw,
    ${({ theme }) => theme.spacing(9)}
  );
  width: min(100%, ${({ theme }) => theme.layout.containers.wide});
  margin-inline: auto;
  padding: clamp(4rem, 10svh, 8rem)
    ${({ theme }) => theme.layout.containerInset} clamp(3.5rem, 9svh, 7rem);
`

const Introduction = styled.div`
  display: grid;
  gap: clamp(
    ${({ theme }) => theme.spacing(1.5)},
    2.4vw,
    ${({ theme }) => theme.spacing(2.5)}
  );
  width: min(100%, ${({ theme }) => theme.typography.measure.wide});
`

const Paragraph = styled.p`
  max-width: ${({ theme }) => theme.typography.measure.prose};
  margin: 0;
  color: ${({ theme }) => theme.roles.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`

const Statement = styled.p`
  width: min(100%, 12ch);
  margin: clamp(
      ${({ theme }) => theme.spacing(2)},
      5vw,
      ${({ theme }) => theme.spacing(5)}
    )
    0;
  color: ${({ theme }) => theme.roles.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: clamp(2.8rem, 8.5vw, 7rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: -0.075em;
  line-height: 0.84;
  text-wrap: balance;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: clamp(2.45rem, 14vw, 4.6rem);
  }
`

const Navigation = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(1)};
  width: min(100%, ${({ theme }) => theme.typography.measure.prose});

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    display: grid;
    grid-template-columns: 1fr;
  }
`

const NavigationButton = styled.button`
  min-height: 2.75rem;
  padding: ${({ theme }) => theme.spacing(1)}
    ${({ theme }) => theme.spacing(1.5)};
  border: 1px solid
    ${({ theme }) => theme.roles.interactive.button.ghost.border};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: ${({ theme }) => theme.roles.interactive.button.ghost.bg};
  color: ${({ theme }) => theme.roles.interactive.button.ghost.fg};
  cursor: pointer;
  font: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 1;
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.roles.interactive.button.ghost.hoverBg};
    color: ${({ theme }) => theme.roles.interactive.button.ghost.hoverFg};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.roles.focus.ring};
    outline-offset: 0.25rem;
  }
`

const NavigationLink = styled.a`
  display: inline-grid;
  place-items: center;
  min-height: 2.75rem;
  padding: ${({ theme }) => theme.spacing(1)}
    ${({ theme }) => theme.spacing(1.5)};
  border: 1px solid
    ${({ theme }) => theme.roles.interactive.button.ghost.border};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: ${({ theme }) => theme.roles.interactive.button.ghost.bg};
  color: ${({ theme }) => theme.roles.interactive.button.ghost.fg};
  font: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 1;
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.roles.interactive.button.ghost.hoverBg};
    color: ${({ theme }) => theme.roles.interactive.button.ghost.hoverFg};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.roles.focus.ring};
    outline-offset: 0.25rem;
  }
`

export default SchnupperkursSection
