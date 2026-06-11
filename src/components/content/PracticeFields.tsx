// src/components/content/PracticeFields.tsx
'use client'

import { type ReactNode } from 'react'
import styled, { css } from 'styled-components'
import Button from '@/components/actions/Button'
import Grid from '@/components/primitives/Grid'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
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
  mobileAriaLabel,
  onGoToIntegration,
}: Props) => (
  <PracticeStack aria-label={mobileAriaLabel}>
    <IntroCopy>
      <Typography as="p" variant="body" tone="soft">
        {intro.body}
      </Typography>
    </IntroCopy>

    <PrincipleGrid>
      {steps.map((item) => (
        <PrincipleItem key={item.label} $tone={getPracticeTone(item)}>
          <Typography as="h3" variant="h3">
            {item.title}
          </Typography>

          <SoftText as="p" variant="body">
            {item.body}
          </SoftText>
        </PrincipleItem>
      ))}
    </PrincipleGrid>

    <PanelGrid>
      <ResultPanel tone="card" radius="lg" padding="lg">
        <Stack>
          <Typography as="h3" variant="h3" tone="strong">
            {regulation.title}
          </Typography>

          <Typography as="p" variant="body" tone="soft" measure="wide">
            {regulation.body}
          </Typography>
        </Stack>
      </ResultPanel>

      <ResultPanel tone="card" radius="lg" padding="lg">
        <Stack>
          <Typography as="h3" variant="h3" tone="strong">
            {result.title}
          </Typography>

          <Typography as="p" variant="body" tone="soft" measure="wide">
            {result.body}
          </Typography>
        </Stack>
      </ResultPanel>
    </PanelGrid>

    <MethodPanel tone="note" radius="lg" padding="lg">
      <MethodStack>
        <MethodHeader>
          <Typography as="h2" variant="h2" tone="strong">
            {method.title}
          </Typography>

          <Typography as="p" variant="body" tone="soft" measure="wide">
            {method.body}
          </Typography>
        </MethodHeader>

        <MethodDefinition>
          <Typography as="h3" variant="h3" tone="strong">
            {method.name}
          </Typography>

          <DefinitionList>
            {method.terms.map((term) => (
              <DefinitionItem key={String(term.name)}>
                <TermName>{term.name}</TermName>
                <TermMeaning>{term.meaning}</TermMeaning>
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

          <SoftText as="p" variant="body">
            {way.body}
          </SoftText>
        </PracticeCard>
      ))}
    </PracticeWayGrid>

    <Footer tone="note" radius="lg" padding="lg">
      <FooterGrid columns={2} min="18rem">
        <Stack>
          <Typography as="h3" variant="h3" tone="strong">
            Manchmal ist ein Kurs der richtige Anfang. Manchmal braucht es
            Einzelunterricht. Manchmal entsteht daraus eine regelmäßige Gruppe.
          </Typography>

          <Typography as="p" variant="body" tone="soft" measure="wide">
            Entscheidend ist nicht, wie das Format heißt. Entscheidend ist, ob
            es zu deinem Stand, deinem Alltag und deiner Richtung passt.
          </Typography>
        </Stack>

        <FooterAction>
          <Typography as="p" variant="body" tone="soft">
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
  gap: ${({ theme }) => theme.layout.gap.region};
  width: 100%;
  min-width: 0;
`

const IntroCopy = styled.div`
  max-width: 64ch;
  min-width: 0;
`

const practiceToneCSS = (tone: PracticeTone) => css`
  ${({ theme }) => {
    const { palette } = theme

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
  gap: ${({ theme }) => theme.layout.gap.cluster};
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: ${({ theme }) => theme.layout.gap.grid};
  }
`

const PrincipleItem = styled.article<{ $tone: PracticeTone }>`
  display: grid;
  gap: ${({ theme }) => theme.layout.gap.text};
  min-width: 0;
  padding-top: ${({ theme }) => theme.layout.gap.block};
  border-top: 1px solid;
  ${({ $tone }) => practiceToneCSS($tone)}

  h3 {
    max-width: 18ch;
  }
`

const PanelGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.gap.grid};
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const ResultPanel = styled(Surface)`
  height: 100%;
  background: ${({ theme }) => theme.color.surface.card};
`

const MethodPanel = styled(Surface)`
  background: ${({ theme }) => theme.color.surface.note};
`

const MethodStack = styled(Stack)`
  gap: ${({ theme }) => theme.layout.gap.block};
`

const MethodHeader = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.gap.text};
  max-width: 64ch;
`

const MethodDefinition = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.gap.text};
  padding-top: ${({ theme }) => theme.layout.gap.block};
  border-top: 1px solid
    color-mix(
      in srgb,
      ${({ theme }) => theme.color.border.default} 52%,
      transparent
    );
`

const DefinitionList = styled.dl`
  display: grid;
  gap: ${({ theme }) => theme.layout.gap.text};
  margin: 0;
  padding: 0;
`

const DefinitionItem = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.gap.text};

  @media (min-width: ${({ theme }) => theme.breakpoint.sm}) {
    grid-template-columns: minmax(9.5rem, 0.32fr) minmax(0, 1fr);
    gap: ${({ theme }) => theme.layout.gap.block};
    align-items: baseline;
  }
`

const TermName = styled.dt`
  margin: 0;
  font-family: ${({ theme }) => theme.text.body.fontFamily};
  font-size: ${({ theme }) => theme.text.body.fontSize};
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  line-height: ${({ theme }) => theme.text.body.lineHeight};
  color: ${({ theme }) => theme.color.text.default};
`

const TermMeaning = styled.dd`
  margin: 0;
  font-family: ${({ theme }) => theme.text.body.fontFamily};
  font-size: ${({ theme }) => theme.text.body.fontSize};
  font-weight: ${({ theme }) => theme.text.body.fontWeight};
  line-height: ${({ theme }) => theme.text.body.lineHeight};
  color: ${({ theme }) => theme.color.text.soft};
`

const PracticeWayGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.gap.grid};
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

