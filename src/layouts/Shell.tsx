// src/layouts/Shell.tsx
'use client'

import React from 'react'
import styled from 'styled-components'
import AppHeader from '@/layouts/AppHeader'
import AppFooter from '@/layouts/AppFooter'

type Props = { children: React.ReactNode }

export default function Shell({ children }: Props) {
  return (
    <Outer>
      <AppHeader />
      <MainShell>
        <Main id="main" role="main" tabIndex={-1}>
          {children}
        </Main>
      </MainShell>
      <AppFooter />
    </Outer>
  )
}

const Outer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  color: ${({ theme }) => theme.roles.text.primary};
  isolation: isolate;
`

const MainShell = styled.div`
  position: relative;
  z-index: 1;
  flex: 1 1 auto;
  width: 100%;
  min-width: 0;
`

const Main = styled.main`
  position: relative;
  width: 100%;
  max-width: 100vw;
  min-width: 0;
`
