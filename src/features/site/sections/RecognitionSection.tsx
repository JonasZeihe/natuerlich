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
    ariaLabel="Erkennen"
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
        label="Erkennen"
        titleId="erkennen-title"
        title="Ich bin kein Bilderbuch-Yogalehrer. Und genau deshalb ist diese Arbeit ehrlich."
        accent="axisTension"
        max="58rem"
      >
        Ich unterrichte nicht aus einer perfekten Oberfläche heraus. Mein Weg
        kam über eigene Erfahrung, Krisen, Ausbildung, Unterricht, Brüche und
        Wiederannäherung. Yoga, Qigong, Taijiquan, Meditation und Entspannung
        wurden für mich nicht zu Rollen, sondern zu Werkzeugen: um klarer zu
        werden, freier zu leben und Menschen eine Praxis zu zeigen, die wirklich
        im Alltag trägt.
      </SectionIntro>

      <ProfileArea>
        <RecognitionProfile
          movement="recognition"
          path={{
            label: 'Weg',
            tone: 'threshold',
            accent: 'axisTension',
            title:
              'Angefangen hat es nicht mit einem Konzept, sondern mit einer Erfahrung.',
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
              '2013 kam ich über Ulrich Rosen zur Praxis. Seine Art zu unterrichten hat meinen Weg stark geprägt: ruhig, klar, körpernah und ohne unnötige Show. In dieser ersten Begegnung wurde für mich spürbar, dass Bewegung, Atmung, Entspannung und Stille nicht nur Übungen sind, sondern Werkzeuge, mit denen sich der eigene Zustand wirklich verändern lässt.',
          }}
          presence={{
            label: 'HIER FEHLT NOCH EIN FOTO',
            tone: 'quiet',
            accent: 'axisDensity',
            title: 'HIER FEHLT NOCH EIN FOTO',
            children:
              'Hier ist Raum für ein echtes Bild. Kein Guru-Auftritt, keine Yogapose als Werbefläche, keine Naturtapete. Einfach Jonas als Mensch und Lehrer: direkt, ruhig, ansprechbar, mit Humor, mit Anspruch und ohne diese ganze Heiligenschein-Nummer.',
          }}
          credentials={{
            label: 'Ausbildungen',
            title:
              'Der fachliche Boden: Yoga, Qigong, Taijiquan, Meditation und Entspannung.',
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
            label: 'Was ich daraus unterrichte',
            tone: 'card',
            accent: 'axisDensity',
            title:
              'Ich unterrichte nicht alles als Tradition. Ich unterrichte das, was in der Praxis trägt.',
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
              'Aus Yoga nehme ich Körperarbeit, Atem, Entspannung, Sammlung und die Möglichkeit, sich selbst wieder in Beziehung zu bringen. Aus Qigong und Taijiquan kommen Stand, Aufrichtung, Gewichtsverlagerung, Fluss, Formbewusstsein und ruhige Präzision. Meditation, Achtsamkeit und Entspannung laufen nicht als Extra-Deko daneben, sondern sind Teil der Arbeit. Was ich nicht unterrichte: Lifestyle-Yoga, Fitness-Gehopse, Guru-Gehabe, Fernost-Deko oder Esoterik als Nebelmaschine.',
          }}
          style={{
            label: 'Unterricht',
            tone: 'card',
            accent: 'axisOpening',
            title: 'Locker, direkt, präzise — und mit hohem Anspruch.',
            children:
              'Ich mag es, wenn Unterricht Freude macht. Wenn gelacht werden darf. Wenn Bewegung nicht nach Pflicht riecht. Aber das heißt nicht, dass es beliebig wird. Gute Praxis kann leicht wirken und trotzdem genau sein. Sie darf angenehm sein, fordern, korrigieren, beruhigen, wachmachen und manchmal auch zeigen, wo man sich selbst im Weg steht.',
          }}
          scope={{
            label: 'Umfang',
            tone: 'field',
            accent: 'axisDensity',
            title: 'Rund 1.350 bis 1.400 dokumentierte Zeitstunden.',
            children:
              'Der Umfang ist nicht das Eingangsschild meiner Arbeit, aber er ist wichtig. Er zeigt, dass diese Praxis nicht aus ein paar Wochenendkursen entstanden ist, sondern aus mehreren Jahren Ausbildung, Methodik, Didaktik, Körperarbeit, Theorie, Meditation, Atemarbeit, Entspannungsverfahren und eigener Übung. Die Nachweise stützen die Arbeit. Sie ersetzen nicht die Begegnung.',
          }}
        />
      </ProfileArea>
    </Surface>
  </Section>
)

export default RecognitionSection
