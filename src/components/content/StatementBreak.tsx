// src/components/content/StatementBreak.tsx
'use client'

import { type ComponentProps, type ReactNode } from 'react'
import styled, { css } from 'styled-components'
import Surface from '@/components/primitives/Surface'
import type { DomainPracticeKey } from '@/design/theme'
import Typography from '@/design/typography'

type StatementWeight = 'quiet' | 'strong' | 'poster'
type StatementAlign = 'left' | 'center'
type SurfaceTone = NonNullable<ComponentProps<typeof Surface>['tone']>

type Props = {
  children: ReactNode
  label?: ReactNode
  accent?: DomainPracticeKey
  tone?: SurfaceTone
  weight?: StatementWeight
  align?: StatementAlign
  max?: string
}

const StatementBreak = ({
  children,
  label,
  accent,
  tone = 'bare',
  weight = 'strong',
  align = 'left',
  max = '48rem',
}: Props) => (
  <Frame $max={max} $align={align}>
    <Panel
      tone={tone}
      radius={tone === 'bare' ? 'none' : 'lg'}
      padding={tone === 'bare' ? 'none' : 'lg'}
      $weight={weight}
      $align={align}
    >
      {label ? (
        <Typography as="p" variant="small" tone="soft">
          {label}
        </Typography>
      ) : null}

      <StatementText
        as="p"
        variant={weight === 'quiet' ? 'h3' : 'h2'}
        tone="strong"
        measure="none"
        $accent={accent}
        $align={align}
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
  gap: ${({ theme }) => theme.layout.gap.text};
  justify-items: ${({ $align }) => ($align === 'center' ? 'center' : 'start')};

  ${({ theme, $weight }) =>
    $weight === 'poster'
      ? css`
          padding-block: ${theme.layout.gap.chapter};
        `
      : $weight === 'strong'
        ? css`
            padding-block: ${theme.layout.gap.region};
          `
        : css`
            padding-block: ${theme.layout.gap.cluster};
          `}
`

const StatementText = styled(Typography)<{
  $accent?: DomainPracticeKey
  $align: StatementAlign
}>`
  width: 100%;
  max-width: 100%;
  min-width: 0;
  overflow-wrap: break-word;
  word-break: normal;
  hyphens: auto;
  text-align: ${({ $align }) => $align};

  ${({ theme, $accent }) =>
    $accent
      ? css`
          color: ${theme.domain.practice[$accent]};
        `
      : ''}
`

export default StatementBreak
