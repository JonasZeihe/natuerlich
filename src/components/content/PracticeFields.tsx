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
  <PracticeStack aria-label={mobileAriaLabel}>
    <IntroCopy>
      <Typography
        as="p"
        variant="body"
        tone="soft"
        cadence="open"
        measure="wide"
      >
        {intro.body}
      </Typography>
    </IntroCopy>

    <MobileEditorialStack>
      {steps.map((item) => (
        <EditorialItem key={item.label}>
          <Typography as="h3" variant="h3" color="primary">
            {item.title}
          </Typography>

          <Typography as="p" variant="body" tone="soft" cadence="open">
            {item.body}
          </Typography>
        </EditorialItem>
      ))}
    </MobileEditorialStack>

    <DesktopEditorialRail>
      <ContentRail
        columns={3}
        min="18rem"
        itemWidth="min(84vw, 25rem)"
        max="64rem"
        variant="editorial"
        align="start"
      >
        {steps.map((item) => (
          <PracticeCard key={item.label} mode="line" stretch={false}>
            <Typography as="h3" variant="h3" color="primary">
              {item.title}
            </Typography>

            <Typography as="p" variant="body" tone="soft" cadence="open">
              {item.body}
            </Typography>
          </PracticeCard>
        ))}
      </ContentRail>
    </DesktopEditorialRail>

    <ResultFlow>
      <ResultPanel tone="quiet" movement={movement} radius="large" padding="lg">
        <Stack gap={undefined}>
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

      <ResultPanel tone="quiet" movement={movement} radius="large" padding="lg">
        <Stack gap={undefined}>
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

    <MethodPanel tone="note" movement={movement} radius="large" padding="lg">
      <MethodStack>
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
      </MethodStack>
    </MethodPanel>

    <MobileEditorialStack>
      {ways.map((way) => (
        <EditorialItem key={way.label}>
          <Typography as="h3" variant="h3" color="primary">
            {way.title}
          </Typography>

          <Typography as="p" variant="body" tone="soft" cadence="open">
            {way.body}
          </Typography>
        </EditorialItem>
      ))}
    </MobileEditorialStack>

    <DesktopEditorialRail>
      <ContentRail
        columns={3}
        min="18rem"
        itemWidth="min(84vw, 25rem)"
        max="64rem"
        variant="editorial"
        align="start"
      >
        {ways.map((way) => (
          <PracticeCard key={way.label} mode="line" stretch={false}>
            <Typography as="h3" variant="h3" color="primary">
              {way.title}
            </Typography>

            <Typography as="p" variant="body" tone="soft" cadence="open">
              {way.body}
            </Typography>
          </PracticeCard>
        ))}
      </ContentRail>
    </DesktopEditorialRail>

    <Footer tone="note" movement={movement} radius="large" padding="lg">
      <FooterGrid columns={2} min="18rem">
        <Stack gap={undefined}>
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
      </FooterGrid>
    </Footer>
  </PracticeStack>
)

const PracticeStack = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.region};
`

const IntroCopy = styled.div`
  width: min(100%, 58rem);
  margin-inline: auto;
`

const MobileEditorialStack = styled.div`
  display: grid;
  width: min(100%, 64rem);
  margin-inline: auto;
  gap: ${({ theme }) => theme.layout.flow.cluster};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`

const DesktopEditorialRail = styled.div`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
  }
`

const EditorialItem = styled.article`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.text};
  padding-top: ${({ theme }) => theme.layout.flow.block};
  border-top: 1px solid ${({ theme }) => theme.roles.border.subtle};
`

const PracticeCard = styled(ContentRailItem)`
  gap: ${({ theme }) => theme.layout.flow.block};
`

const ResultFlow = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.grid.gap};
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

const MethodStack = styled(Stack)`
  gap: ${({ theme }) => theme.layout.flow.block};
`

const MethodDefinition = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.text};
  padding-top: ${({ theme }) => theme.layout.flow.block};
  border-top: 1px solid ${({ theme }) => theme.roles.border.subtle};
`

const DefinitionList = styled.dl`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.text};
  margin: 0;
  padding: 0;
`

const DefinitionItem = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.text};

  dd {
    margin: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: minmax(9.5rem, 0.32fr) minmax(0, 1fr);
    gap: ${({ theme }) => theme.layout.flow.block};
    align-items: baseline;
  }
`

const Footer = styled(Surface)`
  width: min(100%, 64rem);
  margin-inline: auto;
`

const FooterGrid = styled(Grid)`
  gap: ${({ theme }) => theme.layout.grid.gap};
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
