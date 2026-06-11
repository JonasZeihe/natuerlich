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
  <Shell>
    <HeadlineStack>
      <Title
        as="h2"
        variant={weight === 'poster' ? 'h1' : 'h2'}
        id={titleId}
        cadence="dense"
        measure="none"
        $accent={accent}
      >
        {title}
      </Title>

      {subheadline ? (
        <Text
          as="p"
          variant="subtitle"
          tone={weight === 'poster' ? 'strong' : 'soft'}
          cadence="open"
        >
          {subheadline}
        </Text>
      ) : null}

      {children ? (
        <Text
          as="p"
          variant={weight === 'poster' ? 'subtitle' : 'body'}
          tone="soft"
          cadence="open"
        >
          {children}
        </Text>
      ) : null}
    </HeadlineStack>
  </Shell>
)

const Shell = styled.header`
  width: 100%;
  min-width: 0;
`

const HeadlineStack = styled(Stack)`
  gap: ${({ theme }) => theme.layout.flow.block};
`

const Title = styled(Typography)<{ $accent?: AxisKey }>`
  max-width: 24ch;

  ${({ theme, $accent }) =>
    $accent
      ? css`
          color: ${theme.getAxisRole($accent).text};
        `
      : ''}
`

const Text = styled(Typography)`
  max-width: 64ch;
`

export default Headline
