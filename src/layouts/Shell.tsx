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
      <Atmosphere aria-hidden="true" />
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
  overflow: clip;
`

const Atmosphere = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background:
    radial-gradient(
      120% 28rem at 50% -8%,
      ${({ theme }) =>
          theme.mode === 'dark'
            ? 'rgba(95, 135, 134, 0.1)'
            : 'rgba(47, 78, 80, 0.065)'}
        0%,
      transparent 72%
    ),
    radial-gradient(
      90% 22rem at 100% 82%,
      ${({ theme }) =>
          theme.mode === 'dark'
            ? 'rgba(209, 102, 44, 0.05)'
            : 'rgba(162, 74, 30, 0.035)'}
        0%,
      transparent 76%
    );
  opacity: 0.92;
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
