// src/features/site/screens/HomePage.tsx
'use client'

import styled from 'styled-components'
import PageCanvas from '@/components/compositions/page/PageCanvas'
import { scrollToTarget } from '@/components/utilities/SmoothScroller'
import { getClientLogger } from '@/logging'
import { type SiteSectionId } from '@/features/site/model/sections'
import IntegrationSection from '@/features/site/sections/IntegrationSection'
import NextStepSection from '@/features/site/sections/NextStepSection'
import PracticeFieldSection from '@/features/site/sections/PracticeFieldSection'
import RecognitionSection from '@/features/site/sections/RecognitionSection'
import SchnupperkursSection from '@/features/site/sections/SchnupperkursSection'

type FlowSource =
  | 'schnupperkurs_practice'
  | 'practice_integration'
  | 'integration_next'

const scrollToSection = async (targetId: SiteSectionId, source: FlowSource) => {
  const logger = getClientLogger().withContext({
    cat: 'flow',
    phase: 'intent',
  })

  logger.info('flow_section_intent', {
    targetId,
    source,
  })

  const ok = await scrollToTarget(targetId)

  if (!ok) {
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
    })
}

const HomePage = () => (
  <PageCanvas variant="landing" introOffset={false} noFooterGap>
    <Content>
      <SchnupperkursSection
        onGoToPracticeField={() => {
          void scrollToSection('arbeiten', 'schnupperkurs_practice')
        }}
      />

      <PracticeFieldSection
        onGoToIntegration={() => {
          void scrollToSection('integrieren', 'practice_integration')
        }}
      />

      <RecognitionSection />

      <IntegrationSection
        onGoToNextStep={() => {
          void scrollToSection('anschluss', 'integration_next')
        }}
      />

      <NextStepSection />
    </Content>
  </PageCanvas>
)

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`

export default HomePage
