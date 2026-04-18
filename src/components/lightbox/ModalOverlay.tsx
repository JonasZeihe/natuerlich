// src/components/lightbox/ModalOverlay.tsx
'use client'

import React, { useEffect, useRef, type ReactNode } from 'react'
import ReactDOM from 'react-dom'
import styled, { keyframes } from 'styled-components'
import { FaTimes } from 'react-icons/fa'

type ModalOverlayProps = {
  onClose: () => void
  children: ReactNode
}

const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`

const popIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
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
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(0.9rem, 2vw, 1.4rem);
  background: ${({ theme }) => theme.roles.overlay.scrim};
  backdrop-filter: blur(1.25px) saturate(1.02);
  animation: ${fadeIn} 0.2s cubic-bezier(0.55, 0.13, 0.45, 1.05);
  -webkit-tap-highlight-color: transparent;
  touch-action: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: clamp(0.7rem, 1.8vw, 1rem);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0.55rem;
  }
`

const Content = styled.div`
  position: relative;
  width: 100%;
  max-width: 920px;
  min-width: 0;
  max-height: min(90vh, 980px);
  padding: ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.roles.surface.panel};
  border: 1px solid ${({ theme }) => theme.roles.border.subtle};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.boxShadow.lg};
  overflow-y: auto;
  overflow-x: hidden;
  outline: none;
  animation: ${popIn} 0.22s cubic-bezier(0.61, 0.13, 0.38, 1.15);
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) =>
    `${theme.roles.focus.ring} ${theme.roles.surface.panelAlt}`};
  overscroll-behavior: contain;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.roles.surface.panelAlt};
    border-radius: ${({ theme }) => theme.borderRadius.large};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.roles.focus.ring};
    border-radius: ${({ theme }) => theme.borderRadius.large};
    border: 2px solid ${({ theme }) => theme.roles.surface.panelAlt};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: min(92vw, 780px);
    max-height: 88vh;
    padding: ${({ theme }) => theme.spacing(2)};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 94vw;
    max-height: 86vh;
    padding: ${({ theme }) => theme.spacing(1.25)};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
  }
`

const Close = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing(1)};
  right: ${({ theme }) => theme.spacing(1)};
  width: 40px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.roles.border.subtle};
  border-radius: 50%;
  background: ${({ theme }) => theme.roles.surface.interactive};
  color: ${({ theme }) => theme.roles.text.subtle};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  cursor: pointer;
  z-index: 10;
  transition:
    background 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.roles.surface.panelAlt};
    color: ${({ theme }) => theme.roles.text.primary};
    border-color: ${({ theme }) => theme.roles.border.strong};
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.roles.focus.ring};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    top: ${({ theme }) => theme.spacing(0.65)};
    right: ${({ theme }) => theme.spacing(0.65)};
    width: 32px;
    height: 32px;
    font-size: 0.95rem;
  }
`

let modalOpen = 0

export default function ModalOverlay({ onClose, children }: ModalOverlayProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const mounted = typeof document !== 'undefined'

  useEffect(() => {
    if (!mounted) return

    modalOpen += 1

    if (modalOpen === 1) {
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    }

    return () => {
      modalOpen -= 1

      if (modalOpen === 0) {
        document.body.style.overflow = ''
        document.body.style.touchAction = ''
      }
    }
  }, [mounted])

  useEffect(() => {
    if (!mounted) return

    const previous = document.activeElement as HTMLElement | null
    const timer = window.setTimeout(() => modalRef.current?.focus(), 6)

    return () => {
      window.clearTimeout(timer)
      previous?.focus?.()
    }
  }, [mounted])

  useEffect(() => {
    if (!mounted) return

    const trap = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab') return

      const node = modalRef.current
      if (!node) return

      const focusables = node.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )

      if (!focusables.length) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      }
    }

    document.addEventListener('keydown', trap)
    return () => document.removeEventListener('keydown', trap)
  }, [mounted, onClose])

  if (!mounted) return null

  return ReactDOM.createPortal(
    <Overlay onClick={onClose} role="dialog" aria-modal="true">
      <Content
        ref={modalRef}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <Close onClick={onClose} aria-label="Modal schließen">
          <FaTimes size={20} />
        </Close>
        {children}
      </Content>
    </Overlay>,
    document.body
  )
}
