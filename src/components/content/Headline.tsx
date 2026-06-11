// src/components/content/Headline.tsx
'use client'

import type { ReactNode } from 'react'
import styled, { css } from 'styled-components'
import Stack from '@/components/primitives/Stack'
import type { DomainPracticeKey } from '@/design/theme'
import Typography from '@/design/typography'

type Weight = 'normal' | 'poster'
type AccentKey = DomainPracticeKey

type Props = {
  title: ReactNode
  titleId?: string
  subheadline?: ReactNode
  children?: ReactNode
  accent?: AccentKey
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
  <Shell>
    <HeadlineStack $weight={weight}>
      <Title
        as="h2"
        variant={weight === 'poster' ? 'h1' : 'h2'}
        id={titleId}
        measure="title"
        $accent={accent}
      >
        {title}
      </Title>

      {subheadline ? (
        <Typography as="p" variant="body" tone="strong" measure="text">
          {subheadline}
        </Typography>
      ) : null}

      {children ? (
        <Typography as="p" variant="body" tone="soft" measure="text">
          {children}
        </Typography>
      ) : null}
    </HeadlineStack>
  </Shell>
)

const Shell = styled.header`
  width: 100%;
  min-width: 0;
`

const HeadlineStack = styled(Stack)<{ $weight: Weight }>`
  gap: ${({ theme, $weight }) =>
    $weight === 'poster' ? theme.layout.gap.block : theme.layout.gap.text};
`

const Title = styled(Typography)<{ $accent?: AccentKey }>`
  ${({ theme, $accent }) =>
    $accent
      ? css`
          color: ${theme.domain.practice[$accent]};
        `
      : ''}
`

export default Headline
