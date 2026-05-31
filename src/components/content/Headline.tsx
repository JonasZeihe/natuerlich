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

const Headline = ({
  title,
  titleId,
  subheadline,
  children,
  accent,
  weight = 'normal',
}: Props) => (
  <Shell $weight={weight}>
    <HeadlineStack $weight={weight}>
      <Title
        as="h2"
        variant={weight === 'poster' ? 'h1' : 'h2'}
        id={titleId}
        accent={accent}
        cadence="dense"
        measure="title"
        $weight={weight}
      >
        {title}
      </Title>

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
          variant={weight === 'poster' ? 'subtitle' : 'body'}
          tone="soft"
          cadence="open"
          measure="prose"
        >
          {children}
        </Typography>
      ) : null}
    </HeadlineStack>
  </Shell>
)

const Shell = styled.header<{ $weight: Weight }>`
  width: min(100%, 58rem);

  ${({ theme, $weight }) =>
    $weight === 'poster'
      ? css`
          width: min(100%, 68rem);
          max-width: 68rem;
          padding-left: clamp(1rem, 1.8vw, 1.75rem);
          border-left: 3px solid ${theme.roles.border.accent};
        `
      : ''}
`

const HeadlineStack = styled(Stack)<{ $weight: Weight }>`
  gap: ${({ theme, $weight }) =>
    $weight === 'poster' ? theme.layout.flow.block : theme.layout.flow.block};
`

const Title = styled(Typography)<{ $weight: Weight }>`
  ${({ $weight }) =>
    $weight === 'poster'
      ? css`
          max-width: 17ch;
        `
      : ''}
`

export default Headline
