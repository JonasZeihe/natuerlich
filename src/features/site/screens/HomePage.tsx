// src/features/site/screens/HomePage.tsx
'use client'

import styled from 'styled-components'
import PageWrapper from '@/components/patterns/wrapper/PageWrapper'
import { type SiteSectionId } from '@/features/site/model/sections'
import ContactSection from '@/features/site/sections/ContactSection'
import EntrySection from '@/features/site/sections/EntrySection'
import PositioningSection from '@/features/site/sections/PositioningSection'
import PracticeSection from '@/features/site/sections/PracticeSection'
import PracticalInfoSection from '@/features/site/sections/PracticalInfoSection'
import TeacherSection from '@/features/site/sections/TeacherSection'

const scrollToSection = (targetId: SiteSectionId) => {
  const element = document.getElementById(targetId)
  if (!element) return

  const reduce =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  element.scrollIntoView({
    behavior: reduce ? 'auto' : 'smooth',
    block: 'start',
  })

  try {
    history.replaceState(null, '', `#${targetId}`)
  } catch {}
}

export default function HomePage() {
  return (
    <PageWrapper variant="landing" introOffset={false} noFooterGap>
      <OpeningZone data-zone="opening">
        <EntrySection
          onGoToPractice={() => scrollToSection('praxis')}
          onGoToFrame={() => scrollToSection('rahmen')}
        />
      </OpeningZone>

      <ClarifyZone data-zone="clarify">
        <PositioningSection />
      </ClarifyZone>

      <ExpandZone data-zone="expand">
        <PracticeSection onGoToFrame={() => scrollToSection('rahmen')} />
      </ExpandZone>

      <DeepenZone data-zone="deepen">
        <TeacherSection />
      </DeepenZone>

      <ReliefZone data-zone="relief">
        <PracticalInfoSection
          onGoToContact={() => scrollToSection('kontakt')}
        />
      </ReliefZone>

      <ArrivalZone data-zone="arrival">
        <ContactSection />
      </ArrivalZone>
    </PageWrapper>
  )
}

const zoneBase = `
  position: relative;
  width: 100%;
`

const OpeningZone = styled.div`
  ${zoneBase}
`

const ClarifyZone = styled.div`
  ${zoneBase}
`

const ExpandZone = styled.div`
  ${zoneBase}
`

const DeepenZone = styled.div`
  ${zoneBase}
`

const ReliefZone = styled.div`
  ${zoneBase}
`

const ArrivalZone = styled.div`
  ${zoneBase}
`
