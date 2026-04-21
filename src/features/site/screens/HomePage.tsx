// src/features/site/screens/HomePage.tsx
'use client'

import styled from 'styled-components'
import PageCanvas from '@/components/compositions/page/PageCanvas'
import { getClientLogger } from '@/logging'
import { type SiteSectionId } from '@/features/site/model/sections'
import ContactSection from '@/features/site/sections/ContactSection'
import EntrySection from '@/features/site/sections/EntrySection'
import OrientationSection from '@/features/site/sections/OrientationSection'
import PracticeSection from '@/features/site/sections/PracticeSection'
import PracticalFrameSection from '@/features/site/sections/PracticalFrameSection'
import TeacherSection from '@/features/site/sections/TeacherSection'

const scrollToSection = (
  targetId: SiteSectionId,
  source: 'entry_practice' | 'entry_frame' | 'practice_frame' | 'frame_contact'
) => {
  const logger = getClientLogger().withContext({
    cat: 'flow',
    phase: 'intent',
  })

  logger.info('flow_section_intent', {
    targetId,
    source,
  })

  const element = document.getElementById(targetId)
  if (!element) {
    getClientLogger()
      .withContext({
        cat: 'flow',
        phase: 'fail',
      })
      .warn('flow_section_target_missing', {
        targetId,
        source,
      })
    return
  }

  const reduce =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const behavior: ScrollBehavior = reduce ? 'auto' : 'smooth'

  element.scrollIntoView({
    behavior,
    block: 'start',
  })

  try {
    history.replaceState(null, '', `#${targetId}`)
  } catch (error) {
    getClientLogger()
      .withContext({
        cat: 'flow',
        phase: 'fail',
      })
      .error(
        'flow_history_sync_failed',
        error,
        {
          targetId,
          source,
        },
        [
          {
            code: 'NAVIGATION_ERROR',
            name: error instanceof Error ? error.name : 'NonError',
            message: error instanceof Error ? error.message : String(error),
            hint: 'history state could not be synchronized after flow transition',
            detail: {
              targetId,
              source,
            },
          },
        ]
      )
  }

  getClientLogger()
    .withContext({
      cat: 'flow',
      phase: 'success',
    })
    .info('flow_section_completed', {
      targetId,
      source,
      behavior,
    })
}

export default function HomePage() {
  return (
    <PageCanvas variant="landing" introOffset={false} noFooterGap>
      <Content>
        <EntrySection
          onGoToPractice={() => scrollToSection('praxis', 'entry_practice')}
          onGoToFrame={() => scrollToSection('rahmen', 'entry_frame')}
        />

        <OrientationSection />

        <PracticeSection
          onGoToFrame={() => scrollToSection('rahmen', 'practice_frame')}
        />

        <TeacherSection />

        <PracticalFrameSection
          onGoToContact={() => scrollToSection('kontakt', 'frame_contact')}
        />

        <ContactSection />
      </Content>
    </PageCanvas>
  )
}

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`
