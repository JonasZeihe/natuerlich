'use client'

import { type ReactNode } from 'react'
import styled from 'styled-components'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import type { AxisKey, MovementKey, SurfaceToneKey } from '@/design/theme'
import Typography from '@/design/typography'

type TextBlock = {
  label?: ReactNode
  title: ReactNode
  body: ReactNode
  accent?: AxisKey
  tone?: SurfaceToneKey
}

type ForgeBlock = TextBlock & {
  items: readonly {
    label: ReactNode
    text: ReactNode
  }[]
}

type Props = {
  scene: TextBlock
  forge: ForgeBlock
  center: TextBlock
  ways: readonly TextBlock[]
  movement: MovementKey
  mobileAriaLabel: string
  footer?: ReactNode
}

const Shell = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing(1.25)};
  }
`

const Flow = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1)};
`

const Passage = styled(Surface)<{ $compact?: boolean }>`
  position: relative;
  overflow: hidden;
  padding-top: ${({ theme, $compact }) => theme.spacing($compact ? 1.5 : 2.25)};
  padding-bottom: ${({ theme, $compact }) =>
    theme.spacing($compact ? 1.5 : 2.25)};
`

const PassageInner = styled.div<{ $wide?: boolean }>`
  width: min(100%, ${({ $wide }) => ($wide ? '62rem' : '48rem')});
`

const PassageLine = styled.div`
  width: 3rem;
  height: 1px;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  background: ${({ theme }) => theme.roles.border.subtle};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: ${({ theme }) => theme.spacing(1.25)};
  }
`

const Split = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  gap: ${({ theme }) => theme.spacing(2)};
  align-items: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing(1.25)};
  }
`

const ForgeList = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1)};
  margin: 0;
  padding: 0;
  list-style: none;
`

const ForgeItem = styled.li`
  display: grid;
  grid-template-columns: minmax(6rem, 0.28fr) minmax(0, 1fr);
  gap: ${({ theme }) => theme.spacing(1)};
  align-items: baseline;
  padding-top: ${({ theme }) => theme.spacing(1)};
  border-top: 1px solid ${({ theme }) => theme.roles.border.subtle};

  &:first-child {
    padding-top: 0;
    border-top: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing(0.35)};
  }
`

const Center = styled(Surface)`
  display: grid;
  align-items: center;
  min-height: ${({ theme }) => theme.spacing(18)};
`

const CenterText = styled.div`
  width: min(100%, 58rem);
`

const WayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing(1)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const WayCard = styled(Surface)`
  height: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    border-color: transparent;
    background: transparent;
    padding-right: 0;
    padding-left: 0;
    box-shadow: none;
  }
`

const Footer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(0.25)};
`

const accentOf = (block: TextBlock, fallback: AxisKey): AxisKey =>
  block.accent ?? fallback

const toneOf = (block: TextBlock, fallback: SurfaceToneKey): SurfaceToneKey =>
  block.tone ?? fallback

const PassageText = ({
  block,
  accent,
  titleVariant = 'h3',
  wide = false,
}: {
  block: TextBlock
  accent: AxisKey
  titleVariant?: 'h2' | 'h3'
  wide?: boolean
}) => (
  <PassageInner $wide={wide}>
    <Stack gap={3}>
      {block.label ? (
        <Typography as="p" variant="caption" gutter={false} accent={accent}>
          {block.label}
        </Typography>
      ) : null}

      <Typography
        as={titleVariant}
        variant={titleVariant}
        gutter={false}
        color="primary"
        measure={wide ? 'wide' : 'full'}
      >
        {block.title}
      </Typography>

      <Typography
        as="p"
        variant="body"
        gutter={false}
        tone="soft"
        cadence="open"
      >
        {block.body}
      </Typography>
    </Stack>
  </PassageInner>
)

const ForgeContent = ({
  forge,
  accent,
}: {
  forge: ForgeBlock
  accent: AxisKey
}) => (
  <Stack gap={4}>
    <PassageText block={forge} accent={accent} titleVariant="h2" wide />

    <ForgeList>
      {forge.items.map((item, index) => (
        <ForgeItem key={`${item.label}-${index}`}>
          <Typography
            as="span"
            variant="caption"
            gutter={false}
            accent={accent}
          >
            {item.label}
          </Typography>

          <Typography
            as="p"
            variant="body"
            gutter={false}
            tone="soft"
            cadence="open"
          >
            {item.text}
          </Typography>
        </ForgeItem>
      ))}
    </ForgeList>
  </Stack>
)

const PracticeFields = ({
  scene,
  forge,
  center,
  ways,
  movement,
  mobileAriaLabel,
  footer,
}: Props) => {
  const sceneAccent = accentOf(scene, 'axisTension')
  const forgeAccent = accentOf(forge, 'axisDensity')
  const centerAccent = accentOf(center, 'axisDensity')

  return (
    <Shell aria-label={mobileAriaLabel}>
      <Flow>
        <Passage
          tone={toneOf(scene, 'threshold')}
          movement={movement}
          radius="large"
          bordered
          padding="lg"
          weight="steady"
        >
          <PassageLine />
          <PassageText
            block={scene}
            accent={sceneAccent}
            titleVariant="h2"
            wide
          />
        </Passage>

        <Split>
          <Passage
            tone={toneOf(forge, 'card')}
            movement={movement}
            radius="large"
            bordered
            padding="lg"
            weight="steady"
            $compact
          >
            <ForgeContent forge={forge} accent={forgeAccent} />
          </Passage>
        </Split>

        <Center
          tone={toneOf(center, 'note')}
          movement={movement}
          radius="large"
          bordered
          padding="lg"
          weight="steady"
        >
          <CenterText>
            <PassageText
              block={center}
              accent={centerAccent}
              titleVariant="h2"
              wide
            />
          </CenterText>
        </Center>
      </Flow>

      <WayGrid>
        {ways.map((way, index) => {
          const accent = accentOf(way, 'axisDensity')

          return (
            <WayCard
              key={`${way.label ?? index}`}
              tone={toneOf(way, 'card')}
              movement={movement}
              radius="large"
              bordered
              padding="md"
              weight="steady"
            >
              <PassageText block={way} accent={accent} />
            </WayCard>
          )
        })}
      </WayGrid>

      {footer ? <Footer>{footer}</Footer> : null}
    </Shell>
  )
}

export default PracticeFields
