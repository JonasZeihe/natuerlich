// src/components/overlays/DialogBackdrop.tsx
'use client'

import { useEffect } from 'react'

type DialogBackdropProps = {
  onClose: () => void
  disabled?: boolean
  zIndex?: number
  ariaLabel?: string
}

export default function DialogBackdrop({
  onClose,
  disabled = false,
  zIndex = 9998,
  ariaLabel = 'Dialog schließen',
}: DialogBackdropProps) {
  useEffect(() => {
    if (disabled) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [disabled, onClose])

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => {
        if (disabled) return
        onClose()
      }}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.28)',
        border: 0,
        padding: 0,
        margin: 0,
        zIndex,
        cursor: disabled ? 'default' : 'pointer',
      }}
    />
  )
}
