import { DeckLocator, DropAreaDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { cardDescription } from '../material/CardDescription'
import { deckLocator } from './DeckLocator'
import { DiscardHelp } from './help/DiscardHelp'

class DiscardLocator extends DeckLocator {
  locationDescription = new DiscardLocationDescription()

  getCoordinates(location: Location, context: MaterialContext) {
    const { x, y } = deckLocator.getCoordinates(location, context)
    return { x: x + cardDescription.width + 1, y }
  }
}

class DiscardLocationDescription extends DropAreaDescription {
  constructor() {
    super(cardDescription)
  }

  help = DiscardHelp
}

export const discardLocator = new DiscardLocator()
