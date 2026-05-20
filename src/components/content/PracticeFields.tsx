// src/components/content/PracticeFields.tsx
'use client'

import { type ReactNode } from 'react'
import styled from 'styled-components'
import Button from '@/components/actions/Button'
import Grid from '@/components/primitives/Grid'
import Stack from '@/components/primitives/Stack'
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
    <Stack gap={3} aria-label={mobileAriaLabel}>
      <Lead tone="threshold" movement={movement} radius="large" padding="lg">
        <Stack gap={1}>
          <Typography as="h2" variant="h2" color="primary">
            {intro.title}
          </Typography>

          <Typography
            as="p"
            variant="body"
            tone="soft"
            cadence="open"
            measure="wide"
          >
            {intro.body}
          </Typography>
        </Stack>
      </Lead>

      <Track aria-label="Praxisweg">
        {flowItems.map((item) => (
          <TrackItem key={item.label}>
            <FlowBlock>
              <Typography as="h3" variant="h3" color="primary">
                {item.title}
              </Typography>

              <Typography as="p" variant="body" tone="soft" cadence="open">
                {item.body}
              </Typography>
            </FlowBlock>
          </TrackItem>
        ))}
      </Track>

      <MethodPanel tone="note" movement={movement} radius="large" padding="lg">
        <Stack gap={1.25}>
          <Typography as="h2" variant="h2" color="primary">
            {method.title}
          </Typography>

          <Typography
            as="p"
            variant="body"
            tone="soft"
            cadence="open"
            measure="wide"
          >
            {method.body}
          </Typography>

          <MethodName>
            <Typography as="p" variant="subtitle" color="primary">
              {method.name}
            </Typography>

            <Typography
              as="p"
              variant="body"
              tone="soft"
              cadence="open"
              measure="wide"
            >
              {method.note}
            </Typography>
          </MethodName>
        </Stack>
      </MethodPanel>

      <Ways>
        {ways.map((way) => (
          <WayBlock key={way.label}>
            <Typography as="h3" variant="subtitle">
              {way.title}
            </Typography>

            <Typography as="p" variant="body" tone="soft" cadence="open">
              {way.body}
            </Typography>
          </WayBlock>
        ))}
      </Ways>

      <Footer tone="note" movement={movement} radius="large" padding="lg">
        <Grid columns={2} min="18rem" gap={2}>
          <Stack gap={1}>
            <Typography as="h3" variant="h3" color="primary">
              Manchmal ist ein Kurs der richtige Anfang. Manchmal braucht es
              Einzelunterricht. Manchmal entsteht daraus eine regelmäßige
              Gruppe.
            </Typography>

            <Typography
              as="p"
              variant="body"
              tone="soft"
              cadence="open"
              measure="wide"
            >
              Entscheidend ist nicht, wie das Format heißt. Entscheidend ist, ob
              es zu deinem Stand, deinem Alltag und deiner Richtung passt.
            </Typography>
          </Stack>

          <FooterAction>
            <Button variant="primary" onClick={onGoToIntegration}>
              Angebote ansehen
            </Button>
          </FooterAction>
        </Grid>
      </Footer>
    </Stack>
  )
}

const Lead = styled(Surface)`
  width: min(100%, 64rem);
  margin-inline: auto;
`

const Track = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: min(82vw, 23rem);
  gap: ${({ theme }) => theme.spacing(1.5)};
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
    grid-auto-flow: initial;
    grid-auto-columns: initial;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: ${({ theme }) => theme.spacing(1.25)};
    margin-inline: 0;
    padding-inline: 0;
    overflow: visible;
  }
`

const TrackItem = styled.article`
  scroll-snap-align: start;
  min-width: 0;
`

const FlowBlock = styled.div`
  display: grid;
  align-content: start;
  gap: ${({ theme }) => theme.spacing(0.85)};
  height: 100%;
  padding-block: ${({ theme }) => theme.spacing(0.5)};
  border-top: 1px solid ${({ theme }) => theme.roles.border.subtle};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.spacing(1.25)};
    border-top: 0;
    border-radius: ${({ theme }) => theme.borderRadius.large};
    background: ${({ theme }) => theme.roles.surface.quiet};
  }
`

const MethodPanel = styled(Surface)`
  width: min(100%, 64rem);
  margin-inline: auto;
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
  gap: ${({ theme }) => theme.spacing(1.5)};
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

const WayBlock = styled.article`
  scroll-snap-align: start;
  display: grid;
  align-content: start;
  gap: ${({ theme }) => theme.spacing(0.75)};
  min-width: 0;
  padding-block: ${({ theme }) => theme.spacing(0.5)};
  border-top: 1px solid ${({ theme }) => theme.roles.border.subtle};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.spacing(1.25)};
    border-top: 0;
    border-radius: ${({ theme }) => theme.borderRadius.large};
    background: ${({ theme }) => theme.roles.surface.quiet};
  }
`

const Footer = styled(Surface)`
  width: min(100%, 64rem);
  margin-inline: auto;
`

const FooterAction = styled.div`
  display: flex;
  align-items: end;
  justify-content: flex-start;
`

const NoBreak = styled.span`
  white-space: nowrap;
  word-break: keep-all;
`

export default PracticeFields
export { NoBreak }
