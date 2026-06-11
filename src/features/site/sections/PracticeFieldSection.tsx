// src/features/site/sections/PracticeFieldSection.tsx
'use client'

import styled, { css } from 'styled-components'
import Button from '@/components/actions/Button'
import Headline from '@/components/content/Headline'
import Grid from '@/components/primitives/Grid'
import Section from '@/components/primitives/Section'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import Typography from '@/design/typography'

type Props = {
  onGoToIntegration: () => void
}

type PracticeTone =
  | 'breath'
  | 'release'
  | 'attention'
  | 'regulation'
  | 'path'
  | 'qigong'
  | 'yoga'
  | 'taiji'

const blogUrl = 'https://ziran.onrender.com/'

const PracticeFieldSection = ({
  onGoToIntegration: _onGoToIntegration,
}: Props) => {
  const openBlog = () => {
    window.open(blogUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <PracticeSection
      id="arbeiten"
      titleId="arbeiten-title"
      ariaLabel="Arbeiten"
      container="wide"
      content="default"
      variant="body"
      rhythm="spacious"
      tone="quiet"
      header={
        <StoneHeader>
          <HeaderStone aria-hidden="true" />

          <HeaderContent>
            <Headline
              titleId="arbeiten-title"
              title="Ein Stein, der ins Wasser fällt, zieht Kreise."
              subheadline="Was später tragen soll, muss vorher gesetzt sein."
              accent="qigong"
              weight="poster"
            />
          </HeaderContent>
        </StoneHeader>
      }
    >
      <PracticeStack aria-label="Praxisweg">
        <OpeningField>
          <OpeningCopy>
            <OpeningQuote as="h3" variant="h3">
              Manchmal mache ich alles richtig. Ich atme. Ich entspanne. Ich
              will zur Ruhe kommen. Und trotzdem findet mein System nicht
              zurück.
            </OpeningQuote>

            <OpeningAnswer as="p" variant="body">
              Dann ist nicht Entspannung das Problem, sondern der Zustand, in
              dem sie angewendet wird.
            </OpeningAnswer>
          </OpeningCopy>

          <PrincipleGrid>
            <PrincipleItem $tone="breath">
              <Typography as="h3" variant="h3">
                Der Atem ist der erste Zugang.
              </Typography>

              <SoftText as="p" variant="body">
                Er öffnet Rhythmus, Weite und Wahrnehmung. Nicht als Technik,
                die sofort alles löst, sondern als Anfang einer Beziehung zum
                eigenen System.
              </SoftText>
            </PrincipleItem>

            <PrincipleItem $tone="release">
              <Typography as="h3" variant="h3">
                Entspannung muss wieder gelernt werden.
              </Typography>

              <SoftText as="p" variant="body">
                Viele Menschen merken erst in der Ruhe, wie viel Spannung sie
                tragen. Entspannung heißt dann nicht einfach loslassen, sondern
                spüren, wo etwas gehalten wird und wie es langsam nachgeben
                kann.
              </SoftText>
            </PrincipleItem>

            <PrincipleItem $tone="attention">
              <Typography as="h3" variant="h3">
                Achtsamkeit ordnet Wahrnehmung.
              </Typography>

              <SoftText as="p" variant="body">
                Body Scan, Meditation und einfache Aufmerksamkeit helfen, nicht
                sofort zu bewerten, zu reparieren oder wegzudrücken. Ich habe
                gelernt, genauer da zu sein, ohne mich im eigenen Zustand zu
                verlieren.
              </SoftText>
            </PrincipleItem>
          </PrincipleGrid>
        </OpeningField>

        <PanelGrid>
          <ResultPanel $tone="regulation">
            <Stack>
              <Typography as="h3" variant="h3" tone="strong">
                Daraus entsteht Stressmanagement.
              </Typography>

              <SoftText as="p" variant="body" measure="wide">
                Stressmanagement ist dann kein theoretisches Thema mehr, sondern
                eine Konsequenz aus Wahrnehmung, Atem, Entspannung und
                Achtsamkeit. Man lernt, den eigenen Zustand früher zu lesen,
                bevor Schlaf kippt, Spannung normal wird oder der Körper erst
                nachts zeigt, was tagsüber keinen Raum hatte.
              </SoftText>
            </Stack>
          </ResultPanel>

          <ResultPanel $tone="path">
            <Stack>
              <Typography as="h3" variant="h3" tone="strong">
                Dann wird aus Technik ein Weg.
              </Typography>

              <SoftText as="p" variant="body" measure="wide">
                Atmung, Entspannung und Achtsamkeit bleiben nicht getrennt. Sie
                greifen ineinander. Erst dadurch wird Bewegung mehr als
                Bewegung: eine Praxis, die den ganzen Menschen mitnimmt.
              </SoftText>
            </Stack>
          </ResultPanel>
        </PanelGrid>

        <MethodPanel tone="bare" radius="none" padding="none">
          <MethodMark aria-hidden="true" />

          <MethodStack>
            <MethodHeader>
              <Typography as="h2" variant="h2" tone="strong">
                In der Mitte steht Daoyin Yangsheng Gong.
              </Typography>

              <Typography as="p" variant="body" tone="soft" measure="wide">
                Das ist der Zusammenhang, aus dem ich arbeite: Atem,
                Aufmerksamkeit, Gesundheitspflege, Bewegung, Qigong und später
                auch Taijiquan.
              </Typography>
            </MethodHeader>

            <MethodDefinition>
              <Typography as="h3" variant="h3" tone="strong">
                Daoyin Yangsheng Gong — 導引養生功
              </Typography>

              <DefinitionList>
                <DefinitionItem>
                  <TermName>Daoyin — 導引</TermName>
                  <TermMeaning>Führung von Spannung in Antwort.</TermMeaning>
                </DefinitionItem>

                <DefinitionItem>
                  <TermName>Yangsheng — 養生</TermName>
                  <TermMeaning>
                    Sorge für das Lebendige, das dadurch hervortritt.
                  </TermMeaning>
                </DefinitionItem>

                <DefinitionItem>
                  <TermName>Gong — 功</TermName>
                  <TermMeaning>
                    Gereifte Wirksamkeit aus richtiger Wiederholung.
                  </TermMeaning>
                </DefinitionItem>
              </DefinitionList>
            </MethodDefinition>
          </MethodStack>
        </MethodPanel>

        <PracticeWayGrid>
          <PracticeCard $tone="qigong">
            <Typography as="h3" variant="h3">
              Übung an der Lebendigkeit.
            </Typography>

            <SoftText as="p" variant="body">
              <Strong>Qigong</Strong> 氣功: Qi als Atem, Odem oder Lebenshauch.
              Gong als Übung, Arbeit und erworbenes Können. Im alten Zeichen
              steckt das Bild vom aufplatzenden Reiskorn, aus dem Dampf
              aufsteigt. Qigong ist keine Energiebehauptung, sondern Praxis:
              führen, atmen, drehen, wringen, wahrnehmen, wiederholen.
            </SoftText>
          </PracticeCard>

          <PracticeCard $tone="yoga">
            <Typography as="h3" variant="h3">
              Verbinden, anschirren, ausrichten.
            </Typography>

            <SoftText as="p" variant="body">
              <Strong>Yoga</Strong> kommt von yuj. Gemeint ist hier keine
              Körperform zum Abhaken, sondern ein Übungsweg für Körper, Atem,
              Geist und Alltag: Haltung, Bewegung, Atmung, Entspannung,
              Konzentration und die Art, wie du mit dir selbst umgehst.
            </SoftText>
          </PracticeCard>

          <PracticeCard $tone="taiji">
            <Typography as="h3" variant="h3">
              Ruhe als geführte Kraft.
            </Typography>

            <SoftText as="p" variant="body">
              <Strong>Taijiquan</Strong> 太極拳: Taiji, das höchste Prinzip, der
              Dachfirst. Quan, die Faust. Taijiquan ist nicht langsames Qigong
              und nicht Entspannungsbewegung mit schöner Form. Es ist Arbeit an
              Struktur, Mitte, Gewicht, Richtung, Wandlung und Kraft ohne
              Verkrampfung.
            </SoftText>
          </PracticeCard>
        </PracticeWayGrid>

        <Footer tone="note" radius="lg" padding="lg">
          <FooterGrid columns={2} min="18rem">
            <FooterPrimary>
              <Typography as="h3" variant="h3" tone="strong">
                Manchmal ist ein Kurs der richtige Anfang. Manchmal braucht es
                Einzelunterricht. Manchmal entsteht daraus eine regelmäßige
                Gruppe.
              </Typography>

              <Typography as="p" variant="body" tone="soft" measure="wide">
                Entscheidend ist nicht, wie das Format heißt. Entscheidend ist,
                ob es zu deinem Stand, deinem Alltag und deiner Richtung passt.
              </Typography>
            </FooterPrimary>

            <FooterAction>
              <Typography as="p" variant="body" tone="soft">
                Wenn dich die Zusammenhänge interessieren: In meinem Blog
                erzähle ich mehr über Stress, Praxis, meinen Weg und die Ideen
                hinter dieser Arbeit.
              </Typography>

              <FooterButtons>
                <Button type="button" variant="secondary" onClick={openBlog}>
                  Blog öffnen
                </Button>
              </FooterButtons>
            </FooterAction>
          </FooterGrid>
        </Footer>
      </PracticeStack>
    </PracticeSection>
  )
}

const PracticeSection = styled(Section)`
  background: ${({ theme }) => theme.palette.ivory};
`

const StoneHeader = styled.div`
  position: relative;
  display: grid;
  min-height: clamp(11rem, 24vw, 17rem);
  align-items: center;
  isolation: isolate;
`

const HeaderStone = styled.div`
  position: absolute;
  z-index: -1;
  inset-block: 0;
  left: 0;
  width: min(52rem, 100%);
  pointer-events: none;
  background: ${({ theme }) => theme.color.surface.paper};
  border-radius: 48% 52% 55% 45% / 50% 58% 42% 50%;
  box-shadow: 0 1.1rem 2.8rem
    color-mix(in srgb, ${({ theme }) => theme.palette.ink} 8%, transparent);
  transform: translateX(-8%) rotate(1.8deg);
  transform-origin: 50% 50%;

  @media (max-width: ${({ theme }) => theme.breakpoint.sm}) {
    top: 0;
    bottom: 0;
    left: 0;
    width: min(31rem, calc(100vw + 7rem));
    border-radius: 52% 48% 57% 43% / 48% 56% 44% 52%;
    transform: translateX(-38%) rotate(4deg);
  }

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    left: 50%;
    width: min(58rem, 92%);
    transform: translateX(-50%) rotate(1.2deg);
    border-radius: 50% 50% 54% 46% / 49% 56% 44% 51%;
  }
`

const HeaderContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 64ch;
  padding-block: clamp(1.4rem, 4vw, 2.8rem);

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    margin-inline: auto;
  }
