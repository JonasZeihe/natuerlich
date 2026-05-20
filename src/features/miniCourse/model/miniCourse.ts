// src/features/miniCourse/model/miniCourse.ts
export type MiniCourseLink = {
  text: string
  href: string
}

export type MiniCourseContent = {
  title: string
  lead: string
  bodyScan: {
    title: string
    body: string
    action: string
  }
  introduction: readonly string[]
  navigation: {
    primary: string
    links: readonly MiniCourseLink[]
  }
}

export const miniCourseContent: MiniCourseContent = {
  title: 'Komm erst mal an.',
  lead: 'Beginne mit dem Atem. Öffne danach den Body Scan, wenn du deinen Körper genauer wahrnehmen möchtest. Erst dann beginnt der Weg durch die Seite.',
  bodyScan: {
    title: 'Den Körper einmal von innen lesen.',
    body: 'Der Body Scan liegt nicht als Textwand auf der Seite. Er öffnet sich als geführter Raum, wenn du bereit dafür bist.',
    action: 'Body Scan öffnen',
  },
  introduction: [
    'Atmung ist der erste Zugang. Nicht als Trick, der alles löst, sondern als Anfang einer Beziehung zum eigenen Zustand.',
    'Aus Wahrnehmung wird Übung. Yoga, Qigong, Taijiquan, Meditation und Entspannung greifen nicht als Etiketten ineinander, sondern als Praxis.',
    'Danach öffnet sich die Seite: was ich unterrichte, woher diese Arbeit kommt und wie ein gemeinsamer Einstieg aussehen kann.',
  ],
  navigation: {
    primary: 'Zur Praxis',
    links: [
      {
        text: 'Über mich',
        href: '#erkennen',
      },
      {
        text: 'Angebot',
        href: '#integrieren',
      },
      {
        text: 'Kontakt',
        href: '#anschluss',
      },
    ],
  },
} as const
