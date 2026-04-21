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
      <Content>
        <EntrySection
          onGoToPractice={() => scrollToSection('praxis')}
          onGoToFrame={() => scrollToSection('rahmen')}
        />

        <PositioningSection />

        <PracticeSection onGoToFrame={() => scrollToSection('rahmen')} />

        <TeacherSection />

        <PracticalInfoSection
          onGoToContact={() => scrollToSection('kontakt')}
        />

        <ContactSection />
      </Content>
    </PageWrapper>
  )
}

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`
