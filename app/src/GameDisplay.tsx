/** @jsxImportSource @emotion/react */
import { pointerWithin } from '@dnd-kit/core'
import { GameTable } from '@gamepark/react-game'
import { civilisationAreaHeight, civilisationAreaWidth, eventAreaWidth2Players } from './locators/PlayerLocator'
import { boardDescription } from './material/BoardDescription'
import { cardDescription } from './material/CardDescription'
import { PlayerPanels } from './panels/PlayerPanels'

export default function GameDisplay({ players }: { players: number }) {
  return <>
    <GameTable {...getBounds(players)}
               collisionAlgorithm={pointerWithin}
               margin={{ top: 7, left: 0, right: players > 2 ? 30 : 0, bottom: 0 }}/>
    <PlayerPanels/>
  </>
}

function getBounds(players: number) {
  switch (players) {
    case 2:
      return {
        xMin: -eventAreaWidth2Players - 2,
        xMax: boardDescription.width + cardDescription.width * 2 + 3,
        yMin: -civilisationAreaHeight - 2,
        yMax: boardDescription.height + civilisationAreaHeight + 2
      }
    case 3:
      return {
        xMin: -cardDescription.height - civilisationAreaHeight - 3,
        xMax: boardDescription.width + cardDescription.height + civilisationAreaHeight + 3,
        yMin: -cardDescription.height - 2,
        yMax: boardDescription.height + cardDescription.height + civilisationAreaHeight + 3
      }
    default:
      return {
        xMin: -cardDescription.height - civilisationAreaHeight - 3,
        xMax: civilisationAreaWidth * 2 - cardDescription.height - civilisationAreaHeight,
        yMin: -cardDescription.height - civilisationAreaHeight - 3,
        yMax: boardDescription.height + cardDescription.height + civilisationAreaHeight + 3
      }
  }
}
