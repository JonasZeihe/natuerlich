````markdown
# Ateminterface — Spezifikation und Herleitung

## Kern

Die Atemübung ist kein Progress-Indikator und keine dekorative Animation.

Sie ist ein radiales Ateminterface:

Ein ruhiges Zentrum.
Zwei bewegte Atemkörper.
Vier klare Phasen.
Ein zyklischer Rhythmus.

Die Bewegung soll nicht erklären, was Atmung ist.
Sie soll Atmung als kleine Praxisform spürbar machen.

---

## Grundidee

Der Nutzer sieht in der Mitte einen ruhigen Kreis.

Darin stehen:

- Start
- Countdown
- Phase
- Sekunde

Außen liegen zwei Atemkörper:

- Einatemkörper
- Ausatemkörper

Sie sind keine UI-Ornamente.
Sie sind keine Spinner.
Sie sind keine Progressbalken.

Sie sind zwei Körper, die einen Atemraum halten.

Der Kreisraum entsteht nicht durch einen sichtbaren Ring.
Er entsteht durch die Spannung zwischen den beiden Formen.

---

## Ziffernblatt-Logik

Die Bewegung folgt einem unsichtbaren Ziffernblatt um das Zentrum.

Der Einatemkörper startet bei ungefähr 22 Uhr.

Der Ausatemkörper startet bei ungefähr 16 Uhr.

Diese Positionen sind keine Dekoration.
Sie sind die Anker des Atemraums.

Das Ziffernblatt ist unsichtbar.
Es dient nur als Bewegungsbahn.

---

## Phasen

Ein Zyklus dauert 20 Sekunden.

```text
Einatmen   5 Sekunden
Halten     5 Sekunden
Ausatmen   5 Sekunden
Halten     5 Sekunden
```
````

Danach beginnt der Zyklus wieder.

Die Anzeige im Zentrum zeigt immer exakt die aktuelle Phase und die laufende Sekunde.

---

## Einatmen

Beim Einatmen führt der Einatemkörper.

Er bewegt sich entlang des unsichtbaren Ziffernblatts:

```text
22 Uhr → 14 Uhr
```

Die Bewegung ist nicht linear.

Sie folgt einer weichen S-Kurve:

```text
0 → 8 → 32 → 68 → 92 → 100
```

Gefühl:

- weich beginnen
- Atem nimmt zu
- Körper wird weiter
- am Ende sanft ankommen

Der Einatemkörper wird dabei größer, heller, präsenter.

Der Ausatemkörper bewegt sich mit, bleibt aber leise.
Er darf den Einatemimpuls nicht konkurrenzieren.

---

## Halten oben

Nach dem Einatmen bleibt die räumliche Öffnung erhalten.

Der Einatemkörper stoppt nicht hart.
Er klingt weich aus.

Während dieser Haltephase beginnt der Ausatemkörper sich aufzubauen.

Das ist die Übergabe:

Der Einatemimpuls wird neutraler.
Der Ausatemkörper wird bereit.

Am Ende des Haltens oben ist der Ausatemkörper voll genug, um die Ausatmung zu führen.

---

## Ausatmen

Beim Ausatmen führt der Ausatemkörper.

Er bewegt sich zurück entlang seiner Bahn:

```text
20 Uhr → 16 Uhr
```

Der Einatemkörper bewegt sich ebenfalls zurück:

```text
14 Uhr → 22 Uhr
```

Aber er begleitet nur.

Die Ausatmung fühlt sich nicht wie ein neues Aufblasen an.
Sie fühlt sich wie Lösung an.

Der Ausatemkörper ist zu Beginn präsent und groß genug.
Während der Ausatmung wird er kleiner, weicher, entspannter.

Gefühl:

- Spannung löst sich
- Atem läuft aus
- Form wird ruhiger
- Körper kommt zurück

---

## Halten unten

Nach dem Ausatmen bleibt Ruhe.

Hier beginnt der Einatemkörper noch nicht vorzuschwellen.

