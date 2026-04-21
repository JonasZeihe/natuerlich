// src/features/site/sections/TeacherSection.tsx
'use client'

import styled from 'styled-components'
import Section from '@/components/primitives/Section'
import Surface from '@/components/primitives/Surface'
import Stack from '@/components/primitives/Stack'
import Typography from '@/design/typography'

const MiddleLayout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.15)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: minmax(0, 1.42fr) minmax(18rem, 0.86fr);
    gap: ${({ theme }) => theme.spacing(1.3)};
    align-items: stretch;
  }
`

const SideColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.1)};
  min-width: 0;
`

const MediaPlaceholder = styled.div`
  min-height: 18rem;
  border: 1px dashed ${({ theme }) => theme.getAxisRole('axisClarity').border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme }) => theme.roles.surface.inset};
  display: flex;
  align-items: flex-end;
  padding: ${({ theme }) => theme.spacing(1.05)};
`

export default function TeacherSection() {
  return (
    <Section
      id="lehrer"
      titleId="lehrer-title"
      ariaLabel="Jonas als Lehrer"
      container="default"
      variant="body"
      rhythm="default"
      tone="deepen"
    >
      <Stack gap={1.3}>
        <Stack gap={0.82}>
          <Typography
            as="p"
            variant="caption"
            gutter={false}
            accent="axisResonance"
          >
            Jonas als Lehrer
          </Typography>

          <Typography
            as="h2"
            variant="h2"
            gutter={false}
            accent="axisResonance"
            id="lehrer-title"
          >
            Meta-Placeholder: Hier später die verdichtete Lehrerhaltung. Es muss
            klar werden, wofür Jonas steht, wie er arbeitet und was diese Arbeit
            ausdrücklich nicht ist.
          </Typography>

          <Typography as="p" variant="body" gutter={false}>
            Meta-Placeholder: Diese erste Setzung muss später Person vor
            Methode, Anspruch ohne Pose, Praxis statt Kulisse und Freude ohne
            Verflachung lesbar machen.
          </Typography>

          <Typography as="p" variant="body" gutter={false} tone="soft">
            Meta-Placeholder: Diese Passage eröffnet Vertrauen. Sie behauptet
            nichts, sie trägt. Kein Wellness-Ton. Keine Über-mich-Rhetorik.
            Keine Guru-Anmutung.
          </Typography>
        </Stack>

        <MiddleLayout>
          <Surface
            tone="accent"
            accent="axisResonance"
            radius="large"
            bordered
            padding="lg"
          >
            <Stack gap={0.9}>
              <Typography
                as="p"
                variant="caption"
                gutter={false}
                accent="axisResonance"
              >
                Eigener Weg und Reibung
              </Typography>

              <Typography
                as="h3"
                variant="h3"
                gutter={false}
                accent="axisResonance"
              >
                Meta-Placeholder: Hier später die eigene Erfahrung, Reibung und
                der Weg in die Praxis.
              </Typography>

              <Typography as="p" variant="body" gutter={false}>
                Meta-Placeholder: Später muss hier sichtbar werden, wie erste
                Wirksamkeitserfahrungen, Bruchstellen, Krisen oder
                Wiederannäherung den Weg in diese Arbeit geprägt haben.
              </Typography>

              <Typography as="p" variant="body" gutter={false} tone="soft">
                Meta-Placeholder: Reibung als Quelle von Klarheit. Nicht
                dramatisieren. Nicht pathologisieren. Nicht biografisch
                ausufern. Nur das, was Glaubwürdigkeit wirklich trägt.
              </Typography>
            </Stack>
          </Surface>

          <SideColumn>
            <Surface
              tone="panel"
              accent="axisClarity"
              radius="large"
              bordered
              padding="md"
            >
              <Stack gap={0.8}>
                <Typography
                  as="p"
                  variant="caption"
                  gutter={false}
                  accent="axisClarity"
                >
                  Unterrichtsverständnis
                </Typography>

                <Typography
                  as="h3"
                  variant="h3"
                  gutter={false}
                  accent="axisClarity"
                >
                  Meta-Placeholder: Hier später lesbar machen, wie Jonas lehrt
                  und warum das im Alltag trägt.
                </Typography>

                <Typography as="p" variant="body" gutter={false}>
                  Meta-Placeholder: Systemisch, pragmatisch, alltagstauglich,
                  nicht dogmatisch. Methoden erscheinen als Werkzeuge, nicht als
                  Identität.
                </Typography>
              </Stack>
            </Surface>

            <Surface
              tone="inset"
              accent="axisClarity"
              radius="large"
              bordered
              padding="sm"
            >
              <MediaPlaceholder>
                <Typography
                  as="p"
                  variant="body"
                  gutter={false}
                  accent="axisClarity"
                >
                  Bild-Placeholder: Reale Lehrerpräsenz. Ruhige, klare
                  Körperlichkeit. Keine Heldenpose. Keine Naturromantik. Keine
                  symbolische Ersatzbildsprache.
                </Typography>
              </MediaPlaceholder>
            </Surface>
          </SideColumn>
        </MiddleLayout>

        <Surface
          tone="soft"
          accent="axisClarity"
          radius="large"
          bordered
          padding="md"
        >
          <Stack gap={0.8}>
            <Typography
              as="p"
              variant="caption"
              gutter={false}
              accent="axisClarity"
            >
              Fachliche Grundlage
            </Typography>

            <Typography
              as="h3"
              variant="h3"
              gutter={false}
              accent="axisClarity"
            >
              Meta-Placeholder: Hier später die geordnete, belastbare
              Ausbildung.
            </Typography>

            <Typography as="p" variant="body" gutter={false}>
              Meta-Placeholder: Später werden hier die fachlichen Grundlagen
              ruhig und klar sichtbar. Yoga, Qigong, Taijiquan, Meditation,
              Entspannung, dokumentierter Gesamtumfang sowie Vermittlung,
              Methodik und Didaktik.
            </Typography>

            <Typography as="p" variant="body" gutter={false} tone="soft">
              Meta-Placeholder: Nachweise stützen hier die Haltung, sie ersetzen
              sie nicht. Keine Zertifikatswand. Keine dekorativen Labels. Keine
              CV-Sprache.
            </Typography>
          </Stack>
        </Surface>
      </Stack>
    </Section>
  )
}
