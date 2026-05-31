// src/components/content/StatementBreak.tsx
'use client'

import { type ReactNode } from 'react'
import styled, { css } from 'styled-components'
import Surface from '@/components/primitives/Surface'
import type { AxisKey, MovementKey, SurfaceToneKey } from '@/design/theme'
import Typography from '@/design/typography'

type StatementWeight = 'quiet' | 'strong' | 'poster'
type StatementAlign = 'left' | 'center'

type Props = {
  children: ReactNode
  label?: ReactNode
  accent?: AxisKey
  movement?: MovementKey
  tone?: SurfaceToneKey
  weight?: StatementWeight
  align?: StatementAlign
  max?: string
}

const StatementBreak = ({
  children,
  label,
  accent,
  movement = 'arrival',
  tone = 'bare',
  weight = 'strong',
  align = 'left',
  max = '48rem',
}: Props) => (
  <Frame $max={max} $align={align}>
    <Panel
      tone={tone}
      movement={movement}
      radius={tone === 'bare' ? 'none' : 'large'}
      padding={tone === 'bare' ? 'none' : 'lg'}
      $weight={weight}
      $align={align}
    >
      {label ? (
        <Typography as="p" variant="caption" tone="soft">
          {label}
        </Typography>
      ) : null}

      <StatementText
        as="p"
        variant={weight === 'quiet' ? 'h3' : 'h2'}
        accent={accent}
        tone={accent ? 'neutral' : 'strong'}
        cadence="dense"
        align={align}
      >
        {children}
      </StatementText>
    </Panel>
  </Frame>
)

const Frame = styled.div<{ $max: string; $align: StatementAlign }>`
  width: min(100%, ${({ $max }) => $max});
  min-width: 0;
  margin-inline: ${({ $align }) => ($align === 'center' ? 'auto' : '0')};
  overflow: visible;
`

const Panel = styled(Surface)<{
  $weight: StatementWeight
  $align: StatementAlign
}>`
  display: grid;
  min-width: 0;
  gap: ${({ theme }) => theme.layout.flow.text};
  justify-items: ${({ $align }) => ($align === 'center' ? 'center' : 'start')};

  ${({ theme, $weight }) =>
    $weight === 'poster'
      ? css`
          padding-block: ${theme.layout.flow.chapter};
        `
      : $weight === 'strong'
        ? css`
            padding-block: ${theme.layout.flow.region};
          `
        : css`
            padding-block: ${theme.layout.flow.cluster};
          `}
`

const StatementText = styled(Typography)`
  width: 100%;
  max-width: 100%;
  min-width: 0;
  overflow-wrap: break-word;
  word-break: normal;
  hyphens: auto;
`

export default StatementBreak
