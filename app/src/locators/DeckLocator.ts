import { DeckLocator } from '@gamepark/react-game'
import { boardDescription } from '../material/BoardDescription'
import { cardDescription } from '../material/CardDescription'
import { boardTableLocator } from './BoardTableLocator'

class AlongHistoryDeckLocator extends DeckLocator {
  hidden = true
  coordinates = {
    x: boardTableLocator.position.x + boardDescription.width / 2 + cardDescription.width / 2 + 1,
    y: cardDescription.height / 2,
    z: 0
  }
  delta = { x: -cardDescription.thickness, y: -cardDescription.thickness, z: cardDescription.thickness }
}

export const deckLocator = new AlongHistoryDeckLocator()
