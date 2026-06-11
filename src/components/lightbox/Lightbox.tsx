// src/components/lightbox/Lightbox.tsx
'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import styled, { keyframes } from 'styled-components'
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa'
import ZoomableImage from './ZoomableImage'

type MediaItem =
  | { type: 'image'; src: string; alt?: string }
  | { type: 'video'; src: string; alt?: string }

type LightboxProps = {
  media: readonly MediaItem[]
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
  padding: ${({ theme }) => theme.layout.inset.page};
  background: ${({ theme }) => theme.color.surface.backdrop};
  animation: ${fadeIn}
    ${({ theme }) => theme.motion.foundations.durations.medium}
    ${({ theme }) => theme.motion.foundations.easings.decelerate};
`

const Frame = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-width: 95vw;
  max-height: 95vh;
  padding: ${({ theme }) => theme.layout.surfacePadding.sm};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.color.surface.card};
  border: 1px solid ${({ theme }) => theme.color.border.default};
  box-shadow: ${({ theme }) => theme.shadow.lg};
`

const Video = styled.video`
  display: block;
  max-width: 100%;
  max-height: 82vh;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.color.surface.backdrop};
`

const Control = styled.button`
  position: fixed;
  z-index: 15100;
  width: 2.75rem;
  height: 2.75rem;
  min-width: 2.75rem;
  min-height: 2.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.color.border.default};
  background: ${({ theme }) => theme.color.surface.card};
  color: ${({ theme }) => theme.color.text.default};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.css.interactive.control};

  &:hover {
    background: ${({ theme }) => theme.color.surface.note};
    box-shadow: ${({ theme }) => theme.shadow.md};
  }

  &:focus-visible {
    outline: 2px solid transparent;
    box-shadow: ${({ theme }) => theme.color.focus.shadow};
  }

  @media ${({ theme }) => theme.motion.reduced.media} {
    transition: none;
  }
`

const CloseButton = styled(Control)`
  top: ${({ theme }) => theme.layout.inset.page};
  right: ${({ theme }) => theme.layout.inset.page};
`

const NavButton = styled(Control)<{ $direction: 'left' | 'right' }>`
  top: 50%;
  transform: translateY(-50%);

  ${({ $direction, theme }) =>
    $direction === 'left'
      ? `left: ${theme.layout.inset.page};`
      : `right: ${theme.layout.inset.page};`}
`

export default function Lightbox({
  media,
  currentIndex = 0,
  onClose,
}: LightboxProps) {
  const [activeIndex, setActiveIndex] = useState(currentIndex)
  const [mounted, setMounted] = useState(false)

  const overlayRef = useRef<HTMLDivElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)

  const hasMultipleItems = media.length > 1
  const activeItem = media[activeIndex]

  const portalTarget = useMemo(() => {
    if (!mounted) return null
    return document.body
  }, [mounted])

  const navigate = useCallback(
    (direction: -1 | 1) => {
      setActiveIndex(
        (index) => (index + direction + media.length) % media.length
      )
    },
    [media.length]
  )

  const trapFocus = useCallback((event: KeyboardEvent) => {
    if (event.key !== 'Tab') return

    const root = overlayRef.current
    if (!root) return

    const focusables = Array.from(
      root.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, video, [tabindex]:not([tabindex="-1"])'
      )
    ).filter(
      (element) => !element.hasAttribute('disabled') && element.tabIndex !== -1
    )

    if (!focusables.length) return

    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    const active = document.activeElement as HTMLElement | null

    if (event.shiftKey && (active === first || !root.contains(active))) {
      event.preventDefault()
      last.focus()
      return
    }

    if (!event.shiftKey && active === last) {
      event.preventDefault()
      first.focus()
    }
  }, [])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft' && hasMultipleItems) navigate(-1)
      if (event.key === 'ArrowRight' && hasMultipleItems) navigate(1)
      trapFocus(event)
    },
    [hasMultipleItems, navigate, onClose, trapFocus]
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    restoreFocusRef.current = document.activeElement as HTMLElement | null

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    window.addEventListener('keydown', handleKeyDown)

    const timer = window.setTimeout(() => closeRef.current?.focus(), 0)

    return () => {
      window.clearTimeout(timer)
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      restoreFocusRef.current?.focus?.()
    }
  }, [handleKeyDown, mounted])

  if (!mounted || !portalTarget || !activeItem) return null

  return ReactDOM.createPortal(
    <Overlay
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Media viewer"
      onClick={onClose}
    >
      <Frame onClick={(event) => event.stopPropagation()}>
        {activeItem.type === 'image' ? (
          <ZoomableImage src={activeItem.src} alt={activeItem.alt} />
        ) : (
          <Video
            src={activeItem.src}
            controls
            autoPlay
            aria-label={activeItem.alt || `Video ${activeIndex + 1}`}
          />
        )}
      </Frame>

      <CloseButton ref={closeRef} onClick={onClose} aria-label="Close dialog">
        <FaTimes size={18} />
      </CloseButton>

      {hasMultipleItems ? (
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
