/** @jsxImportSource @emotion/react */
import { pointerWithin } from '@dnd-kit/core'
import { css } from '@emotion/react'
import { GameTable } from '@gamepark/react-game'
import { civilisationAreaHeight, civilisationAreaWidth } from './locators/PlayerLocator'
import { boardDescription } from './material/BoardDescription'
import { cardDescription } from './material/CardDescription'
import { PlayerPanels } from './panels/PlayerPanels'

export default function GameDisplay() {
  return <>
    <GameTable xMin={-cardDescription.height - civilisationAreaHeight - 3}
               xMax={civilisationAreaWidth * 2 - cardDescription.height - civilisationAreaHeight}
               yMin={-cardDescription.height - civilisationAreaHeight - 3}
               yMax={boardDescription.height + cardDescription.height + civilisationAreaHeight + 3}
               collisionAlgorithm={pointerWithin} css={css`border: 1px solid white`}
               margin={{ top: 7, left: 0, right: 30, bottom: 0 }}/>
    <PlayerPanels/>
  </>
}