`

const PracticeStack = styled.div`
  display: grid;
  gap: clamp(3.6rem, 8.5vw, 6.4rem);
  width: 100%;
  min-width: 0;
`

const OpeningField = styled.div`
  display: grid;
  gap: clamp(2.6rem, 6vw, 4.9rem);
  min-width: 0;
  padding: clamp(1.7rem, 5vw, 3.5rem);
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.palette.morningLight} 68%,
    ${({ theme }) => theme.palette.paper}
  );
  border-radius: 3rem 2.2rem 3.5rem 2.4rem / 2.2rem 3.4rem 2.5rem 3rem;
  box-shadow: 0 1.1rem 2.8rem
    color-mix(in srgb, ${({ theme }) => theme.palette.ink} 5%, transparent);

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    padding: clamp(2.4rem, 4.4vw, 4.4rem);
  }
`

const OpeningCopy = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.gap.text};
  max-width: 56rem;
  margin-inline: auto;
  text-align: center;
`

const OpeningQuote = styled(Typography)`
  color: color-mix(
    in srgb,
    ${({ theme }) => theme.palette.morningDeep} 46%,
    ${({ theme }) => theme.palette.ink}
  );
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  max-width: 42ch;
  margin: 0 auto;
`

const OpeningAnswer = styled(Typography)`
  color: ${({ theme }) => theme.palette.inkSoft};
  max-width: 46ch;
  text-align: left;
`

