/** @jsxImportSource @emotion/react */
import { pointerWithin } from '@dnd-kit/core'
import { GameTable } from '@gamepark/react-game'
import { PlayerPanels } from './panels/PlayerPanels'

export default function GameDisplay() {
  return <>
    <GameTable xMin={-52} xMax={52} yMin={-33} yMax={33} collisionAlgorithm={pointerWithin}
               margin={{ top: 7, left: 0, right: 30, bottom: 0 }}/>
    <PlayerPanels/>
  </>
}
