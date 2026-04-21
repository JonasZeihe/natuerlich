// src/components/utilities/SmoothScroller.tsx
'use client'

import React, { useCallback } from 'react'
import { getClientLogger } from '@/logging'

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  targetId: string
}

export default function SmoothScroller({
  targetId,
  children,
  onClick,
  href,
  ...rest
}: Props) {
  const handle = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onClick) onClick(e)
      if (e.defaultPrevented) return
      e.preventDefault()

      const logger = getClientLogger().withContext({
        cat: 'navigation',
        phase: 'intent',
      })

      const reduce =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

      logger.info('navigation_intent', {
        targetId,
        reduceMotion: reduce,
        href: href ?? `#${targetId}`,
      })

      const el = document.getElementById(targetId)

      if (!el) {
        logger.warn('navigation_target_missing', {
          targetId,
          href: href ?? `#${targetId}`,
        })
        return
      }

      const behavior: ScrollBehavior = reduce ? 'auto' : 'smooth'
      let usedFallback = false

      try {
        el.scrollIntoView({ behavior, block: 'start' })
      } catch (error) {
        usedFallback = true

        getClientLogger()
          .withContext({
            cat: 'navigation',
            phase: 'fail',
          })
          .error(
            'navigation_scroll_fallback_used',
            error,
            {
              targetId,
              behavior,
            },
            [
              {
                code: 'NAVIGATION_ERROR',
                name: error instanceof Error ? error.name : 'NonError',
                message: error instanceof Error ? error.message : String(error),
                hint: 'scrollIntoView failed and window.scrollTo fallback was used',
                detail: {
                  targetId,
                  behavior,
                },
              },
            ]
          )

        const top =
          el.getBoundingClientRect().top +
          (window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0)

        window.scrollTo({ top, behavior })
      }

      try {
        history.replaceState(null, '', `#${targetId}`)
      } catch (error) {
        getClientLogger()
          .withContext({
            cat: 'navigation',
            phase: 'fail',
          })
          .error(
            'navigation_history_sync_failed',
            error,
            {
              targetId,
            },
            [
              {
                code: 'NAVIGATION_ERROR',
                name: error instanceof Error ? error.name : 'NonError',
                message: error instanceof Error ? error.message : String(error),
                hint: 'history state could not be synchronized after navigation',
                detail: {
                  targetId,
                },
              },
            ]
          )
      }

      getClientLogger()
        .withContext({
          cat: 'navigation',
          phase: 'success',
        })
        .info('navigation_completed', {
          targetId,
          behavior,
          usedFallback,
        })
    },
    [href, onClick, targetId]
  )

  return (
    <a
      href={href ?? `#${targetId}`}
      onClick={handle}
      aria-label={rest['aria-label'] ?? `Zu Abschnitt ${targetId} springen`}
      {...rest}
    >
      {children}
    </a>
  )
}
