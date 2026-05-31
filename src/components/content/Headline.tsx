// src/components/content/Headline.tsx
'use client'

import type { ReactNode } from 'react'
import styled, { css } from 'styled-components'
import Stack from '@/components/primitives/Stack'
import type { AxisKey } from '@/design/theme'
import Typography from '@/design/typography'

type Weight = 'normal' | 'poster'

type Props = {
  title: ReactNode
  titleId?: string
  subheadline?: ReactNode
  children?: ReactNode
  accent?: AxisKey
  weight?: Weight
}

const Shell = styled.header<{ $weight: Weight }>`
  width: min(100%, 58rem);

  ${({ theme, $weight }) =>
    $weight === 'poster'
      ? css`
          max-width: 50rem;
          padding-left: ${theme.spacing(1.25)};
          border-left: 3px solid ${theme.roles.border.accent};

          @media (max-width: ${theme.breakpoints.sm}) {
            padding-left: ${theme.spacing(1)};
          }
        `
      : ''}
`

const Headline = ({
  title,
  titleId,
  subheadline,
  children,
  accent,
  weight = 'normal',
}: Props) => (
  <Shell $weight={weight}>
    <Stack gap={weight === 'poster' ? 1 : 1.25}>
      <Typography
        as="h2"
        variant="h2"
        id={titleId}
        accent={accent}
        cadence="dense"
        measure="title"
      >
        {title}
      </Typography>

      {subheadline ? (
        <Typography
          as="p"
          variant="subtitle"
          tone={weight === 'poster' ? 'strong' : 'soft'}
          cadence="open"
          measure="prose"
        >
          {subheadline}
        </Typography>
      ) : null}

      {children ? (
        <Typography
          as="p"
          variant="body"
          tone="soft"
          cadence="open"
          measure="prose"
        >
          {children}
        </Typography>
      ) : null}
    </Stack>
  </Shell>
)

export default Headline
