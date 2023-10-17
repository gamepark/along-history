import { DeckLocator } from '@gamepark/react-game'
import { boardDescription } from '../material/BoardDescription'
import { cardDescription } from '../material/CardDescription'

class AlongHistoryDeckLocator extends DeckLocator {
  coordinates = {
    x: -boardDescription.width / 2 + cardDescription.width / 2,
    y: -boardDescription.height / 2 - 5,
    z: 0
  }
  delta = { x: -cardDescription.thickness, y: -cardDescription.thickness, z: cardDescription.thickness }
}

export const deckLocator = new AlongHistoryDeckLocator()
