// src/components/lightbox/Lightbox.tsx
'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import ReactDOM from 'react-dom'
import styled, { keyframes } from 'styled-components'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Navigation from './LightboxNavigation'

type MediaItem =
  | { type: 'image'; src: string; alt?: string }
  | { type: 'video'; src: string; alt?: string }

type LightboxProps = {
  media: MediaItem[]
  currentIndex?: number
  onClose: () => void
}

const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 15000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.roles.overlay.scrim};
  animation: ${fadeIn} 0.2s ease-out;
`

const Frame = styled.div`
  max-width: 95vw;
  max-height: 95vh;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(0.5)};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  background: ${({ theme }) => theme.roles.surface.panel};
  box-shadow: ${({ theme }) => theme.boxShadow.lg};
  border: 1px solid ${({ theme }) => theme.roles.border.subtle};
`

const StyledVideo = styled.video`
  max-width: 95vw;
  max-height: 95vh;
  display: block;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme }) => theme.roles.surface.panelAlt};
`

const ControlBase = styled.button`
  position: fixed;
  width: 44px;
  height: 44px;
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  border: 1px solid ${({ theme }) => theme.roles.border.subtle};
  background: ${({ theme }) => theme.roles.surface.panel};
  color: ${({ theme }) => theme.roles.text.primary};
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
  cursor: pointer;
  transition:
    background 0.16s ease,
    box-shadow 0.16s ease,
    border-color 0.16s ease;

  &:hover {
    background: ${({ theme }) => theme.roles.surface.interactive};
    box-shadow: ${({ theme }) => theme.boxShadow.md};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.roles.focus.ring};
    outline-offset: 2px;
  }
`

const CloseButton = styled(ControlBase)`
  top: ${({ theme }) => theme.spacing(1.5)};
  right: ${({ theme }) => theme.spacing(1.5)};
  z-index: 15100;
`

const NavButton = styled(ControlBase)<{ $direction: 'left' | 'right' }>`
  top: 50%;
  ${({ $direction, theme }) =>
    $direction === 'left'
      ? `left: ${theme.spacing(1.5)};`
      : `right: ${theme.spacing(1.5)};`}
  transform: translateY(-50%);
  z-index: 15100;
`

export default function Lightbox({
  media,
  currentIndex = 0,
  onClose,
}: LightboxProps) {
  const [activeIndex, setActiveIndex] = useState(currentIndex)
  const [mounted, setMounted] = useState(false)
  const isCarousel = media.length > 1
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const portalTarget = useMemo(() => {
    if (!mounted) return null
    return (
      document.getElementById('__next') ||
      document.body ||
      document.documentElement
    )
  }, [mounted])

  const navigate = useCallback(
    (direction: -1 | 1) =>
      setActiveIndex(
        (index) => (index + direction + media.length) % media.length
      ),
    [media.length]
  )

  const trapTabKey = useCallback((event: KeyboardEvent) => {
    if (event.key !== 'Tab') return

    const root = overlayRef.current
    if (!root) return

    const focusables = Array.from(
      root.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter(
      (element) => !element.hasAttribute('disabled') && element.tabIndex !== -1
    )

    if (!focusables.length) return

    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    const active = document.activeElement as HTMLElement | null

    if (event.shiftKey) {
      if (active === first || !root.contains(active)) {
        last.focus()
        event.preventDefault()
      }
      return
    }

    if (active === last) {
      first.focus()
      event.preventDefault()
    }
  }, [])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft' && isCarousel) navigate(-1)
      if (event.key === 'ArrowRight' && isCarousel) navigate(1)
      if (event.key === 'Tab') trapTabKey(event)
    },
    [isCarousel, navigate, onClose, trapTabKey]
  )

  useEffect(() => {
    if (!mounted) return

    restoreFocusRef.current = document.activeElement as HTMLElement | null

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0)
    const preventTouchScroll = (event: TouchEvent) => event.preventDefault()
    document.addEventListener('touchmove', preventTouchScroll, {
      passive: false,
    })

    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('touchmove', preventTouchScroll)
      restoreFocusRef.current?.focus?.()
    }
  }, [handleKeyDown, mounted])

  if (!mounted || !portalTarget) return null

  const { type, src, alt } = media[activeIndex]

  return ReactDOM.createPortal(
    <Overlay
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Media viewer"
      onClick={onClose}
    >
      <Frame onClick={(event) => event.stopPropagation()}>
        {type === 'image' ? (
          <Navigation src={src} alt={alt} onClose={onClose} />
        ) : (
          <StyledVideo
            src={src}
            controls
            autoPlay
            aria-label={alt || `Video ${activeIndex + 1}`}
          />
        )}
      </Frame>

      <CloseButton ref={closeRef} onClick={onClose} aria-label="Close dialog">
        <FaTimes size={18} />
      </CloseButton>

      {isCarousel ? (
        <>
          <NavButton
            $direction="left"
            onClick={(event) => {
              event.stopPropagation()
              navigate(-1)
            }}
            aria-label="Previous media"
          >
            <FaChevronLeft size={18} />
          </NavButton>
          <NavButton
            $direction="right"
            onClick={(event) => {
              event.stopPropagation()
              navigate(1)
            }}
            aria-label="Next media"
          >
            <FaChevronRight size={18} />
          </NavButton>
        </>
      ) : null}
    </Overlay>,
    portalTarget
  )
}
