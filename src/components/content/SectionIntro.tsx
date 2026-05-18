// src/components/content/SectionIntro.tsx
'use client'

import type { ReactNode } from 'react'
import styled from 'styled-components'
import Stack from '@/components/primitives/Stack'
import type { AxisKey } from '@/design/theme'
import Typography from '@/design/typography'

type Props = {
  label?: ReactNode
  title: ReactNode
  titleId?: string
  children?: ReactNode
  note?: ReactNode
  accent?: AxisKey
  noteAccent?: AxisKey
  align?: 'left' | 'center'
  max?: string
}

const Shell = styled.div<{ $align: 'left' | 'center'; $max: string }>`
  width: min(100%, ${({ $max }) => $max});
  margin-inline: ${({ $align }) => ($align === 'center' ? 'auto' : '0')};
  text-align: ${({ $align }) => $align};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }
`

const Note = styled.div`
  max-width: 42rem;
  margin-top: ${({ theme }) => theme.spacing(1.25)};
`

const SectionIntro = ({
  label,
  title,
  titleId,
  children,
  note,
  accent = 'axisDensity',
  noteAccent = 'axisFlow',
  align = 'left',
  max = '58rem',
}: Props) => (
  <Shell $align={align} $max={max}>
    <Stack gap={5}>
      {label ? (
        <Typography as="p" variant="caption" gutter={false} accent={accent}>
          {label}
        </Typography>
      ) : null}

      <Typography
        as="h2"
        variant="h2"
        id={titleId}
        gutter={false}
        accent={accent}
        cadence="dense"
        measure="title"
      >
        {title}
      </Typography>

      {children ? (
        <Typography
          as="p"
          variant="body"
          gutter={false}
          tone="soft"
          cadence="open"
          measure="prose"
        >
          {children}
        </Typography>
      ) : null}
    </Stack>

    {note ? (
      <Note>
        <Typography as="p" variant="body" gutter={false} accent={noteAccent}>
          {note}
        </Typography>
      </Note>
    ) : null}
  </Shell>
)

export default SectionIntro
