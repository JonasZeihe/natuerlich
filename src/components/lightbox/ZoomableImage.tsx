// src/components/lightbox/ZoomableImage.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

type ZoomableImageProps = {
  src: string
  alt?: string
}

const scaleByLevel = (level: number) => {
  if (level === 1) return 1.35
  if (level === 2) return 1.85
  return 1
}

const Image = styled.img<{
  $zoomed: boolean
  $originX: number
  $originY: number
  $scale: number
  $panX: number
  $panY: number
}>`
  display: block;
  max-width: 100%;
  max-height: 82vh;
  object-fit: contain;
  cursor: ${({ $zoomed }) => ($zoomed ? 'grab' : 'zoom-in')};
  transform-origin: ${({ $originX, $originY }) => `${$originX}% ${$originY}%`};
  transform: ${({ $scale, $panX, $panY }) =>
    `translate(${$panX}px, ${$panY}px) scale(${$scale})`};
  transition: ${({ $zoomed, theme }) =>
    $zoomed
      ? 'none'
      : `transform ${theme.motion.foundations.durations.medium} ${theme.motion.foundations.easings.decelerate}`};
  user-select: none;
  -webkit-user-drag: none;
`

export default function ZoomableImage({ src, alt = '' }: ZoomableImageProps) {
  const imageRef = useRef<HTMLImageElement | null>(null)
  const dragRef = useRef({ x: 0, y: 0 })

  const [zoomLevel, setZoomLevel] = useState(0)
  const [originX, setOriginX] = useState(50)
  const [originY, setOriginY] = useState(50)
  const [panX, setPanX] = useState(0)
  const [panY, setPanY] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [dragged, setDragged] = useState(false)

  const zoomed = zoomLevel > 0
  const scale = scaleByLevel(zoomLevel)

  const clamp = (value: number, max: number) =>
    Math.max(Math.min(value, max), -max)

  const updatePan = (clientX: number, clientY: number) => {
    const rect = imageRef.current?.getBoundingClientRect()
    if (!rect) return

    const maxX = (rect.width * (scale - 1)) / 2
    const maxY = (rect.height * (scale - 1)) / 2

    setPanX(clamp(clientX - dragRef.current.x, maxX))
    setPanY(clamp(clientY - dragRef.current.y, maxY))
  }

  const startDrag = (clientX: number, clientY: number) => {
    dragRef.current = {
      x: clientX - panX,
      y: clientY - panY,
    }
    setDragging(true)
  }

  const reset = () => {
    setZoomLevel(0)
    setPanX(0)
    setPanY(0)
    setOriginX(50)
    setOriginY(50)
  }

  useEffect(() => {
    if (!zoomed) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [zoomed])

  return (
    <Image
      ref={imageRef}
      src={src}
      alt={alt}
      draggable={false}
      $zoomed={zoomed}
      $originX={originX}
      $originY={originY}
      $scale={scale}
      $panX={panX}
      $panY={panY}
      onClick={(event) => {
        event.preventDefault()

        if (dragged) {
          setDragged(false)
          return
        }

        const rect = imageRef.current?.getBoundingClientRect()
        if (!rect) return

        if (zoomLevel >= 2) {
          reset()
          return
        }

        setOriginX(((event.clientX - rect.left) / rect.width) * 100)
        setOriginY(((event.clientY - rect.top) / rect.height) * 100)
        setZoomLevel((level) => level + 1)
      }}
      onMouseDown={(event) => {
        if (!zoomed) return
        event.preventDefault()
        startDrag(event.clientX, event.clientY)
      }}
      onMouseMove={(event) => {
        if (!dragging) return
        setDragged(true)
        updatePan(event.clientX, event.clientY)
      }}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onTouchStart={(event) => {
        if (!zoomed) return
        const touch = event.touches[0]
        startDrag(touch.clientX, touch.clientY)
      }}
      onTouchMove={(event) => {
        if (!dragging) return
        event.preventDefault()
        const touch = event.touches[0]
        updatePan(touch.clientX, touch.clientY)
      }}
      onTouchEnd={() => setDragging(false)}
    />
  )
}
