// src/components/content/Headline.tsx
'use client'

import type { ReactNode } from 'react'
import styled from 'styled-components'
import Stack from '@/components/primitives/Stack'
import type { AxisKey } from '@/design/theme'
import Typography from '@/design/typography'

type Props = {
  title: ReactNode
  titleId?: string
  subheadline?: ReactNode
  children?: ReactNode
  accent?: AxisKey
}

const Shell = styled.header`
  width: min(100%, 58rem);
`

const Headline = ({ title, titleId, subheadline, children, accent }: Props) => (
  <Shell>
    <Stack gap={1.25}>
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
          tone="soft"
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
