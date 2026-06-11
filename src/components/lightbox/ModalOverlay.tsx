// src/components/lightbox/ModalOverlay.tsx
'use client'

import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import styled, { keyframes } from 'styled-components'
import { FaTimes } from 'react-icons/fa'

type ModalOverlayProps = {
  onClose: () => void
  children: ReactNode
  ariaLabel?: string
}

const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`

const riseIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(0.75rem) scale(0.99);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 12000;
  display: grid;
  place-items: center;
  padding: ${({ theme }) => theme.layout.inset.page};
  background: ${({ theme }) => theme.color.surface.backdrop};
  animation: ${fadeIn}
    ${({ theme }) => theme.motion.foundations.durations.medium}
    ${({ theme }) => theme.motion.foundations.easings.decelerate};
`

const Panel = styled.div`
  position: relative;
  width: min(100%, 57.5rem);
  max-height: min(90vh, 61.25rem);
  padding: ${({ theme }) => theme.layout.surfacePadding.lg};
  border: 1px solid ${({ theme }) => theme.color.border.default};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.color.surface.card};
  color: ${({ theme }) => theme.color.text.default};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) =>
    `${theme.color.focus.ring} ${theme.color.surface.field}`};
  animation: ${riseIn}
    ${({ theme }) => theme.motion.foundations.durations.medium}
    ${({ theme }) => theme.motion.foundations.easings.decelerate};

  &::-webkit-scrollbar {
    width: ${({ theme }) => theme.space(1)};
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.color.surface.field};
    border-radius: ${({ theme }) => theme.radius.lg};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.color.focus.ring};
    border-radius: ${({ theme }) => theme.radius.lg};
    border: 2px solid ${({ theme }) => theme.color.surface.field};
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.sm}) {
    max-height: 86vh;
    padding: ${({ theme }) => theme.layout.surfacePadding.md};
    border-radius: ${({ theme }) => theme.radius.md};
  }

  @media ${({ theme }) => theme.motion.reduced.media} {
    animation: none;
  }
`

const Close = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.space(3)};
  right: ${({ theme }) => theme.space(3)};
  z-index: 1;
  width: 2.25rem;
  height: 2.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.color.border.default};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.color.surface.field};
  color: ${({ theme }) => theme.color.text.soft};
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.css.interactive.control};

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.color.surface.note};
    color: ${({ theme }) => theme.color.text.default};
    border-color: ${({ theme }) => theme.color.border.strong};
    outline: 2px solid transparent;
    box-shadow: ${({ theme }) => theme.color.focus.shadow};
  }

  @media ${({ theme }) => theme.motion.reduced.media} {
    transition: none;
  }
`

export default function ModalOverlay({
  onClose,
  children,
  ariaLabel = 'Dialog',
}: ModalOverlayProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [onClose])

  return createPortal(
    <Overlay
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      onClick={onClose}
    >
      <Panel onClick={(event) => event.stopPropagation()}>
        <Close onClick={onClose} aria-label="Dialog schließen">
          <FaTimes size={16} />
        </Close>

        {children}
      </Panel>
    </Overlay>,
    document.body
  )
}
