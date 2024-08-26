import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { boardDescription } from '../material/BoardDescription'
import { cardDescription } from '../material/CardDescription'

class AlongHistoryDeckLocator extends DeckLocator {
  coordinates = { x: boardDescription.width + cardDescription.width / 2 + 1, y: cardDescription.height / 2 }

  getCoordinates(_: Location, { rules }: MaterialContext) {
    return rules.players.length === 3 ? { x: cardDescription.width / 2, y: -cardDescription.height / 2 - 1 } : this.coordinates
  }
}

export const deckLocator = new AlongHistoryDeckLocator()
