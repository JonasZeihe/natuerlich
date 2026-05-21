// src/components/content/PracticeFields.tsx
'use client'

import { type ReactNode } from 'react'
import styled from 'styled-components'
import Button from '@/components/actions/Button'
import ContentRail, { ContentRailItem } from '@/components/content/ContentRail'
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

type MethodTerm = {
  name: ReactNode
  meaning: ReactNode
}

type Method = {
  title: ReactNode
  body: ReactNode
  name: ReactNode
  terms: readonly MethodTerm[]
}

type Way = {
  label: string
  title: ReactNode
  body: ReactNode
}

type Props = {
  intro: Step
  steps: readonly Step[]
  regulation: Step
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
  regulation,
  result,
  method,
  ways,
  movement,
  mobileAriaLabel,
  onGoToIntegration,
}: Props) => (
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

    <PracticeProgression>
      <ContentRail columns={3} min="16rem" gap={1.25} max="64rem">
        {steps.map((item) => (
          <ContentRailItem key={item.label}>
            <Typography as="h3" variant="h3" color="primary">
              {item.title}
            </Typography>

            <Typography as="p" variant="body" tone="soft" cadence="open">
              {item.body}
            </Typography>
          </ContentRailItem>
        ))}
      </ContentRail>

      <ResultFlow>
        <ResultPanel
          tone="quiet"
          movement={movement}
          radius="large"
          padding="lg"
        >
          <Stack gap={0.85}>
            <Typography as="h3" variant="h3" color="primary">
              {regulation.title}
            </Typography>

            <Typography
              as="p"
              variant="body"
              tone="soft"
              cadence="open"
              measure="wide"
            >
              {regulation.body}
            </Typography>
          </Stack>
        </ResultPanel>

        <ResultPanel
          tone="quiet"
          movement={movement}
          radius="large"
          padding="lg"
        >
          <Stack gap={0.85}>
            <Typography as="h3" variant="h3" color="primary">
              {result.title}
            </Typography>

            <Typography
              as="p"
              variant="body"
              tone="soft"
              cadence="open"
              measure="wide"
            >
              {result.body}
            </Typography>
          </Stack>
        </ResultPanel>
      </ResultFlow>
    </PracticeProgression>

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

        <MethodDefinition>
          <Typography as="h3" variant="subtitle" color="primary">
            {method.name}
          </Typography>

          <DefinitionList>
            {method.terms.map((term) => (
              <DefinitionItem key={String(term.name)}>
                <Typography as="dt" variant="body" color="primary">
                  {term.name}
                </Typography>

                <Typography as="dd" variant="body" tone="soft" cadence="open">
                  {term.meaning}
                </Typography>
              </DefinitionItem>
            ))}
          </DefinitionList>
        </MethodDefinition>
      </Stack>
    </MethodPanel>

    <ContentRail columns={3} min="16rem" gap={1.5} max="64rem">
      {ways.map((way) => (
        <ContentRailItem key={way.label}>
          <Typography as="h3" variant="subtitle" color="primary">
            {way.title}
          </Typography>

          <Typography as="p" variant="body" tone="soft" cadence="open">
            {way.body}
          </Typography>
        </ContentRailItem>
      ))}
    </ContentRail>

    <Footer tone="note" movement={movement} radius="large" padding="lg">
      <Grid columns={2} min="18rem" gap={2}>
        <Stack gap={1}>
          <Typography as="h3" variant="h3" color="primary">
            Manchmal ist ein Kurs der richtige Anfang. Manchmal braucht es
            Einzelunterricht. Manchmal entsteht daraus eine regelmäßige Gruppe.
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

const Lead = styled(Surface)`
  width: min(100%, 64rem);
  margin-inline: auto;
`

const PracticeProgression = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.5)};
`

const ResultFlow = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.25)};
  width: min(100%, 64rem);
  margin-inline: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    align-items: stretch;
  }
`

const ResultPanel = styled(Surface)`
  height: 100%;
`

const MethodPanel = styled(Surface)`
  width: min(100%, 64rem);
  margin-inline: auto;
`

const MethodDefinition = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.85)};
  padding-top: ${({ theme }) => theme.spacing(1)};
  border-top: 1px solid ${({ theme }) => theme.roles.border.subtle};
`

const DefinitionList = styled.dl`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.65)};
  margin: 0;
  padding: 0;
`

const DefinitionItem = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacingHalf(0.65)};

  dd {
    margin: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: minmax(9.5rem, 0.32fr) minmax(0, 1fr);
    gap: ${({ theme }) => theme.spacing(1)};
    align-items: baseline;
  }
`

const Footer = styled(Surface)`
  width: min(100%, 64rem);
  margin-inline: auto;
`

const FooterAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const NoBreak = styled.span`
  white-space: nowrap;
  word-break: keep-all;
`

export default PracticeFields
export { NoBreak }
