// src/layouts/Shell.tsx
'use client'

import React from 'react'
import styled from 'styled-components'
import { AppErrorBoundary } from '@/errorhandling/errorBoundary'
import AppFooter from '@/layouts/AppFooter'
import AppHeader from '@/layouts/AppHeader'

type Props = { children: React.ReactNode }

export default function Shell({ children }: Props) {
  return (
    <Outer>
      <AppHeader />
      <MainShell>
        <AppErrorBoundary
          context={{
            cat: 'boundary',
            phase: 'fail',
            fields: {
              area: 'shell',
            },
          }}
        >
          <Main id="main" role="main" tabIndex={-1}>
            {children}
          </Main>
        </AppErrorBoundary>
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
  width: 100%;
  background: ${({ theme }) => theme.roles.surface.canvas};
`

const MainShell = styled.div`
  position: relative;
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
