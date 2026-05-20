// src/features/miniCourse/model/bodyScan.ts
export type BodyScanContent = {
  title: string
  blocks: readonly string[]
  closeLabel: string
}

export const bodyScanContent: BodyScanContent = {
  title: 'Body Scan',
  closeLabel: 'Schließen',
  blocks: [
    'Komm erstmal an.',
    'Mach’s dir gemütlich,\negal, wo du gerade bist\nund wie du gerade bist.',
    'Egal, ob im Sitzen\noder im Liegen.',
    'Mach dich einfach nur innerlich ganz lang.',
    'Schließ die Augen irgendwann,\nwenn du magst.',
    'Und dann lass mal alles fallen.',
    'Wie kommst du dahin?',
    'Mit deiner Atmung.',
    'Mit dem Einatmen\nund mit dem Ausatmen.',
    'Und wenn du einatmest,\nversuch mal, in deinen unteren Bauch zu spüren\nund die Atembewegung ganz natürlich\nin den unteren Bauch zu verlagern,\n\nfalls du noch zu sehr in der Brust,\noder im oberen Bauchbereich bist.',
    'Und beim Ausatmen wirst du schwerer.',
    'Mit dem Einatmen stell dir vor:\nDu wirst leicht wie eine Feder.',
    'Ausatmen:\nDu wirst ganz schwer.',
    'Einatmen:\nDer Bauch wölbt sich vor- atme Leichtigkeit ein.',
    'Ausatmen:\nLösen.\nEntspannen.',
    'Und jetzt spüre in deinen Körper hinein.',
    'Wenn du magst, von oben nach unten\noder von unten nach oben.',
    'Ich beginne gerne in den Fußsohlen.',
    'Wie fühlen sich die Fußsohlen gerade an?',
    'Und dann mit jedem Atemzug\nein Stück weit höher.',
    'Zum Beispiel Sprunggelenke\noder Knie.',
    'Bis du ganz oben angekommen bist.',
    'Oder bei der Stirn.',
    'Gesicht.\nNacken.\nSchultern.\nArme.',
    'Such dir aus, was dir gefällt.',
    'Durchwandere einmal deinen Körper\nwie ein Scan.',
    'Danach kannst du gerne noch so verweilen und atmen.',
    'Und dann, wenn du fertig bist:',
    'Mach die Augen wieder auf.',
    'Komm wieder ins Hier und Jetzt zurück.',
  ],
} as const
