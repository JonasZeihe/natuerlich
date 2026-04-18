// src/components/feedback/Callout.tsx
'use client'

import type { HTMLAttributes, ReactNode } from 'react'
import styled, { css } from 'styled-components'

export type CalloutTone = 'neutral' | 'info' | 'warning' | 'danger' | 'positive'

export type CalloutProps = HTMLAttributes<HTMLDivElement> & {
  tone?: CalloutTone
  title?: string
  icon?: ReactNode
  actions?: ReactNode
}

const intentKeyForTone = (tone: CalloutTone) => {
  switch (tone) {
    case 'info':
      return 'info'
    case 'warning':
      return 'warning'
    case 'danger':
      return 'danger'
    case 'positive':
      return 'success'
    default:
      return 'neutral'
  }
}

const Root = styled.div<{ $tone: CalloutTone }>`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.75)};
  padding: ${({ theme }) => theme.spacing(1.25)};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};

  ${({ theme, $tone }) => {
    const intent = theme.getIntentRole(intentKeyForTone($tone))
    return css`
      background: ${intent.surface};
      color: ${intent.contrast};
      border: 1px solid ${intent.border};
    `
  }}
`

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(0.75)};
  min-width: 0;
`

const Left = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacingHalf(2)};
  min-width: 0;
`

const Actions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacingHalf(2)};
  flex: 0 0 auto;
`

const IconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  color: ${({ theme }) => theme.roles.text.subtle};
`

const Title = styled.strong`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Body = styled.div`
  color: inherit;
  opacity: 0.92;

  ul {
    margin: 0;
    padding-left: 1.15rem;
    display: grid;
    gap: ${({ theme }) => theme.spacing(0.35)};
  }

  li {
    margin: 0;
  }
`

const defaultRoleForTone = (tone: CalloutTone) =>
  tone === 'warning' || tone === 'danger' ? 'alert' : 'status'

export default function Callout({
  tone = 'neutral',
  title,
  icon,
  actions,
  role,
  children,
  ...rest
}: CalloutProps) {
  const resolvedRole = role ?? defaultRoleForTone(tone)
  const hasHeader = Boolean(title || icon || actions)

  return (
    <Root
      $tone={tone}
      role={resolvedRole}
      aria-live={resolvedRole === 'alert' ? 'assertive' : 'polite'}
      {...rest}
    >
      {hasHeader ? (
        <HeaderRow>
          <Left>
            {icon ? <IconWrap aria-hidden="true">{icon}</IconWrap> : null}
            {title ? <Title>{title}</Title> : null}
          </Left>
          {actions ? <Actions>{actions}</Actions> : null}
        </HeaderRow>
      ) : null}
      {children ? <Body>{children}</Body> : null}
    </Root>
  )
}
