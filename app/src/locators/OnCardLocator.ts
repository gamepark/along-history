import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { DropAreaDescription, Locator, MaterialContext } from '@gamepark/react-game'
import { isMoveItem, Location, MaterialMove } from '@gamepark/rules-api'
import { cardDescription } from '../material/CardDescription'

class OnCardLocator extends Locator {
  parentItemType = MaterialType.Card
  locationDescription = new OnCardLocationDescription()
}

class OnCardLocationDescription extends DropAreaDescription {
  constructor() {
    super(cardDescription)
  }

  isMoveToLocation(move: MaterialMove, location: Location, context: MaterialContext) {
    if (isMoveItem(move) && move.itemType === MaterialType.Card
      && move.location.type === LocationType.CivilisationArea && move.location.x !== undefined && move.location.player === context.player) {
      const card = context.rules.material(MaterialType.Card).getItem(location.parent!)!
      return card.location.x === move.location.x
    }
    return false
  }
}

export const onCardLocator = new OnCardLocator()
