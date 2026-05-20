// src/features/site/sections/RecognitionSection.tsx
'use client'

import styled from 'styled-components'
import Headline from '@/components/content/Headline'
import RecognitionProfile from '@/components/content/RecognitionProfile'
import Section from '@/components/primitives/Section'
import Surface from '@/components/primitives/Surface'

const ProfileArea = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2.25)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: ${({ theme }) => theme.spacing(1.5)};
  }
`

const RecognitionSection = () => (
  <Section
    id="erkennen"
    titleId="erkennen-title"
    ariaLabel="Jonas"
    container="wide"
    content="default"
    variant="body"
    rhythm="default"
    tone="threshold"
    movement="recognition"
    mix={['density', 'tension']}
  >
    <Surface tone="bare" movement="recognition" padding="lg">
      <Headline
        titleId="erkennen-title"
        title="Herzlich willkommen, ich bin Jonas :-)"
        accent="axisTension"
      />

      <ProfileArea>
        <RecognitionProfile
          path={{
            title: 'Ein wichtiger Teil meines Weges begann bei Ulrich Rosen.',
            children:
              'Durch ihn und das Daoyin Zentrum Deutschland habe ich verstanden, dass diese Arbeit keine Dekoration ist. Sie ist Übung, Linie, Körperarbeit, Atem, Form, Aufmerksamkeit und die Bereitschaft, etwas wirklich ernst zu nehmen.',
          }}
          teaching={{
            title: 'Ich unterrichte, was ich selbst übe.',
            children:
              'Yoga, Qigong, Daoyin Yangsheng Gong, Taijiquan, Meditation und Entspannung haben unterschiedliche Wurzeln. Im Unterricht werden sie durch Übung lebendig: im Atem, im Körper, in der Aufmerksamkeit und in der Art, wie du mit dir arbeitest.',
          }}
          style={{
            title: 'Freude ist kein Gegensatz zu Anspruch.',
            children:
              'Ich mag Unterricht, der lebendig ist. Bewegung darf Freude machen, und gleichzeitig darf die Arbeit genau sein. Aus ernsthafter Übung entsteht Leichtigkeit: durch Wiederholung, Aufmerksamkeit und echte Lust an der Sache.',
          }}
          presence={{
            title: 'Hier gehört ein echtes Foto hin.',
            children:
              'Ein Bild, auf dem man sieht, wer da unterrichtet: nicht als Pose, sondern als Mensch, der diese Arbeit selbst geht.',
          }}
          credentials={{
            items: [
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
            ],
          }}
          scope={{
            title: 'Rund 1.350 bis 1.400 dokumentierte Zeitstunden.',
            children:
              'In dieser Arbeit liegen mehrere Jahre Ausbildung, Methodik, Didaktik, Körperarbeit, Theorie, Meditation, Atemarbeit, Entspannungsverfahren und eigener Übung. Die Nachweise zeigen diesen Weg. Die Begegnung beginnt trotzdem immer im gemeinsamen Üben.',
          }}
        />
      </ProfileArea>
    </Surface>
  </Section>
)

export default RecognitionSection
