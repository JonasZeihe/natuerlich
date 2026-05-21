// src/features/site/sections/PracticeFieldSection.tsx
'use client'

import styled from 'styled-components'
import Headline from '@/components/content/Headline'
import PracticeFields, { NoBreak } from '@/components/content/PracticeFields'
import Section from '@/components/primitives/Section'
import Surface from '@/components/primitives/Surface'

type Props = {
  onGoToIntegration: () => void
}

const PracticePanel = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2.5)};
`

const PracticeFieldSection = ({ onGoToIntegration }: Props) => (
  <Section
    id="arbeiten"
    titleId="arbeiten-title"
    ariaLabel="Arbeiten"
    container="wide"
    content="default"
    variant="body"
    rhythm="spacious"
    tone="pressure"
    movement="practice"
    mix={['density', 'tension']}
  >
    <Surface tone="bare" movement="practice" padding="lg">
      <Headline
        titleId="arbeiten-title"
        title="Schmiede die Schwerter vor dem Krieg"
        accent="axisDensity"
      />

      <PracticePanel>
        <PracticeFields
          movement="practice"
          mobileAriaLabel="Praxisweg"
          onGoToIntegration={onGoToIntegration}
          intro={{
            label: 'Anfang',
            title: 'Wenn der Atem nicht mehr reicht.',
            body: 'Manchmal macht man alles richtig. Man atmet. Man entspannt. Man will zur Ruhe kommen. Und trotzdem findet das System nicht zurück. Dann ist nicht die einzelne Technik das Problem, sondern der Zustand, in dem sie angewendet wird.',
          }}
          steps={[
            {
              label: 'Atem',
              title: 'Der Atem ist der erste Zugang.',
              body: 'Er öffnet Rhythmus, Weite und Wahrnehmung. Nicht als Trick, der sofort alles löst, sondern als Anfang einer Beziehung zum eigenen System.',
            },
            {
              label: 'Entspannung',
              title: 'Entspannung muss wieder gelernt werden.',
              body: 'Viele Menschen merken erst in der Ruhe, wie viel Spannung sie tragen. Entspannung heißt dann nicht einfach loslassen, sondern spüren, wo etwas gehalten wird und wie es langsam nachgeben kann.',
            },
            {
              label: 'Achtsamkeit',
              title: 'Achtsamkeit ordnet Wahrnehmung.',
              body: 'Body Scan, Meditation und einfache Aufmerksamkeit helfen, nicht sofort zu bewerten, zu reparieren oder wegzudrücken. Man lernt, genauer da zu sein, ohne sich im eigenen Zustand zu verlieren.',
            },
            {
              label: 'Regulation',
              title: 'Daraus entsteht Stressmanagement.',
              body: 'Stressmanagement ist dann kein theoretisches Thema mehr, sondern eine Konsequenz aus Wahrnehmung, Atem, Entspannung und Achtsamkeit. Man lernt, den eigenen Zustand früher zu lesen, bevor Schlaf kippt, Spannung normal wird oder der Körper erst nachts zeigt, was tagsüber keinen Raum hatte.',
            },
          ]}
          result={{
            label: 'Praxis',
            title: 'Dann wird aus Technik ein Weg.',
            body: 'Atmung, Entspannung und Achtsamkeit bleiben nicht getrennt. Sie greifen ineinander. Erst dadurch wird Bewegung mehr als Bewegung: eine Praxis, die den ganzen Menschen mitnimmt.',
          }}
          method={{
            title: 'In der Mitte steht Daoyin Yangsheng Gong.',
            body: 'Das ist der Zusammenhang, aus dem ich arbeite: Atem, Aufmerksamkeit, Gesundheitspflege, Bewegung, Qigong und später auch Taijiquan.',
            name: (
              <>
                Daoyin Yangsheng Gong — <NoBreak>導引養生功</NoBreak>
              </>
            ),
            note: 'Daoyin — 導引: Führung von Spannung in Antwort. Yangsheng — 養生: Sorge für das Lebendige, das dadurch hervortritt. Gong — 功: Gereifte Wirksamkeit aus richtiger Wiederholung.',
          }}
          ways={[
            {
              label: 'Yoga',
              title: 'Verbinden, anschirren, ausrichten.',
              body: 'Yoga kommt von yuj. Gemeint ist hier kein einzelner Trick und keine Körperform zum Abhaken, sondern ein Übungsweg für Körper, Atem, Geist und Alltag: Haltung, Bewegung, Atmung, Entspannung, Konzentration und die Art, wie du mit dir selbst umgehst.',
            },
            {
              label: 'Qigong',
              title: 'Übung an der Lebendigkeit.',
              body: '氣功: Qi als Atem, Dampf und Lebenskraft. Gong als Übung, Arbeit und erworbenes Können. Im alten Zeichen steckt das Bild von Reis, aus dem Wärme aufsteigt. Qigong ist keine Energiebehauptung, sondern Praxis: führen, atmen, drehen, wahrnehmen, wiederholen.',
            },
            {
              label: 'Taijiquan',
              title: 'Ruhe als geführte Kraft.',
              body: '太極拳: Taiji, das höchste Prinzip. Quan, die Faust. Taijiquan ist nicht langsames Qigong und nicht Entspannungsbewegung mit schöner Form. Es ist Arbeit an Struktur, Mitte, Gewicht, Richtung, Wandlung und Kraft ohne Verkrampfung.',
            },
          ]}
        />
      </PracticePanel>
    </Surface>
  </Section>
)

export default PracticeFieldSection