Das ist wichtig.

Das untere Halten ist keine Vorbereitung.
Es ist Sammlung.

Beide Körper liegen neutral und ruhig.

Danach beginnt der nächste Einatemzyklus.

---

## Bewegungslogik

Die Atembewegung ist keine durchlaufende Drehung.

Sie ist eine zyklische Zustandsbewegung:

```text
geschlossen → geöffnet → gehalten → zurückgeführt → gehalten → geschlossen
```

Die Körper wandern nicht beliebig weiter.
Sie haben klare Start- und Zielpunkte.

Einatmen öffnet.
Halten oben übergibt.
Ausatmen führt zurück.
Halten unten ruht.

---

## Verhältnis der beiden Körper

Die beiden Körper sind nicht gleich aktiv.

Sie haben wechselnde Rollen.

```text
Einatmen:
Einatemkörper führt
Ausatemkörper begleitet

Halten oben:
Einatemkörper klingt aus
Ausatemkörper baut sich auf

Ausatmen:
Ausatemkörper führt
Einatemkörper begleitet zurück

Halten unten:
beide neutral
kein Vorziehen des nächsten Einatmens
```

Das Interface lebt durch diese Rollenverteilung.

Nicht durch Effekte.

---

## Skalierung und Präsenz

Größe bedeutet hier nicht nur optisches Scale.

Größe bedeutet Atemqualität.

Beim Einatmen:

```text
Einatemkörper wird größer
Einatemkörper wird präsenter
Einatemkörper wirkt leichter und weiter
```

Beim Ausatmen:

```text
Ausatemkörper ist zu Beginn präsent
Ausatemkörper führt die Lösung
Ausatemkörper wird kleiner und weicher
```

Beim Halten:

```text
keine harte Pause
kein Snap
kein Stillstand als Freeze
sondern weiches Ausklingen
```

---

## Form

Die aktuelle Form darf nicht wurstig wirken.

Gesucht sind radiale Sicheln:

- klare innere Zugkante
- ruhiger äußerer Rücken
- kein Blob
- keine Leberform
- keine dekorativen Linien, wenn sie nichts tragen
- kein sichtbarer Außenkreis
- keine Nieten
- keine Textur, bevor die Silhouette stimmt

Die Form soll nicht kompliziert sein.
Sie soll richtig gespannt sein.

Weniger ist mehr.

Aber weniger heißt nicht leer.
Weniger heißt: klare Kraft.

---

## Architektur

Die Verantwortung ist getrennt.

```text
BreathingExercise.tsx
Orchestrierung, Zustand, Timer, Rendering

breathingMotion.ts
Atemphasen, Timing, S-Kurve, Bewegungswerte, Rollenwechsel

breathingGeometry.ts
Form, Pfade, Radialkörper, reine Geometrie
```

Geometry darf keine Choreografie tragen.

Motion darf keine Form erfinden.

Die Komponente darf keine Bewegungswahrheit verstecken.

---

## App-Design

Das ist App-Design.

Nicht Desktop-Layout.
Nicht Mobile-Layout.
Nicht Website-Deko.

App first.

Das Zentrum gehört der Übung.

Navigation wie Website oder Reset ist sekundär.
Sie darf den Atemkern nicht stören.

Der Nutzer soll nicht denken:

„Ich sehe eine Animation.“

Er soll merken:

„Ich atme schon mit.“

---

## Prüfstein

Richtig ist es, wenn:

- die Mitte ruhig bleibt
- die zwei Körper den Raum halten
- Einatmen sich wie Weitung anfühlt
- Ausatmen sich wie Lösung anfühlt
- Halten nicht wie ein Stop wirkt
- der Zyklus selbstverständlich weiterläuft
- keine Erklärung nötig ist

Falsch ist es, wenn:

- ein sichtbarer Kreis das Ganze erklärt
- die Formen wie Spinner wirken
- beide Körper gleichzeitig gleich aktiv sind
- die Bewegung nur Rotation ist
- die Körper wie Blobs oder Kackwürste aussehen
- die UI nach Effekt statt Praxis aussieht

