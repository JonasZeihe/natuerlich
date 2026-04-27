// src/features/site/sections/OrnamentBenchmarkSection.tsx
'use client'

import styled from 'styled-components'
import Card from '@/components/primitives/Card'
import Section from '@/components/primitives/Section'
import Surface from '@/components/primitives/Surface'
import type {
  OrnamentAnchor,
  OrnamentBoundary,
  OrnamentName,
  OrnamentPresence,
  OrnamentSize,
} from '@/components/ornaments/registry'
import type { EnergyInput, EnergyMix } from '@/design/theme'

type ShapeExample = {
  name: OrnamentName
  label: string
  feeling: string
  use: string
  size: OrnamentSize
  presence: OrnamentPresence
  anchor: OrnamentAnchor
  energy?: EnergyInput
  mix?: EnergyMix
  mirrorX?: boolean
  mirrorY?: boolean
}

type FieldExample = {
  name: OrnamentName
  label: string
  energy?: EnergyInput
  mix?: EnergyMix
  anchor: OrnamentAnchor
  presence: OrnamentPresence
  size: OrnamentSize
  boundary?: OrnamentBoundary
  mirrorX?: boolean
  mirrorY?: boolean
  copy: string
}

type PresenceExample = {
  label: string
  presence: OrnamentPresence
  copy: string
}

type SizeExample = {
  label: string
  size: OrnamentSize
  copy: string
}

type AnchorExample = {
  label: string
  anchor: OrnamentAnchor
}

type MirrorExample = {
  label: string
  mirrorX?: boolean
  mirrorY?: boolean
}

type BoundaryExample = {
  label: string
  boundary: OrnamentBoundary
  copy: string
}

const energyExamples: readonly {
  label: string
  energy: EnergyInput
  text: string
}[] = [
  {
    label: 'Opening',
    energy: 'opening',
    text: 'Wärme, Zugang, erster Kontakt.',
  },
  {
    label: 'Tension',
    energy: 'tension',
    text: 'Reibung, Ernst, Wunde, Entscheidung.',
  },
  {
    label: 'Density',
    energy: 'density',
    text: 'Tiefe, Bestand, Gewicht, Konzentration.',
  },
  {
    label: 'Flow',
    energy: 'flow',
    text: 'Bewegung, Verbindung, lebendige Richtung.',
  },
]

const mixExamples: readonly {
  label: string
  mix: EnergyMix
  text: string
}[] = [
  {
    label: 'Opening + Flow',
    mix: ['opening', 'flow'],
    text: 'Einladend, aber nicht weichgespült.',
  },
  {
    label: 'Density + Tension',
    mix: ['density', 'tension'],
    text: 'Schwerer, kühler, entschiedener.',
  },
  {
    label: 'Flow + Density',
    mix: ['flow', 'density'],
    text: 'Ruhige Bewegung mit Substanz.',
  },
  {
    label: 'Tension + Opening',
    mix: ['tension', 'opening'],
    text: 'Bruch, der wieder Licht bekommt.',
  },
]

