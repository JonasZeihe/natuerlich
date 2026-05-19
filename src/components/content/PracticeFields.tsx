// src/components/content/PracticeFields.tsx
'use client'

import { type ReactNode } from 'react'
import styled from 'styled-components'
import Button from '@/components/actions/Button'
import Surface from '@/components/primitives/Surface'
import type { MovementKey } from '@/design/theme'
import Typography from '@/design/typography'

type Step = {
  label: string
  title: ReactNode
  body: ReactNode
}

type Method = {
  title: ReactNode
  body: ReactNode
  name: ReactNode
  note: ReactNode
}

type Way = {
  label: string
  title: ReactNode
  body: ReactNode
}

type Props = {
  intro: Step
  steps: readonly Step[]
  result: Step
  method: Method
  ways: readonly Way[]
  movement: MovementKey
  mobileAriaLabel: string
  onGoToIntegration: () => void
}

const Shell = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.5)};
`

const IntroWrap = styled.div`
  width: min(100%, 64rem);
  margin-inline: auto;
`

const IntroCard = styled(Surface)`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1)};
  min-height: ${({ theme }) => theme.spacing(19)};
  align-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: auto;
    align-content: start;
  }
`

const Track = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: min(82vw, 23rem);
  gap: ${({ theme }) => theme.spacing(1)};
  margin-inline: ${({ theme }) => `-${theme.spacing(1)}`};
  padding-inline: ${({ theme }) => theme.spacing(1)};
  padding-bottom: ${({ theme }) => theme.spacing(0.25)};
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-auto-columns: minmax(18rem, 24rem);
    margin-inline: 0;
    padding-inline: 0;
  }
`

const TrackItem = styled.div`
  scroll-snap-align: start;
`

const StepCard = styled(Surface)`
  min-height: ${({ theme }) => theme.spacing(16)};
  height: 100%;
  display: grid;
  align-content: start;
  gap: ${({ theme }) => theme.spacing(1)};
`

const MethodCard = styled(Surface)`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.25)};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: min(100%, 64rem);
    margin-inline: auto;
  }
`

const MethodName = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.45)};
  padding-top: ${({ theme }) => theme.spacing(1)};
  border-top: 1px solid ${({ theme }) => theme.roles.border.subtle};
`

const Ways = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: min(82vw, 23rem);
  gap: ${({ theme }) => theme.spacing(1)};
  margin-inline: ${({ theme }) => `-${theme.spacing(1)}`};
  padding-inline: ${({ theme }) => theme.spacing(1)};
  padding-bottom: ${({ theme }) => theme.spacing(0.25)};
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: min(100%, 64rem);
    margin-inline: auto;
    padding-inline: 0;
    grid-auto-flow: initial;
    grid-auto-columns: initial;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    overflow: visible;
  }
`

const WayCard = styled.article`
  scroll-snap-align: start;
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.7)};
  border: 1px solid ${({ theme }) => theme.roles.border.subtle};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  background: ${({ theme }) => theme.roles.surface.card};
  padding: ${({ theme }) => theme.spacing(1.1)};
`

const Footer = styled(Surface)`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.25)};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: min(100%, 64rem);
    margin-inline: auto;
  }
`

const FooterText = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.8)};
  max-width: 42rem;
`

const NoBreak = styled.span`
  white-space: nowrap;
  word-break: keep-all;
`

const PracticeFields = ({
  intro,
  steps,
  result,
  method,
  ways,
  movement,
  mobileAriaLabel,
  onGoToIntegration,
}: Props) => {
  const flowItems = [...steps, result]

  return (
    <Shell aria-label={mobileAriaLabel}>
      <IntroWrap>
        <IntroCard
          tone="threshold"
          movement={movement}
          radius="large"
          bordered
          padding="lg"
          weight="steady"
        >
          <Typography
            as="p"
            variant="caption"
            gutter={false}
            accent="axisDensity"
          >
            {intro.label}
          </Typography>

          <Typography as="h2" variant="h2" gutter={false} color="primary">
            {intro.title}
          </Typography>

          <Typography
            as="p"
            variant="body"
            gutter={false}
            tone="soft"
            cadence="open"
          >
            {intro.body}
          </Typography>
        </IntroCard>
      </IntroWrap>

      <Track aria-label="Praxisweg">
        {flowItems.map((item) => (
          <TrackItem key={item.label}>
            <StepCard
              tone="card"
              movement={movement}
              radius="large"
              bordered
              padding="lg"
              weight="steady"
            >
              <Typography
                as="p"
                variant="caption"
                gutter={false}
                accent="axisDensity"
              >
                {item.label}
              </Typography>

              <Typography as="h3" variant="h3" gutter={false} color="primary">
                {item.title}
              </Typography>

              <Typography
                as="p"
                variant="body"
                gutter={false}
                tone="soft"
                cadence="open"
              >
                {item.body}
              </Typography>
            </StepCard>
          </TrackItem>
        ))}
      </Track>

      <MethodCard
        tone="note"
        movement={movement}
        radius="large"
        bordered
        padding="lg"
        weight="steady"
      >
        <Typography
          as="p"
          variant="caption"
          gutter={false}
          accent="axisDensity"
        >
          Die Mitte
        </Typography>

        <Typography as="h2" variant="h2" gutter={false} color="primary">
          {method.title}
        </Typography>

        <Typography
          as="p"
          variant="body"
          gutter={false}
          tone="soft"
          cadence="open"
        >
          {method.body}
        </Typography>

        <MethodName>
          <Typography as="p" variant="subtitle" gutter={false} color="primary">
            {method.name}
          </Typography>

          <Typography
            as="p"
            variant="body"
            gutter={false}
            tone="soft"
            cadence="open"
          >
            {method.note}
          </Typography>
        </MethodName>
      </MethodCard>

      <Ways>
        {ways.map((way) => (
          <WayCard key={way.label}>
            <Typography
              as="p"
              variant="caption"
              gutter={false}
              accent="axisDensity"
            >
              {way.label}
            </Typography>

            <Typography as="h3" variant="subtitle" gutter={false}>
              {way.title}
            </Typography>

            <Typography
              as="p"
              variant="body"
              gutter={false}
              tone="soft"
              cadence="open"
            >
              {way.body}
            </Typography>
          </WayCard>
        ))}
      </Ways>

      <Footer
        tone="note"
        movement={movement}
        radius="large"
        bordered
        padding="lg"
        weight="steady"
      >
        <Typography
          as="p"
          variant="caption"
          gutter={false}
          accent="axisDensity"
        >
          Der passende Rahmen
        </Typography>

        <FooterText>
          <Typography as="h3" variant="h3" gutter={false} color="primary">
            Manchmal ist ein Kurs der richtige Anfang. Manchmal braucht es
            Einzelunterricht. Manchmal entsteht daraus eine regelmäßige Gruppe.
          </Typography>

          <Typography
            as="p"
            variant="body"
            gutter={false}
            tone="soft"
            cadence="open"
          >
            Entscheidend ist nicht, wie das Format heißt. Entscheidend ist, ob
            es zu deinem Stand, deinem Alltag und deiner Richtung passt.
          </Typography>
        </FooterText>

        <div>
          <Button variant="primary" onClick={onGoToIntegration}>
            Angebote ansehen
          </Button>
        </div>
      </Footer>
    </Shell>
  )
}

export default PracticeFields
export { NoBreak }
