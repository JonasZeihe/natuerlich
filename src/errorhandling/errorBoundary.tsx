// src/errorhandling/errorBoundary.tsx
'use client'

import React from 'react'
import styled from 'styled-components'
import { getClientLogger, type LogContext, type Logger } from '@/logging'
import { classifyErrorToCauses } from './errorTypes'

type Props = {
  logger?: Logger
  context?: Partial<LogContext>
  fallback?: React.ReactNode
  children: React.ReactNode
}

type State = {
  hasError: boolean
}

const BoundaryFallback = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 12rem;
  padding: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.roles.text.primary};
  background: ${({ theme }) => theme.roles.surface.canvas};
`

export class AppErrorBoundary extends React.Component<Props, State> {
  public state: State = { hasError: false }

  public static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  public componentDidCatch(error: unknown, info: React.ErrorInfo): void {
    const baseLogger = this.props.logger ?? getClientLogger()
    const logger = baseLogger.withContext({
      cat: 'boundary',
      phase: 'fail',
      ...(this.props.context ?? {}),
    })

    logger.error(
      'react_boundary_failure',
      error,
      {
        componentStack: info.componentStack ?? '',
      },
      classifyErrorToCauses(error, {
        componentStack: info.componentStack ?? '',
      })
    )
  }

  public render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <BoundaryFallback>Etwas ist schiefgelaufen.</BoundaryFallback>
        )
      )
    }

    return this.props.children
  }
}