const practiceToneCSS = (tone: PracticeTone) => css`
  ${({ theme }) => {
    const { palette } = theme

    const map = {
      breath: {
        background: 'transparent',
        text: palette.morningDeep,
        soft: palette.inkSoft,
        border: 'transparent',
      },
      release: {
        background: 'transparent',
        text: palette.inkSoft,
        soft: palette.inkSoft,
        border: 'transparent',
      },
      attention: {
        background: 'transparent',
        text: palette.blue,
        soft: palette.inkSoft,
        border: 'transparent',
      },
      regulation: {
        background: palette.paper,
        text: null,
        soft: palette.inkSoft,
        border: palette.morningDeep,
      },
      path: {
        background: palette.mossLight,
        text: null,
        soft: palette.inkSoft,
        border: palette.moss,
      },
      qigong: {
        background: palette.blueLight,
        text: null,
        soft: palette.inkSoft,
        border: 'transparent',
      },
      yoga: {
        background: theme.domain.phase.relation,
        text: palette.ivory,
        soft: palette.ivory,
        border: 'transparent',
      },
      taiji: {
        background: palette.blueDeep,
        text: palette.ivory,
        soft: palette.ivory,
        border: 'transparent',
      },
    } satisfies Record<
      PracticeTone,
      {
        background: string
        text: string | null
        soft: string
        border: string
      }
    >

    const colors = map[tone]

    return css`
      --practice-soft: ${colors.soft};
      --practice-heading: ${colors.text ?? theme.color.text.default};

      border-color: ${colors.border};
      background: ${colors.background};
      ${colors.text
        ? css`
            color: ${colors.text};
          `
        : ''}
    `
  }}
`

