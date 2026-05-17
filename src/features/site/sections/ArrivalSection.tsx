// src/features/site/screens/ArrivalSection.tsx
'use client'

import styled from 'styled-components'
import Button from '@/components/actions/Button'
import Section from '@/components/primitives/Section'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import Typography from '@/design/typography'

type Props = {
  onGoToActivation: () => void
  onGoToIntegration: () => void
}

const ArrivalGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.06fr) minmax(0, 0.94fr);
  gap: ${({ theme }) => theme.spacing(1.5)};
  align-items: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing(1.05)};
  }
`

const HeadSurface = styled(Surface)`
  height: 100%;
`

const HeadStack = styled(Stack)`
  min-width: 0;
  min-height: 100%;
  justify-content: center;
`

const ActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.8)};
  margin-top: ${({ theme }) => theme.spacingHalf(0.6)};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    align-items: stretch;

    > * {
      flex: 1 1 auto;
    }
  }
`

const MediaSurface = styled(Surface)`
  height: 100%;
`

const MediaFrame = styled.div`
  width: 100%;
  min-height: 100%;
  height: 100%;
  border-radius: inherit;

  .inner {
    position: relative;
    width: 100%;
    min-height: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: inherit;
    display: flex;
    align-items: stretch;
    aspect-ratio: 4 / 5;

    > * {
      width: 100%;
      min-height: 100%;
    }
  }
`

const MediaShell = styled(Stack)`
  height: 100%;
  justify-content: space-between;
  min-height: 0;
  padding: clamp(1rem, 2vw, 1.35rem);
`

const MediaBand = styled(Surface)`
  margin-top: auto;
`

const ArrivalSection = ({ onGoToActivation, onGoToIntegration }: Props) => (
  <Section
    id="ankommen"
    container="wide"
    padY
    variant="intro"
    tone="opening"
    mix={['opening', 'tension']}
    ariaLabel="Ankommen"
    titleId="ankommen-title"
  >
    <ArrivalGrid>
      <HeadSurface
        tone="soft"
        mix={['opening', 'tension']}
        radius="large"
        bordered
        padding="lg"
        weight="steady"
      >
        <HeadStack gap={1}>
          <Typography
            as="p"
            variant="caption"
            gutter={false}
            tone="soft"
            measure="wide"
          >
            Ankommen
          </Typography>

          <Stack gap={0.7}>
            <Typography
              as="h1"
              variant="h1"
              id="ankommen-title"
              cadence="dense"
              measure="title"
              gutter={false}
              tone="strong"
            >
              Meta-Placeholder: Diese Bewegung lässt den Besucher landen, bevor
              irgendetwas erklärt, verkauft oder eingeordnet wird.
            </Typography>

            <Typography
              as="p"
              variant="body"
              gutter={false}
              tone="soft"
              cadence="open"
              measure="prose"
            >
              Meta-Placeholder: Hier später die erste ruhige Setzung. Jonas wird
              als Lehrer spürbar, ohne Methode, Angebot oder Biografie nach vorn
              zu schieben.
            </Typography>
          </Stack>

          <ActionsRow>
            <Button variant="primary" onClick={onGoToActivation}>
              Meta-Placeholder: In Bewegung kommen
            </Button>
            <Button variant="ghost" onClick={onGoToIntegration}>
              Meta-Placeholder: Rahmen finden
            </Button>
          </ActionsRow>
        </HeadStack>
      </HeadSurface>

      <MediaSurface
        tone="panel"
        mix={['opening', 'tension']}
        radius="large"
        bordered
        padding="none"
        weight="steady"
      >
        <MediaFrame>
          <div className="inner">
            <MediaShell gap={1}>
              <Stack gap={0.78}>
                <Typography
                  as="p"
                  variant="caption"
                  gutter={false}
                  accent="axisTension"
                >
                  Präsenzfläche
                </Typography>

                <Typography
                  as="p"
                  variant="body"
                  gutter={false}
                  accent="axisTension"
                >
                  Meta-Placeholder: Bild oder Assetfläche für Ankunft,
                  Körperlichkeit und echte Lehrerpräsenz. Kein Hero-Klischee.
                </Typography>
              </Stack>

              <MediaBand
                tone="soft"
                mix={['opening', 'tension']}
                radius="large"
                bordered
                padding="md"
                weight="steady"
              >
                <Stack gap={0.48}>
                  <Typography
                    as="p"
                    variant="body"
                    gutter={false}
                    accent="axisTension"
                  >
                    Meta-Placeholder: Diese Medienfläche trägt den ersten Raum,
                    nicht Dekoration.
                  </Typography>

                  <Typography as="p" variant="body" gutter={false} tone="soft">
                    Keine Naturtapete. Keine Symbolik. Keine Wellness-Anmutung.
                  </Typography>
                </Stack>
              </MediaBand>
            </MediaShell>
          </div>
        </MediaFrame>
      </MediaSurface>
    </ArrivalGrid>
  </Section>
)

export default ArrivalSection