const shapeExamples: readonly ShapeExample[] = [
  {
    name: 'crownWound',
    label: 'Crown Wound',
    feeling: 'Würde unter Druck. Radial, verletzlich, ernst.',
    use: 'Hero, Halo, Signaturmoment.',
    size: 'lg',
    presence: 'strong',
    anchor: 'center',
    mix: ['tension', 'opening'],
  },
  {
    name: 'partitionField',
    label: 'Partition Field',
    feeling: 'Grenze und Nachbarschaft. Kammern, die einander halten.',
    use: 'Background, Field, strukturierte Flächen.',
    size: 'lg',
    presence: 'default',
    anchor: 'bottom-right',
    mix: ['density', 'flow'],
  },
  {
    name: 'gyroidChannel',
    label: 'Gyroid Channel',
    feeling: 'Gekrümmte Tiefe. Leise Raumfalten ohne Tech-Demo.',
    use: 'Premium-Flächen, große Visual Sections.',
    size: 'lg',
    presence: 'default',
    anchor: 'center',
    energy: 'density',
  },
  {
    name: 'rippleOrigin',
    label: 'Ripple Origin',
    feeling: 'Einschlag und Echo. Wirkung, die Kreise zieht.',
    use: 'Accent, Halo, stiller Übergang.',
    size: 'md',
    presence: 'strong',
    anchor: 'center',
    energy: 'flow',
  },
  {
    name: 'traceFan',
    label: 'Trace Fan',
    feeling: 'Öffnung. Eine Spur wird zu Möglichkeiten.',
    use: 'Accent, Divider, kleine Hero-Geste.',
    size: 'md',
    presence: 'default',
    anchor: 'top-right',
    energy: 'opening',
  },
  {
    name: 'rootTrace',
    label: 'Root Trace',
    feeling: 'Bestehende Spurform. Ruhiger Zug mit Nebenarmen.',
    use: 'Baseline gegen die neuen Strukturornamente.',
    size: 'md',
    presence: 'default',
    anchor: 'bottom-left',
    energy: 'flow',
  },
  {
    name: 'braidTrace',
    label: 'Braid Trace',
    feeling: 'Bestehendes Geflecht. Linien, die sich begegnen.',
    use: 'Vergleich: alte Linienlogik gegen neue Körperlogik.',
    size: 'md',
    presence: 'default',
    anchor: 'center',
    mix: ['flow', 'density'],
  },
  {
    name: 'lineFlare',
    label: 'Line Flare',
    feeling: 'Bestehende Auffächerung. Klar, leicht, linear.',
    use: 'Vergleich zu Trace Fan.',
    size: 'md',
    presence: 'subtle',
    anchor: 'right',
    energy: 'opening',
  },
  {
    name: 'cornerMark',
    label: 'Corner Mark',
    feeling: 'Bestehende Kantenmarke. Klein, funktional, ruhig.',
    use: 'Surface-Ecke, Card-Akzent, UI-Markierung.',
    size: 'sm',
    presence: 'strong',
    anchor: 'top-right',
    energy: 'tension',
  },
]

const fieldExamples: readonly FieldExample[] = [
  {
    name: 'partitionField',
    label: 'Section Background',
    mix: ['density', 'flow'],
    anchor: 'bottom-right',
    presence: 'strong',
    size: 'lg',
    boundary: 'bleed',
    copy: 'Groß, leise, strukturbildend. Der Inhalt bleibt vorne, aber der Raum bekommt eine innere Ordnung.',
  },
  {
    name: 'gyroidChannel',
    label: 'Central Halo',
    energy: 'density',
    anchor: 'center',
    presence: 'default',
    size: 'lg',
    copy: 'Die Form sitzt hinter dem Inhalt und erzeugt Tiefe. Nicht als Illustration, sondern als Atmosphäre.',
  },
  {
    name: 'crownWound',
    label: 'Hero Signal',
    mix: ['tension', 'opening'],
    anchor: 'top-left',
    presence: 'strong',
    size: 'md',
    boundary: 'bleed',
    mirrorX: true,
    copy: 'Emotionaler Fokus. Diese Form darf nicht überall stehen, aber wenn sie steht, muss sie tragen.',
  },
  {
    name: 'rippleOrigin',
    label: 'Quiet Ending',
    energy: 'flow',
    anchor: 'bottom-center',
    presence: 'subtle',
    size: 'md',
    copy: 'Ein stiller Abschluss. Kein Icon, eher Nachwirkung.',
  },
]

const presenceExamples: readonly PresenceExample[] = [
  {
    label: 'Subtle',
    presence: 'subtle',
    copy: 'Leise genug für Hintergrund, aber noch lesbar.',
  },
  {
    label: 'Default',
    presence: 'default',
    copy: 'Normale Präsenz für Cards und Flächen.',
  },
  {
    label: 'Strong',
    presence: 'strong',
    copy: 'Bewusst sichtbar, ohne Content zu übernehmen.',
  },
]

const sizeExamples: readonly SizeExample[] = [
  {
    label: 'Small',
    size: 'sm',
    copy: 'Kleine Setzung. Muss klar bleiben.',
  },
  {
    label: 'Medium',
    size: 'md',
    copy: 'Standardmaß. Der wichtigste Alltagstest.',
  },
  {
    label: 'Large',
    size: 'lg',
    copy: 'Große Bühne. Darf angeschnitten und körperlich wirken.',
  },
]

const anchorExamples: readonly AnchorExample[] = [
  { label: 'Top Left', anchor: 'top-left' },
  { label: 'Top Center', anchor: 'top-center' },
  { label: 'Top Right', anchor: 'top-right' },
  { label: 'Left', anchor: 'left' },
  { label: 'Center', anchor: 'center' },
  { label: 'Right', anchor: 'right' },
  { label: 'Bottom Left', anchor: 'bottom-left' },
  { label: 'Bottom Center', anchor: 'bottom-center' },
  { label: 'Bottom Right', anchor: 'bottom-right' },
]

