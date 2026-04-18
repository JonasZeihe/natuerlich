// src/errorhandling/errorBoundary.tsx
'use client'

import React from 'react'
import { getClientLogger, type Logger, type LogContext } from '@/logging'
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

export class AppErrorBoundary extends React.Component<Props, State> {
  public state: State = { hasError: false }

  public static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  public componentDidCatch(error: unknown, info: React.ErrorInfo): void {
    const baseLogger = this.props.logger ?? getClientLogger()
    const logger = this.props.context
      ? baseLogger.withContext(this.props.context)
      : baseLogger

    logger.error(
      'react_error_boundary',
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
      return this.props.fallback ?? <div>Etwas ist schiefgelaufen.</div>
    }

    return this.props.children
  }
}

export { AppErrorBoundary as HelvetraErrorBoundary }
