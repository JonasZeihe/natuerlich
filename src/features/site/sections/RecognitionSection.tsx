// src/features/site/sections/RecognitionSection.tsx
'use client'

import styled from 'styled-components'
import RecognitionProfile from '@/components/content/RecognitionProfile'
import SectionIntro from '@/components/content/SectionIntro'
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
    assets={[
      {
        name: '018_Fokusfeld',
        right: 'clamp(0rem, 7vw, 10rem)',
        top: 'clamp(1rem, 5vw, 6rem)',
        width: 'clamp(16rem, 28vw, 34rem)',
        presence: 'subtle',
        boundary: 'bleed',
        opacity: 0.18,
        mobile: {
          right: '-9rem',
          top: '1rem',
          width: '28rem',
          opacity: 0.08,
        },
      },
      {
        name: '022_Kühle_Präzision',
        left: 'clamp(-12rem, -7vw, -4rem)',
        bottom: 'clamp(-10rem, -8vw, -4rem)',
        width: 'clamp(20rem, 34vw, 42rem)',
        presence: 'subtle',
        boundary: 'bleed',
        opacity: 0.1,
        mobile: {
          left: '-12rem',
          bottom: '-7rem',
          width: '30rem',
          opacity: 0.06,
        },
      },
    ]}
  >
    <Surface
      tone="bare"
      movement="recognition"
      radius="none"
      bordered={false}
      padding="lg"
      weight="quiet"
    >
      <SectionIntro
        titleId="erkennen-title"
        title="Herzlich willkommen, ich bin Jonas :-)"
        accent="axisTension"
        max="58rem"
      ></SectionIntro>

      <ProfileArea>
        <RecognitionProfile
          movement="recognition"
          path={{
            label: 'Weg',
            tone: 'threshold',
            accent: 'axisTension',
            title: 'Ein wichtiger Teil meines Weges begann bei Ulrich Rosen.',
            asset: {
              name: '032_Kern',
              right: '-6rem',
              bottom: '-7rem',
              width: 'clamp(12rem, 24vw, 20rem)',
              presence: 'subtle',
              boundary: 'bleed',
              opacity: 0.12,
            },
            children:
              'Durch ihn und das Daoyin Zentrum Deutschland habe ich verstanden, dass diese Arbeit keine Dekoration ist. Sie ist Übung, Linie, Körperarbeit, Atem, Form, Aufmerksamkeit und die Bereitschaft, etwas wirklich ernst zu nehmen.',
          }}
          presence={{
            label: 'Bild',
            tone: 'quiet',
            accent: 'axisDensity',
            title: 'Hier gehört ein echtes Foto hin.',
            children:
              'Ein Bild, auf dem man sieht, wer da unterrichtet: nicht als Pose, sondern als Mensch, der diese Arbeit selbst geht.',
          }}
          credentials={{
            label: 'Ausbildungen',
            tone: 'field',
            accent: 'axisDensity',
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
          teaching={{
            label: 'Unterricht',
            tone: 'card',
            accent: 'axisDensity',
            title: 'Ich unterrichte, was ich selbst übe.',
            asset: {
              name: '022_Kühle_Präzision',
              right: '-8rem',
              top: '-8rem',
              width: 'clamp(13rem, 24vw, 21rem)',
              presence: 'subtle',
              boundary: 'bleed',
              opacity: 0.1,
            },
            children:
              'Yoga, Qigong, Daoyin Yangsheng Gong, Taijiquan, Meditation und Entspannung haben unterschiedliche Wurzeln. Im Unterricht werden sie durch Übung lebendig: im Atem, im Körper, in der Aufmerksamkeit und in der Art, wie du mit dir arbeitest.',
          }}
          style={{
            label: 'Stil',
            tone: 'card',
            accent: 'axisOpening',
            title: 'Freude ist kein Gegensatz zu Anspruch.',
            children:
              'Ich mag Unterricht, der lebendig ist. Bewegung darf Freude machen, und gleichzeitig darf die Arbeit genau sein. Aus ernsthafter Übung entsteht Leichtigkeit: durch Wiederholung, Aufmerksamkeit und echte Lust an der Sache.',
          }}
          scope={{
            label: 'Umfang',
            tone: 'field',
            accent: 'axisDensity',
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