const mirrorExamples: readonly MirrorExample[] = [
  {
    label: 'Normal',
  },
  {
    label: 'Mirror X',
    mirrorX: true,
  },
  {
    label: 'Mirror Y',
    mirrorY: true,
  },
  {
    label: 'Mirror XY',
    mirrorX: true,
    mirrorY: true,
  },
]

const boundaryExamples: readonly BoundaryExample[] = [
  {
    label: 'Contained',
    boundary: 'contained',
    copy: 'Die Form bleibt als innere Schicht im Surface.',
  },
  {
    label: 'Bleed',
    boundary: 'bleed',
    copy: 'Die Form greift über den Rand und macht die Schwelle sichtbar.',
  },
]

export default function OrnamentBenchmarkSection() {
  return (
    <Section
      id="ornament-benchmark"
      variant="body"
      rhythm="spacious"
      tone="arrival"
      mix={['density', 'flow']}
      ornament={{
        name: 'partitionField',
        anchor: 'bottom-right',
        size: 'lg',
        presence: 'subtle',
        boundary: 'bleed',
        mix: ['density', 'flow'],
      }}
    >
      <BenchmarkStack>
        <IntroSurface
          tone="panel"
          bordered
          weight="strong"
          padding="lg"
          radius="large"
          mix={['opening', 'density']}
          ornament={{
            name: 'gyroidChannel',
            anchor: 'center',
            size: 'lg',
            presence: 'subtle',
            mix: ['opening', 'density'],
          }}
        >
          <Eyebrow>Ornament Benchmark</Eyebrow>
          <Title>Einmal alles sehen: Form, Farbe, Fläche, Mischung.</Title>
          <IntroText>
            Diese Section testet die Ornament-Schicht bewusst direkt: als
            Section-Hintergrund, Surface-Background, Card-Akzent, Halo, Field,
            Markierung und Farbträger. Wenn eine Form hier nicht trägt, trägt
            sie im echten Layout auch nicht.
          </IntroText>
        </IntroSurface>

        <Block>
          <BlockHeader>
            <BlockKicker>Shapes</BlockKicker>
            <BlockTitle>Alle Ornamente als Surface-Test</BlockTitle>
          </BlockHeader>

          <ShapeGrid>
            {shapeExamples.map((shape) => (
              <ShapeCard
                key={shape.name}
                tone="panel"
                energy={shape.energy}
                mix={shape.mix}
                padding="lg"
                radius="large"
                bordered
                weight="steady"
                ornament={{
                  name: shape.name,
                  anchor: shape.anchor,
                  size: shape.size,
                  presence: shape.presence,
                  energy: shape.energy,
                  mix: shape.mix,
                  mirrorX: shape.mirrorX,
                  mirrorY: shape.mirrorY,
                }}
              >
                <ShapeMeta>
                  <ShapeName>{shape.label}</ShapeName>
                  <ShapeKey>{shape.name}</ShapeKey>
                </ShapeMeta>
                <ShapeFeeling>{shape.feeling}</ShapeFeeling>
                <ShapeUse>{shape.use}</ShapeUse>
              </ShapeCard>
            ))}
          </ShapeGrid>
        </Block>

        <Block>
          <BlockHeader>
            <BlockKicker>Energy</BlockKicker>
            <BlockTitle>Alle einzelnen Farbachsen</BlockTitle>
          </BlockHeader>

          <ToneGrid>
            {energyExamples.map((item) => (
              <ToneCard
                key={item.energy}
                tone="accent"
                energy={item.energy}
                padding="lg"
                radius="large"
                bordered
                weight="steady"
                ornament={{
                  name: 'rippleOrigin',
                  anchor: 'bottom-right',
                  size: 'md',
                  presence: 'strong',
                  energy: item.energy,
                }}
              >
                <ToneLabel>{item.label}</ToneLabel>
                <ToneText>{item.text}</ToneText>
              </ToneCard>
            ))}
          </ToneGrid>
        </Block>

        <Block>
          <BlockHeader>
            <BlockKicker>Mix</BlockKicker>
            <BlockTitle>Gemischte Energieachsen</BlockTitle>
          </BlockHeader>

          <ToneGrid>
            {mixExamples.map((item) => (
              <ToneCard
                key={item.label}
                tone="accent"
                mix={item.mix}
                padding="lg"
                radius="large"
                bordered
                weight="steady"
                ornament={{
                  name: 'traceFan',
                  anchor: 'top-right',
                  size: 'md',
                  presence: 'strong',
                  mix: item.mix,
                }}
              >
                <ToneLabel>{item.label}</ToneLabel>
                <ToneText>{item.text}</ToneText>
              </ToneCard>
            ))}
          </ToneGrid>
        </Block>

        <Block>
          <BlockHeader>
            <BlockKicker>Presence</BlockKicker>
            <BlockTitle>
              Subtle, Default und Strong im Direktvergleich
            </BlockTitle>
          </BlockHeader>

          <MatrixGrid>
            {presenceExamples.map((item) => (
              <MatrixSurface
                key={item.presence}
                tone="panel"
                mix={['density', 'flow']}
                padding="lg"
                radius="large"
                bordered
                weight="steady"
                ornament={{
                  name: 'partitionField',
                  anchor: 'bottom-right',
                  size: 'lg',
                  presence: item.presence,
                  mix: ['density', 'flow'],
                }}
              >
                <MatrixLabel>{item.label}</MatrixLabel>
                <MatrixText>{item.copy}</MatrixText>
              </MatrixSurface>
            ))}
          </MatrixGrid>
        </Block>

        <Block>
          <BlockHeader>
            <BlockKicker>Size</BlockKicker>
            <BlockTitle>
              Small, Medium und Large nach S01-Scale-Logik
            </BlockTitle>
          </BlockHeader>

          <MatrixGrid>
            {sizeExamples.map((item) => (
              <MatrixSurface
                key={item.size}
                tone="soft"
                mix={['tension', 'opening']}
                padding="lg"
                radius="large"
                bordered
                weight="steady"
                ornament={{
                  name: 'crownWound',
                  anchor: 'center',
                  size: item.size,
                  presence: 'default',
                  mix: ['tension', 'opening'],
                }}
              >
                <MatrixLabel>{item.label}</MatrixLabel>
                <MatrixText>{item.copy}</MatrixText>
              </MatrixSurface>
            ))}
          </MatrixGrid>
        </Block>

        <Block>
          <BlockHeader>
            <BlockKicker>Anchor</BlockKicker>
            <BlockTitle>Alle neun Anchor-Positionen</BlockTitle>
          </BlockHeader>

          <AnchorGrid>
            {anchorExamples.map((item) => (
              <AnchorSurface
                key={item.anchor}
                tone="panel"
                energy="flow"
                padding="md"
                radius="large"
                bordered
                weight="steady"
                ornament={{
                  name: 'rippleOrigin',
                  anchor: item.anchor,
                  size: 'sm',
                  presence: 'strong',
                  energy: 'flow',
                }}
              >
                <AnchorLabel>{item.label}</AnchorLabel>
                <AnchorKey>{item.anchor}</AnchorKey>
              </AnchorSurface>
            ))}
          </AnchorGrid>
        </Block>

        <Block>
          <BlockHeader>
            <BlockKicker>Mirror</BlockKicker>
            <BlockTitle>Spiegelung ohne neue Shape-Dateien</BlockTitle>
          </BlockHeader>

          <ToneGrid>
            {mirrorExamples.map((item) => (
              <ToneCard
                key={item.label}
                tone="accent"
                mix={['opening', 'flow']}
                padding="lg"
                radius="large"
                bordered
                weight="steady"
                ornament={{
                  name: 'traceFan',
                  anchor: 'center',
                  size: 'lg',
                  presence: 'strong',
                  mix: ['opening', 'flow'],
                  mirrorX: item.mirrorX,
                  mirrorY: item.mirrorY,
                }}
              >
                <ToneLabel>{item.label}</ToneLabel>
                <ToneText>
                  Gleiche Form, andere Richtung. Gut für Rhythmus ohne neue
                  Ornament-Datei.
                </ToneText>
              </ToneCard>
            ))}
          </ToneGrid>
        </Block>

        <Block>
          <BlockHeader>
            <BlockKicker>Boundary</BlockKicker>
            <BlockTitle>Contained und Bleed als Randverhalten</BlockTitle>
          </BlockHeader>

          <BoundaryGrid>
            {boundaryExamples.map((item) => (
              <BoundarySurface
                key={item.boundary}
                tone="soft"
                mix={['tension', 'opening']}
                padding="lg"
                radius="large"
                bordered
                weight="strong"
                ornament={{
                  name: 'crownWound',
                  anchor: 'right',
                  size: 'lg',
                  presence: 'strong',
                  boundary: item.boundary,
                  mix: ['tension', 'opening'],
                }}
              >
                <FieldLabel>{item.label}</FieldLabel>
                <FieldText>{item.copy}</FieldText>
              </BoundarySurface>
            ))}
          </BoundaryGrid>
        </Block>

        <Block>
          <BlockHeader>
            <BlockKicker>Background</BlockKicker>
            <BlockTitle>Ornamente als große Flächenkräfte</BlockTitle>
          </BlockHeader>

          <FieldGrid>
            {fieldExamples.map((item) => (
              <FieldSurface
                key={item.label}
                tone="soft"
                energy={item.energy}
                mix={item.mix}
                padding="lg"
                radius="large"
                bordered
                weight="strong"
                ornament={{
                  name: item.name,
                  anchor: item.anchor,
                  size: item.size,
                  presence: item.presence,
                  boundary: item.boundary,
                  energy: item.energy,
                  mix: item.mix,
                  mirrorX: item.mirrorX,
                  mirrorY: item.mirrorY,
                }}
              >
                <FieldLabel>{item.label}</FieldLabel>
                <FieldText>{item.copy}</FieldText>
              </FieldSurface>
            ))}
          </FieldGrid>
        </Block>

        <SectionTest
          tone="threshold"
          mix={['tension', 'density']}
          variant="body"
          rhythm="compact"
          ornament={{
            name: 'crownWound',
            anchor: 'left',
            size: 'lg',
            presence: 'subtle',
            boundary: 'bleed',
            mix: ['tension', 'density'],
          }}
        >
          <SectionTestInner>
            <BlockKicker>Section</BlockKicker>
            <FieldLabel>Section-Ornament als eigene Bühne</FieldLabel>
            <FieldText>
              Dieser Test liegt bewusst als echte Section in der Benchmark. Er
              zeigt, ob das Ornament über die Section-Schwelle greifen kann,
              ohne den Inhalt oder den Rhythmus zu beschädigen.
            </FieldText>
          </SectionTestInner>
        </SectionTest>

        <Block>
          <BlockHeader>
            <BlockKicker>Composed</BlockKicker>
            <BlockTitle>Realistische Card-Komposition</BlockTitle>
          </BlockHeader>

          <CompositionGrid>
            <Card
              tone="elevated"
              mix={['tension', 'opening']}
              padding="lg"
              radius="large"
              bordered
              weight="strong"
              ornament={{
                name: 'crownWound',
                anchor: 'right',
                size: 'lg',
                presence: 'subtle',
                boundary: 'bleed',
                mix: ['tension', 'opening'],
              }}
            >
              <CardTitle>Wunde als Würde</CardTitle>
              <CardText>
                Diese Karte testet, ob das Ornament emotional stark sein darf,
                ohne den Content zu verschlucken. Die Form muss über die Kante
                greifen dürfen, aber sie darf nicht schreien.
              </CardText>
              <BadgeRow>
                <Badge>halo</Badge>
                <Badge>signature</Badge>
                <Badge>bleed</Badge>
              </BadgeRow>
            </Card>

            <Card
              tone="panel"
              mix={['density', 'flow']}
              padding="lg"
              radius="large"
              bordered
              weight="steady"
              ornament={{
                name: 'partitionField',
                anchor: 'bottom-right',
                size: 'lg',
                presence: 'subtle',
                boundary: 'bleed',
                mix: ['density', 'flow'],
              }}
            >
              <CardTitle>Grenzen, die verbinden</CardTitle>
              <CardText>
                Partition Field testet die wichtigste Grundidee: klare Räume,
                poröse Kanten, lesbare Nachbarschaft. Nicht Biologie. Struktur.
              </CardText>
              <BadgeRow>
                <Badge>field</Badge>
                <Badge>background</Badge>
                <Badge>threshold</Badge>
              </BadgeRow>
            </Card>

            <Card
              tone="band"
              energy="density"
              padding="lg"
              radius="large"
              bordered
              weight="steady"
              ornament={{
                name: 'gyroidChannel',
                anchor: 'center',
                size: 'lg',
                presence: 'subtle',
                energy: 'density',
              }}
            >
              <CardTitle>Tiefe ohne Effekt</CardTitle>
              <CardText>
                Gyroid Channel muss edel wirken, nicht mathematisch. Die Linien
                sollen Raum falten, ohne einen Render-Look vorzutäuschen.
              </CardText>
              <BadgeRow>
                <Badge>premium</Badge>
                <Badge>depth</Badge>
                <Badge>quiet</Badge>
              </BadgeRow>
            </Card>
          </CompositionGrid>
        </Block>
      </BenchmarkStack>
    </Section>
  )
}

const BenchmarkStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
  min-width: 0;
`

const IntroSurface = styled(Surface)`
  min-height: clamp(20rem, 42vw, 34rem);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const Eyebrow = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing(0.75)};
  max-width: ${({ theme }) => theme.typography.measure.compact};
  color: ${({ theme }) => theme.roles.text.subtle};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
`

const Title = styled.h2`
  margin: 0;
  max-width: ${({ theme }) => theme.typography.measure.title};
  color: ${({ theme }) => theme.roles.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.h1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tighter};
`

const IntroText = styled.p`
  margin: ${({ theme }) => theme.spacing(1.15)} 0 0;
  max-width: ${({ theme }) => theme.typography.measure.prose};
  color: ${({ theme }) => theme.roles.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.subtitle};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.2)};
  min-width: 0;
`

const BlockHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(0.35)};
  min-width: 0;
`

const BlockKicker = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.roles.text.subtle};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
`

const BlockTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.roles.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.h2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
`

const ShapeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing(1)};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const ShapeCard = styled(Surface)`
  min-height: 16rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const ShapeMeta = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(0.75)};
  margin-bottom: ${({ theme }) => theme.spacing(0.6)};
`

const ShapeName = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.roles.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.h3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`

const ShapeKey = styled.span`
  color: ${({ theme }) => theme.roles.text.subtle};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