const SoftText = styled(Typography)`
  color: var(--practice-soft);
`

const Strong = styled.strong`
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: currentColor;
`

const PrincipleGrid = styled.div`
  display: grid;
  gap: clamp(2.2rem, 6vw, 3.8rem);
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(2.2rem, 4vw, 4rem);
  }
`

const PrincipleItem = styled.article<{ $tone: PracticeTone }>`
  display: grid;
  gap: ${({ theme }) => theme.layout.gap.text};
  min-width: 0;
  ${({ $tone }) => practiceToneCSS($tone)}

  h3 {
    max-width: 18ch;
    color: var(--practice-heading);
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.sm}) {
    gap: ${({ theme }) => theme.layout.gap.block};

    h3 {
      font-size: ${({ theme }) => theme.font.size.xl};
    }
  }
`

const PanelGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.gap.grid};
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const ResultPanel = styled.article<{ $tone: PracticeTone }>`
  display: grid;
  min-width: 0;
  height: 100%;
  padding: ${({ theme }) => theme.layout.surfacePadding.lg};
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: 0 1rem 2.6rem
    color-mix(in srgb, ${({ theme }) => theme.palette.ink} 4%, transparent);
  ${({ $tone }) => practiceToneCSS($tone)}
`

const MethodPanel = styled(Surface)`
  position: relative;
  min-height: clamp(25rem, 34vw, 33rem);
  padding: clamp(2.6rem, 6vw, 5.2rem);
  color: ${({ theme }) => theme.palette.ivory};
  background: ${({ theme }) => theme.palette.jadeDeep};
  border-radius: 3.3rem 2.2rem 3.9rem 2.5rem / 2.5rem 3.4rem 2.4rem 4rem;
  box-shadow: 0 1.6rem 3.8rem
    color-mix(in srgb, ${({ theme }) => theme.palette.ink} 16%, transparent);
  overflow: clip;

  h2,
  h3,
  p,
  dt,
  dd {
    color: inherit;
  }

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    padding: clamp(3.4rem, 5.4vw, 5.8rem);
  }
`

