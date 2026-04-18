// src/components/card/FeatureCard.tsx
'use client'

import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import Card from '@/components/primitives/Card'
import Badge from '@/components/feedback/Badge'
import type { BadgeKey } from '@/components/feedback/BadgeLibrary'
import Typography from '@/design/typography'

type FeatureCardProps = {
  title?: string
  description?: string
  badges?: BadgeKey[]
  targetId?: string
  href?: string
  external?: boolean
  ariaLabel?: string
}

const hasText = (value: string | undefined): boolean =>
  typeof value === 'string' && value.trim().length > 0

export default function FeatureCard({
  title = '',
  description = '',
  badges = [],
  targetId,
  href,
  external = false,
  ariaLabel,
}: FeatureCardProps) {
  const router = useRouter()

  const handleScroll = useCallback(() => {
    if (!targetId) return
    const element = document.getElementById(targetId)
    if (!element) return
    window.dispatchEvent(
      new CustomEvent('portfolio-project-highlight', {
        detail: { id: targetId },
      })
    )
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [targetId])

  const handleInternalNav = useCallback(() => {
    if (!href) return
    router.push(href)
  }, [href, router])

  const handleExternalNav = useCallback(() => {
    if (!href) return
    window.open(href, '_blank', 'noopener,noreferrer')
  }, [href])

  const handleClick = useCallback(() => {
    if (targetId && !href) {
      handleScroll()
      return
    }

    if (href && !external) {
      handleInternalNav()
      return
    }

    if (href && external) {
      handleExternalNav()
    }
  }, [
    external,
    handleExternalNav,
    handleInternalNav,
    handleScroll,
    href,
    targetId,
  ])

  const isActionable = Boolean(targetId || href)
  const badge = badges[0]

  const resolvedAriaLabel = useMemo(() => {
    if (ariaLabel) return ariaLabel
    if (targetId && !href)
      return title
        ? `Zu ${title} im Projektstrom springen`
        : 'Zum Projekt im Strom springen'
    if (href && external)
      return title ? `${title} extern öffnen` : 'Externen Inhalt öffnen'
    if (href) return title ? `${title} öffnen` : 'Inhalt öffnen'
    return title || 'Projektteaser'
  }, [ariaLabel, href, external, targetId, title])

  const actionLabel = useMemo(() => {
    if (targetId && !href) return 'Zum Projekt springen →'
    if (href && external) return 'Extern öffnen →'
    if (href) return 'Öffnen →'
    return 'Mehr erfahren →'
  }, [href, external, targetId])

  return (
    <ActionButton
      type="button"
      onClick={handleClick}
      disabled={!isActionable}
      aria-label={resolvedAriaLabel}
    >
      <StyledCard
        tone="elevated"
        radius="large"
        bordered
        interactive={isActionable}
      >
        <Inner>
          <Top>{badge ? <Badge badgeKey={badge} /> : null}</Top>

          <Center>
            {hasText(title) ? (
              <Typography
                as="h2"
                variant="h3"
                align="center"
                accent="axisResonance"
                gutter={false}
              >
                {title}
              </Typography>
            ) : null}

            {hasText(description) ? (
              <Description variant="body" align="center" gutter={false}>
                {description}
              </Description>
            ) : null}
          </Center>

          <Bottom>
            <Typography variant="caption" accent="axisEnergy" gutter={false}>
              {actionLabel}
            </Typography>
          </Bottom>
        </Inner>
      </StyledCard>
    </ActionButton>
  )
}

const ActionButton = styled.button`
  appearance: none;
  display: block;
  width: 100%;
  padding: 0;
  margin: 0;
  border: 0;
  background: transparent;
  text-align: inherit;
  color: inherit;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }

  &:focus-visible {
    outline: none;
  }
`

const StyledCard = styled(Card)`
  height: 100%;
  min-height: 16.5rem;
  background: ${({ theme }) => theme.roles.surface.elevated};

  &:hover,
  &:focus-within {
    background: ${({ theme }) => theme.roles.surface.panel};
    border-color: ${({ theme }) => theme.getAxisRole('axisEnergy').border};
    box-shadow: ${({ theme }) => theme.boxShadow.md};
    transform: translateY(-2px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 15rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: 13.75rem;
  }
`

const Inner = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: ${({ theme }) => theme.spacing(1.1)};
  height: 100%;
  padding: ${({ theme }) => theme.spacing(1.5)};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing(0.9)};
    padding: ${({ theme }) => theme.spacing(1.2)};
  }
`

const Top = styled.div`
  display: flex;
  justify-content: center;
  min-height: ${({ theme }) => theme.spacing(3.25)};
`

const Center = styled.div`
  display: grid;
  align-content: center;
  justify-items: center;
  gap: ${({ theme }) => theme.spacing(0.75)};
  text-align: center;
`

const Description = styled(Typography)`
  max-width: 26ch;
`

const Bottom = styled.div`
  display: flex;
  justify-content: center;
  padding-top: ${({ theme }) => theme.spacing(0.55)};
  border-top: 1px solid ${({ theme }) => theme.roles.border.subtle};
`
