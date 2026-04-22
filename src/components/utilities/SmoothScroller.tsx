// src/components/utilities/SmoothScroller.tsx
'use client'

import React, { forwardRef, useCallback } from 'react'
import { getClientLogger } from '@/logging'

type ScrollOptions = {
  offset?: number
  durationMs?: number
}

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  targetId: string
  offset?: number
}

const NAV_SCROLL_LOCK_ATTR = 'data-nav-scroll-lock'

const getScrollTop = () =>
  window.pageYOffset ||
  document.documentElement.scrollTop ||
  document.body.scrollTop ||
  0

const getDefaultOffset = () =>
  Number.parseFloat(
    document.documentElement.style.getPropertyValue('--site-header-height')
  ) || 0

const easeInOutCubic = (value: number) =>
  value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2

const setNavScrollLock = (locked: boolean) => {
  if (locked) {
    document.documentElement.setAttribute(NAV_SCROLL_LOCK_ATTR, 'true')
    return
  }

  document.documentElement.removeAttribute(NAV_SCROLL_LOCK_ATTR)
}

const animateScrollTo = (top: number, durationMs: number) => {
  const startTop = getScrollTop()
  const delta = top - startTop

  if (Math.abs(delta) < 1 || durationMs <= 0) {
    window.scrollTo({ top, behavior: 'auto' })
    return Promise.resolve()
  }

  return new Promise<void>((resolve) => {
    const start = performance.now()

    const step = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / durationMs, 1)
      const eased = easeInOutCubic(progress)

      window.scrollTo({
        top: startTop + delta * eased,
        behavior: 'auto',
      })

      if (progress < 1) {
        window.requestAnimationFrame(step)
        return
      }

      resolve()
    }

    window.requestAnimationFrame(step)
  })
}

export const scrollToTarget = async (
  targetId: string,
  options: ScrollOptions = {}
): Promise<boolean> => {
  const element = document.getElementById(targetId)

  if (!element) {
    return false
  }

  const resolvedOffset =
    typeof options.offset === 'number' ? options.offset : getDefaultOffset()

  const top = Math.max(
    0,
    element.getBoundingClientRect().top + getScrollTop() - resolvedOffset - 16
  )

  setNavScrollLock(true)

  try {
    await animateScrollTo(top, options.durationMs ?? 520)
  } finally {
    window.setTimeout(() => {
      setNavScrollLock(false)
    }, 120)
  }

  return true
}

const SmoothScroller = forwardRef<HTMLAnchorElement, Props>(
  function SmoothScroller(
    { targetId, offset, children, onClick, href, ...rest },
    ref
  ) {
    const handle = useCallback(
      async (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (onClick) onClick(e)
        if (e.defaultPrevented) return
        e.preventDefault()

        const logger = getClientLogger().withContext({
          cat: 'navigation',
          phase: 'intent',
        })

        logger.info('navigation_intent', {
          targetId,
          href: href ?? `#${targetId}`,
        })

        const ok = await scrollToTarget(targetId, {
          offset,
        })

        if (!ok) {
          logger.warn('navigation_target_missing', {
            targetId,
            href: href ?? `#${targetId}`,
          })
          return
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
                  message:
                    error instanceof Error ? error.message : String(error),
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
            usedFallback: false,
          })
      },
      [href, offset, onClick, targetId]
    )

    return (
      <a
        ref={ref}
        href={href ?? `#${targetId}`}
        onClick={handle}
        aria-label={rest['aria-label'] ?? `Zu Abschnitt ${targetId} springen`}
        {...rest}
      >
        {children}
      </a>
    )
  }
)

export default SmoothScroller