const MethodMark = styled.div`
  position: absolute;
  inset: 10%;
  pointer-events: none;
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.palette.moss} 48%,
    ${({ theme }) => theme.palette.jadeDeep}
  );
  mask-image: url('/DYYSG.svg');
  mask-repeat: no-repeat;
  mask-position: 50% 50%;
  mask-size: 70% auto;
  transform: rotate(-2deg);
  transform-origin: 50% 50%;

  @media (max-width: ${({ theme }) => theme.breakpoint.sm}) {
    inset: 10%;
    mask-size: 100% auto;
  }
`

const MethodStack = styled(Stack)`
  position: relative;
  z-index: 1;
  gap: clamp(2.4rem, 5vw, 4.2rem);
`

const MethodHeader = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.gap.block};
  max-width: 64ch;
`

const MethodDefinition = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.gap.block};
  max-width: 64rem;
`

const DefinitionList = styled.dl`
  display: grid;
  gap: ${({ theme }) => theme.layout.gap.block};
  margin: 0;
  padding: 0;
`

const DefinitionItem = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.gap.text};

  @media (min-width: ${({ theme }) => theme.breakpoint.sm}) {
    grid-template-columns: minmax(9.5rem, 0.32fr) minmax(0, 1fr);
    gap: ${({ theme }) => theme.layout.gap.block};
    align-items: baseline;
  }
`

const TermName = styled.dt`
  margin: 0;
  font-family: ${({ theme }) => theme.text.body.fontFamily};
  font-size: ${({ theme }) => theme.text.body.fontSize};
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  line-height: ${({ theme }) => theme.text.body.lineHeight};
  color: inherit;
`

const TermMeaning = styled.dd`
  margin: 0;
  font-family: ${({ theme }) => theme.text.body.fontFamily};
  font-size: ${({ theme }) => theme.text.body.fontSize};
  font-weight: ${({ theme }) => theme.text.body.fontWeight};
  line-height: ${({ theme }) => theme.text.body.lineHeight};
  color: ${({ theme }) => theme.palette.ivory};
`

const PracticeWayGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.gap.grid};
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

const PracticeCard = styled.article<{ $tone: PracticeTone }>`
  display: grid;
  align-content: start;
  gap: ${({ theme }) => theme.layout.gap.block};
  min-width: 0;
  padding: ${({ theme }) => theme.layout.surfacePadding.lg};
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: 0 1rem 2.4rem
    color-mix(in srgb, ${({ theme }) => theme.palette.ink} 5%, transparent);
  ${({ $tone }) => practiceToneCSS($tone)}

  h3 {
    max-width: 18ch;
  }
`

const Footer = styled(Surface)`
  padding: clamp(2rem, 6vw, 3.8rem);
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.domain.practice.daoyin} 22%,
    ${({ theme }) => theme.palette.bone}
  );
  box-shadow: 0 1.1rem 2.8rem
    color-mix(in srgb, ${({ theme }) => theme.palette.ink} 5%, transparent);
`

const FooterGrid = styled(Grid)`
  gap: clamp(2.4rem, 7vw, 5.6rem);
  align-items: center;
`

const FooterPrimary = styled(Stack)`
  gap: ${({ theme }) => theme.layout.gap.block};
  max-width: 42rem;
`

const FooterAction = styled.div`
  display: grid;
  align-content: center;
  gap: clamp(1.8rem, 4vw, 2.8rem);
  max-width: 40rem;

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    justify-self: end;
    text-align: right;
  }
`

const FooterButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(0.9rem, 2vw, 1.25rem);

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    justify-content: flex-end;
  }
`

export default PracticeFieldSection
