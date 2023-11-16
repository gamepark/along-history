import { DeckLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem, XYCoordinates } from '../../../../workshop/packages/rules-api'
import { boardDescription } from '../material/BoardDescription'
import { cardDescription } from '../material/CardDescription'
import { boardTableLocator } from './BoardTableLocator'

class AlongHistoryDeckLocator extends DeckLocator {
  getCoordinates(_item: MaterialItem, { rules: { players } }: ItemContext) {
    return { ...getDeckCoordinates(players.length), z: 0 }
  }

  delta = { x: -cardDescription.thickness, y: -cardDescription.thickness, z: cardDescription.thickness }
}

export const deckLocator = new AlongHistoryDeckLocator()

export function getDeckCoordinates(players: number): XYCoordinates {
  switch (players) {
    case 3:
      return {
        x: cardDescription.width / 2,
        y: -cardDescription.height / 2 - 1
      }
    default:
      return {
        x: boardTableLocator.position.x + boardDescription.width / 2 + cardDescription.width / 2 + 1,
        y: cardDescription.height / 2
      }
  }
}
