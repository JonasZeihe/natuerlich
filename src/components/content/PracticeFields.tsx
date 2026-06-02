// src/components/content/PracticeFields.tsx
'use client'

import { type ReactNode } from 'react'
import styled, { css } from 'styled-components'
import Button from '@/components/actions/Button'
import Grid from '@/components/primitives/Grid'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import type { MovementKey } from '@/design/theme'
import Typography from '@/design/typography'

type PracticeTone =
  | 'breath'
  | 'release'
  | 'attention'
  | 'qigong'
  | 'yoga'
  | 'taiji'

type Step = {
  label: string
  title: ReactNode
  body: ReactNode
  tone?: PracticeTone
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
  tone?: PracticeTone
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

const blogUrl = 'https://ziran.onrender.com/'

const inferPracticeTone = (label: string): PracticeTone => {
  if (label === 'Atem') return 'breath'
  if (label === 'Entspannung') return 'release'
  if (label === 'Achtsamkeit') return 'attention'
  if (label === 'Qigong') return 'qigong'
  if (label === 'Yoga') return 'yoga'
  return 'taiji'
}

const getPracticeTone = (item: Pick<Step, 'label' | 'tone'>): PracticeTone =>
  item.tone ?? inferPracticeTone(item.label)

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
      <Typography as="p" variant="body" tone="soft" cadence="open">
        {intro.body}
      </Typography>
    </IntroCopy>

    <PrincipleGrid>
      {steps.map((item) => (
        <PrincipleItem key={item.label} $tone={getPracticeTone(item)}>
          <Typography as="h3" variant="h3">
            {item.title}
          </Typography>

          <SoftText as="p" variant="body" cadence="open">
            {item.body}
          </SoftText>
        </PrincipleItem>
      ))}
    </PrincipleGrid>

    <PanelGrid>
      <ResultPanel tone="card" movement={movement} radius="large" padding="lg">
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

      <ResultPanel tone="card" movement={movement} radius="large" padding="lg">
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
    </PanelGrid>

    <MethodPanel tone="note" movement={movement} radius="large" padding="lg">
      <MethodStack>
        <MethodHeader>
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
        </MethodHeader>

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

    <PracticeWayGrid>
      {ways.map((way) => (
        <PracticeCard key={way.label} $tone={getPracticeTone(way)}>
          <Typography as="h3" variant="h3">
            {way.title}
          </Typography>

          <SoftText as="p" variant="body" cadence="open">
            {way.body}
          </SoftText>
        </PracticeCard>
      ))}
    </PracticeWayGrid>

    <Footer tone="note" movement="nextStep" radius="large" padding="lg">
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
          <Typography as="p" variant="body" tone="soft" cadence="open">
            Wenn dich die Zusammenhänge interessieren: In meinem Blog erzähle
            ich mehr über Stress, Praxis, meinen Weg und die Ideen hinter dieser
            Arbeit.
          </Typography>

          <FooterButtons>
            <Button variant="primary" onClick={onGoToIntegration}>
              Angebote ansehen
            </Button>

            <BlogLink href={blogUrl} target="_blank" rel="noreferrer">
              Blog öffnen
            </BlogLink>
          </FooterButtons>
        </FooterAction>
      </FooterGrid>
    </Footer>
  </PracticeStack>
)

const PracticeStack = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.region};
  width: 100%;
  min-width: 0;
`

const IntroCopy = styled.div`
  max-width: 64ch;
  min-width: 0;
