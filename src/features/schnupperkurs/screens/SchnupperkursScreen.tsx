// src/features/schnupperkurs/screens/SchnupperkursScreen.tsx
'use client'

import styled from 'styled-components'
import BreathingExercise from '@/components/schnupperkurs/BreathingExercise'
import Typography from '@/design/typography'

const SchnupperkursScreen = () => (
  <Screen aria-labelledby="schnupperkurs-title">
    <Content>
      <Intro>
        <Typography
          as="h1"
          variant="h1"
          id="schnupperkurs-title"
          cadence="dense"
          measure="title"
          gutter={false}
          tone="strong"
        >
          Schnupperkurs
        </Typography>

        <Typography
          as="p"
          variant="body"
          gutter={false}
          tone="soft"
          cadence="open"
          measure="prose"
        >
          Komm an. Starte den Rhythmus. Folge der Bewegung.
        </Typography>
      </Intro>

      <BreathingExercise />
    </Content>
  </Screen>
)

const Screen = styled.main`
  min-height: 100svh;
  background: ${({ theme }) => theme.roles.movement.arrival.stage};
`

const Content = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  gap: ${({ theme }) => theme.spacing(3)};
  width: min(100%, ${({ theme }) => theme.layout.containers.wide});
  min-height: 100svh;
  margin-inline: auto;
  padding: clamp(4.5rem, 8vh, 7rem)
    ${({ theme }) => theme.layout.containerInset} clamp(2rem, 5vh, 4rem);
`

const Intro = styled.header`
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
  max-width: 44rem;
`

export default SchnupperkursScreen