`

const ShapeFeeling = styled.p`
  margin: 0;
  max-width: ${({ theme }) => theme.typography.measure.prose};
  color: ${({ theme }) => theme.roles.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`

const ShapeUse = styled.p`
  margin: ${({ theme }) => theme.spacing(0.7)} 0 0;
  color: ${({ theme }) => theme.roles.text.subtle};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`

const ToneGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing(1)};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const ToneCard = styled(Surface)`
  min-height: 12rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const ToneLabel = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.roles.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.h4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`

const ToneText = styled.p`
  margin: ${({ theme }) => theme.spacing(0.65)} 0 0;
  color: ${({ theme }) => theme.roles.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`

const MatrixGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing(1)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const MatrixSurface = styled(Surface)`
  min-height: 18rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const MatrixLabel = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.roles.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.h3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`

const MatrixText = styled.p`
  margin: ${({ theme }) => theme.spacing(0.7)} 0 0;
  max-width: ${({ theme }) => theme.typography.measure.prose};
  color: ${({ theme }) => theme.roles.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`

const AnchorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing(1)};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const AnchorSurface = styled(Surface)`
  min-height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const AnchorLabel = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.roles.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.h4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`

const AnchorKey = styled.p`
  margin: ${({ theme }) => theme.spacing(0.35)} 0 0;
  color: ${({ theme }) => theme.roles.text.subtle};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
`

const BoundaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing(1)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const BoundarySurface = styled(Surface)`
  min-height: clamp(16rem, 27vw, 24rem);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing(1)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const FieldSurface = styled(Surface)`
  min-height: clamp(18rem, 30vw, 26rem);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const FieldLabel = styled.h4`
  margin: 0;
  max-width: ${({ theme }) => theme.typography.measure.title};
  color: ${({ theme }) => theme.roles.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.h2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
`

const FieldText = styled.p`
  margin: ${({ theme }) => theme.spacing(0.85)} 0 0;
  max-width: ${({ theme }) => theme.typography.measure.prose};
  color: ${({ theme }) => theme.roles.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`

const SectionTest = styled(Section)`
  overflow: visible;
`

const SectionTestInner = styled.div`
  min-height: clamp(16rem, 28vw, 24rem);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const CompositionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing(1)};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`

const CardTitle = styled.h4`
  margin: 0;
  max-width: ${({ theme }) => theme.typography.measure.title};
  color: ${({ theme }) => theme.roles.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.h3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
`

const CardText = styled.p`
  margin: ${({ theme }) => theme.spacing(0.85)} 0 0;
  max-width: ${({ theme }) => theme.typography.measure.prose};
  color: ${({ theme }) => theme.roles.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(0.45)};
  margin-top: ${({ theme }) => theme.spacing(1.2)};
`

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 1.7rem;
  padding-inline: ${({ theme }) => theme.spacing(0.65)};
  border: 1px solid ${({ theme }) => theme.roles.border.subtle};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  color: ${({ theme }) => theme.roles.text.subtle};
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.roles.surface.panel} 74%,
    transparent
  );
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  line-height: 1;
`