`

const practiceToneCSS = (tone: PracticeTone) => css`
  ${({ theme }) => {
    const { palette } = theme.foundations

    const map = {
      breath: {
        background: 'transparent',
        text: null,
        soft: palette.inkSoft,
        border: 'color-mix(in srgb, #B87336 38%, transparent)',
      },
      release: {
        background: 'transparent',
        text: null,
        soft: palette.inkSoft,
        border: 'color-mix(in srgb, #8D8B84 38%, transparent)',
      },
      attention: {
        background: 'transparent',
        text: null,
        soft: palette.inkSoft,
        border: 'color-mix(in srgb, #142B35 38%, transparent)',
      },
      qigong: {
        background: palette.blueLight,
        text: null,
        soft: palette.inkSoft,
        border: 'transparent',
      },
      yoga: {
        background: palette.sandLight,
        text: null,
        soft: palette.inkSoft,
        border: 'transparent',
      },
      taiji: {
        background: palette.blueDeep,
        text: palette.ivory,
        soft: 'color-mix(in srgb, #F8F1E5 82%, transparent)',
        border: 'transparent',
      },
    } satisfies Record<
      PracticeTone,
      {
        background: string
        text: string | null
        soft: string
        border: string
      }
    >

    const colors = map[tone]

    return css`
      --practice-soft: ${colors.soft};

      border-color: ${colors.border};
      background: ${colors.background};
      ${colors.text
        ? css`
            color: ${colors.text};
          `
        : ''}
    `
  }}
`

const SoftText = styled(Typography)`
  color: var(--practice-soft);
`

const PrincipleGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.cluster};
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: ${({ theme }) => theme.layout.grid.gap};
  }
`

const PrincipleItem = styled.article<{ $tone: PracticeTone }>`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.text};
  min-width: 0;
  padding-top: ${({ theme }) => theme.layout.flow.block};
  border-top: 1px solid;
  ${({ $tone }) => practiceToneCSS($tone)}

  h3 {
    max-width: 18ch;
  }
`

const PanelGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.grid.gap};
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const ResultPanel = styled(Surface)`
  height: 100%;
  background: ${({ theme }) => theme.roles.movement.practice.card};
`

const MethodPanel = styled(Surface)`
  background: ${({ theme }) => theme.roles.movement.practice.note};
`

const MethodStack = styled(Stack)`
  gap: ${({ theme }) => theme.layout.flow.block};
`

const MethodHeader = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.text};
  max-width: 64ch;
`

const MethodDefinition = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.text};
  padding-top: ${({ theme }) => theme.layout.flow.block};
  border-top: 1px solid
    color-mix(
      in srgb,
      ${({ theme }) => theme.roles.movement.practice.border} 52%,
      transparent
    );
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

const PracticeWayGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.grid.gap};
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

const PracticeCard = styled.article<{ $tone: PracticeTone }>`
  display: grid;
  align-content: start;
  gap: ${({ theme }) => theme.layout.flow.block};
  min-width: 0;
  padding: ${({ theme }) => theme.layout.surface.lg};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  ${({ $tone }) => practiceToneCSS($tone)}

  h3 {
    max-width: 18ch;
  }
`

const Footer = styled(Surface)``

const FooterGrid = styled(Grid)`
  gap: ${({ theme }) => theme.layout.grid.gap};
`

const FooterAction = styled.div`
  display: grid;
  align-content: center;
  gap: ${({ theme }) => theme.layout.flow.block};
  max-width: 32rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-self: end;
    text-align: right;
  }
`

const FooterButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(0.75)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: flex-end;
  }
`

const BlogLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: ${({ theme }) => theme.spacing(4.6)};
  min-width: ${({ theme }) => theme.spacing(7.2)};
  padding: ${({ theme }) => `${theme.spacingHalf(1.45)} ${theme.spacing(1.6)}`};
  border: 0;
  border-radius: 0.78rem;
  background: ${({ theme }) => theme.roles.movement.nextStep.card};
  color: ${({ theme }) => theme.roles.movement.nextStep.deep};
  font-family: ${({ theme }) => theme.typography.fontFamily.button};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1.12;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.normal};
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  transition: ${({ theme }) => theme.motion.css.interactive.control};

  &:hover {
    background: ${({ theme }) => theme.roles.movement.nextStep.quiet};
    color: ${({ theme }) => theme.roles.movement.nextStep.deep};
    text-decoration: none;
    transform: translateY(
      calc(${({ theme }) => theme.motion.foundations.distances.nudge} * -1)
    );
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid transparent;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.color.border.focus};
  }

  @media ${({ theme }) => theme.motion.reduced.media} {
    transition: none;
  }
`

const NoBreak = styled.span`
  white-space: nowrap;
  word-break: keep-all;
`

export default PracticeFields
export { NoBreak }
