// src/features/site/screens/HomePage.tsx
'use client'

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
    <>
      <EntrySection
        onGoToPractice={() => scrollToSection('praxis')}
        onGoToFrame={() => scrollToSection('rahmen')}
      />
      <PositioningSection />
      <PracticeSection onGoToFrame={() => scrollToSection('rahmen')} />
      <TeacherSection />
      <PracticalInfoSection />
      <ContactSection />
    </>
  )
}
