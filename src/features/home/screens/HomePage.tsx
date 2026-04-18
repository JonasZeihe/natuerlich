'use client'

import HomeHeroSection from '@/features/home/sections/HomeHeroSection'
import HomePracticeSection from '@/features/home/sections/HomePracticeSection'
import HomeTeacherSection from '@/features/home/sections/HomeTeacherSection'
import HomeTransparencySection from '@/features/home/sections/HomeTransparencySection'
import HomeContactSection from '@/features/home/sections/HomeContactSection'
import PageScaffold from '@/features/common/components/PageScaffold'

export default function HomePage() {
  return (
    <PageScaffold>
      <HomeHeroSection />
      <HomePracticeSection />
      <HomeTeacherSection />
      <HomeTransparencySection />
      <HomeContactSection />
    </PageScaffold>
  )
}
