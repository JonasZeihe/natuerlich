// src/components/card/ProjectCard.tsx
'use client'

import { useCallback, useEffect, useState } from 'react'
import Image, { type StaticImageData } from 'next/image'
import styled from 'styled-components'
import { FiArrowUpRight } from 'react-icons/fi'
import Card from '@/components/primitives/Card'
import Typography from '@/design/typography'

export type ProjectCardData = {
  image: StaticImageData
  imageAlt?: string
  name: string
  description: string
}

type ProjectCardProps = {
  id?: string
  project: ProjectCardData
  onOpen: () => void
}

export function ProjectCard({ id, project, onOpen }: ProjectCardProps) {
  const [isHighlighted, setIsHighlighted] = useState(false)

  useEffect(() => {
    const handleHighlight = (event: Event) => {
      const customEvent = event as CustomEvent<{ id?: string }>
      setIsHighlighted(Boolean(id && customEvent.detail?.id === id))
    }

    window.addEventListener('portfolio-project-highlight', handleHighlight)

    return () => {
      window.removeEventListener('portfolio-project-highlight', handleHighlight)
    }
  }, [id])

  const clearHighlight = useCallback(() => {
    setIsHighlighted(false)
  }, [])

  return (
    <ProjectAnchor id={id}>
      <CardShell onMouseEnter={clearHighlight}>
        <StyledProjectCard
          tone="panel"
          energy="opening"
          radius="large"
          bordered
          interactive
          padding="md"
          weight="steady"
          onClick={() => {
            clearHighlight()
            onOpen()
          }}
          $highlighted={isHighlighted}
        >
          <MediaArea>
            <ProjectImage
              src={project.image}
              alt={project.imageAlt ?? project.name}
              fill
              sizes="(min-width: 900px) 420px, 100vw"
            />
          </MediaArea>

          <ContentArea>
            <Typography
              as="h2"
              variant="h2"
              accent="axisDensity"
              align="center"
              gutter={false}
            >
              {project.name}
            </Typography>

            <Typography variant="body" align="center" gutter={false}>
              {project.description}
            </Typography>
          </ContentArea>

          <OpenCue aria-hidden="true">
            <FiArrowUpRight size={18} />
          </OpenCue>
        </StyledProjectCard>
      </CardShell>
    </ProjectAnchor>
  )
}

const ProjectAnchor = styled.section`
  scroll-margin-top: ${({ theme }) => theme.spacing(2)};
`

const CardShell = styled.div`
  height: 100%;
  cursor: pointer;
`

const OpenCue = styled.span`
  position: absolute;
  right: ${({ theme }) => theme.spacing(0.9)};
  bottom: ${({ theme }) => theme.spacing(0.8)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.roles.text.subtle};
  opacity: 0.72;
  transform: translateY(1px);
  transition:
    color 0.16s ease,
    opacity 0.16s ease,
    transform 0.16s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    right: ${({ theme }) => theme.spacing(0.8)};
    bottom: ${({ theme }) => theme.spacing(0.72)};
  }
`

const StyledProjectCard = styled(Card)<{ $highlighted: boolean }>`
  height: 100%;
  position: relative;
  background: ${({ theme, $highlighted }) =>
    $highlighted ? theme.roles.surface.panel : theme.roles.surface.canvas};

  border-color: ${({ theme, $highlighted }) =>
    $highlighted
      ? theme.getAxisRole('axisOpening').border
      : theme.roles.border.subtle};

  box-shadow: ${({ theme, $highlighted }) =>
    $highlighted ? theme.boxShadow.md : 'none'};

  transform: ${({ $highlighted }) =>
    $highlighted ? 'translateY(-2px)' : 'translateY(0)'};

  transition:
    background 0.16s ease,
    border-color 0.16s ease,
    box-shadow 0.16s ease,
    transform 0.16s ease;

  &:hover,
  &:focus-within {
    background: ${({ theme }) => theme.roles.surface.panel};
    border-color: ${({ theme }) => theme.getAxisRole('axisOpening').border};
    box-shadow: ${({ theme }) => theme.boxShadow.md};
    transform: translateY(-2px);
  }

  &:hover ${OpenCue}, &:focus-within ${OpenCue} {
    color: ${({ theme }) => theme.getAxisRole('axisOpening').text};
    opacity: 1;
    transform: translateY(0);
  }
`

const MediaArea = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: ${({ theme }) => theme.roles.surface.panelAlt};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`

const ProjectImage = styled(Image)`
  object-fit: cover;
`

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(3)};
  text-align: center;
`
