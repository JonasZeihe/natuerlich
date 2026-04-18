// src/app/layout.tsx
import type { Metadata } from 'next'
import StyledComponentsRegistry from '@/design/StyledComponentsRegistry'
import Providers from '@/design/Providers'
import Shell from '@/layouts/Shell'

export const metadata: Metadata = {
  title: 'Jonas',
  description:
    'Yoga, Qigong, Tai Chi, Meditation und Achtsamkeit als ernsthafte, freudige und alltagstaugliche Praxis.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de">
      <body>
        <StyledComponentsRegistry>
          <Providers>
            <Shell>{children}</Shell>
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