const PracticeCard = styled.article<{ $tone: PracticeTone }>`
  display: grid;
  align-content: start;
  gap: ${({ theme }) => theme.layout.gap.block};
  min-width: 0;
  padding: ${({ theme }) => theme.layout.surfacePadding.lg};
  border-radius: ${({ theme }) => theme.radius.lg};
  ${({ $tone }) => practiceToneCSS($tone)}

  h3 {
    max-width: 18ch;
  }
`

const Footer = styled(Surface)``

const FooterGrid = styled(Grid)`
  gap: ${({ theme }) => theme.layout.gap.grid};
`

const FooterAction = styled.div`
  display: grid;
  align-content: center;
  gap: ${({ theme }) => theme.layout.gap.block};
  max-width: 32rem;

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    justify-self: end;
    text-align: right;
  }
`

const FooterButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space(0.75)};

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    justify-content: flex-end;
  }
`

const BlogLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: ${({ theme }) => theme.space(4.6)};
  min-width: ${({ theme }) => theme.space(7.2)};
  padding: ${({ theme }) => `${theme.space(1.45)} ${theme.space(1.6)}`};
  border: 1px solid
    ${({ theme }) => theme.component.button.secondary.default.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) =>
    theme.component.button.secondary.default.background};
  color: ${({ theme }) => theme.component.button.secondary.default.text};
  font-family: ${({ theme }) => theme.font.family.main};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  line-height: 1.12;
  letter-spacing: ${({ theme }) => theme.font.letterSpacing.normal};
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  transition: ${({ theme }) => theme.motion.css.interactive.control};

  &:hover {
    background: ${({ theme }) =>
      theme.component.button.secondary.hover.background};
    border-color: ${({ theme }) =>
      theme.component.button.secondary.hover.border};
    color: ${({ theme }) => theme.component.button.secondary.hover.text};
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
    box-shadow: ${({ theme }) => theme.color.focus.shadow};
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
