'use client'

import type { ReactNode } from 'react'
import styled from 'styled-components'

type PageScaffoldProps = {
  intro?: ReactNode
  children: ReactNode
}

export default function PageScaffold({ intro, children }: PageScaffoldProps) {
  return (
    <Outer>
      <Inner>
        {intro ? <Intro>{intro}</Intro> : null}
        <Content>{children}</Content>
      </Inner>
    </Outer>
  )
}

const Outer = styled.div`
  width: 100%;
`

const Inner = styled.div`
  width: min(
    calc(100% - ${({ theme }) => theme.spacing(3)}),
    ${({ theme }) => theme.layout.containers.page}
  );
  margin-inline: auto;
  padding-block: ${({ theme }) => theme.spacing(3.5)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-block: ${({ theme }) => theme.spacing(2.5)};
  }
`

const Intro = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(2.5)};
`

const Content = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
`