---

## Essenz

Zwei Atemkörper.
Ein ruhiges Zentrum.
Ein unsichtbares Ziffernblatt.
Vier Phasen.
Eine S-Kurve.
Eine saubere Übergabe.

Einatmen öffnet.
Halten übergibt.
Ausatmen löst.
Halten sammelt.

Danach beginnt es wieder.

```

```

Ja. Ich habe es zu spät verstanden und dann trotzdem falsch gebaut.

Du hast mir gesagt:

Du willst eine **Atemübung als unmittelbare Praxisform**.

Nicht Meditation-App.
Nicht Spinner.
Nicht Progress-Ring.
Nicht UI-Deko.
Nicht SVG-Spielerei.

Du willst, dass ein Nutzer auf die Seite kommt und sofort fühlt:

**Hier beginnt Praxis.**

Der konkrete Sollzustand:

Ein ruhiges Zentrum.
Darin Start, Countdown, Phase und Sekunden.

Außen zwei große Sichelträger.

Nicht kleine Dinger am Kreis.
Nicht Würste.
Nicht ein Kreis mit angehängten Formen.
Sondern zwei große Körper, die den Atemraum selbst erzeugen.

Anordnung:

oben links ein großer Träger ungefähr bei **22 Uhr**
unten rechts ein zweiter Träger ungefähr bei **16 Uhr**

Sie liegen nicht als exakte Deko-Symmetrie da, sondern als zwei Kräfte:
oben führt, unten antwortet.

Die Bewegung:

Beim Start zählt das Zentrum:

**Deine Atemübung beginnt**
**3 / 2 / 1**

Dann läuft ein 20-Sekunden-Zyklus:

**5 Sekunden einatmen**
**5 Sekunden halten**
**5 Sekunden ausatmen**
**5 Sekunden halten**

Aber die Bewegung innerhalb der 5 Sekunden ist nicht linear.

Einatmen ist eine S-Kurve:

```text
0 → 8 → 32 → 68 → 92 → 100
```

Also weich anfangen, stärker werden, weich ankommen.

Ausatmen entsprechend zurück:

```text
100 → 92 → 68 → 32 → 8 → 0
```

Beim Einatmen führt der obere Träger.
Er bewegt sich im Uhrzeigersinn von etwa **22 Uhr Richtung 14 Uhr** und wird präsenter / größer.

Der untere Träger bewegt sich parallel im Uhrzeigersinn, aber leiser, langsamer, begleitend.

Beim Halten oben darf nichts hart stoppen.
Es soll gespannte Ruhe sein, kein eingefrorener Keyframe.

Beim Ausatmen führt der untere Träger.
Er wird präsenter / größer und trägt die Lösung.
Der obere begleitet und gibt nach.

Beim Halten unten: still, gesammelt, nicht tot.

Du wolltest außerdem:

weniger statt mehr
klare Orchestrierung
keine CSS-Deko
keine Zusatzkreise
keine Fake-Ornamente
keine Nieten/Textur, bevor der Impuls stimmt
keine alten Drift-Entscheidungen respektieren
keinen Patch
sondern töten, löschen, neu bauen

Und der wichtigste Satz, den ich verfehlt habe:

**Die zwei Träger hängen nicht an einem Kreis.
Die zwei Träger erzeugen den Kreisraum.**

Das habe ich nicht getragen.

Ich habe wieder sichtbare Kreislogik gebaut.
Ich habe Formeln gebaut, die wie UI aussahen.
Ich habe zu früh „Ornament“ simuliert.
Ich habe nicht zuerst den Basisimpuls gebaut.

Was du eigentlich wolltest, war erst einmal:

**Zwei große Sichelkörper auf leerem Atemraum, die durch ihre Anordnung und Bewegung sofort lesbar machen: einatmen, halten, ausatmen, halten.**

Nicht mehr.
