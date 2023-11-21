import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { ItemContext, ItemLocator, LocationDescription } from '@gamepark/react-game'
import { isMoveItem, Location, MaterialMove } from '@gamepark/rules-api'
import { cardDescription } from '../material/CardDescription'

class OnCardLocator extends ItemLocator {
  parentItemType = MaterialType.Card
  positionOnParent = { x: 50, y: 50 }
  locationDescription = new OnCardLocationDescription()
}

class OnCardLocationDescription extends LocationDescription {
  width = cardDescription.width
  height = cardDescription.height
  borderRadius = cardDescription.borderRadius
  alwaysVisible = false

  couldDrop(move: MaterialMove, location: Location, context: ItemContext) {
    if (isMoveItem(move) && move.itemType === MaterialType.Card
      && move.location.type === LocationType.CivilisationArea && move.location.x !== undefined && move.location.player === context.player) {
      const card = context.rules.material(MaterialType.Card).getItem(location.parent!)!
      return card.location.x === move.location.x
    }
    return false
  }

  canLongClick() {
    return false
  }
}

export const onCardLocator = new OnCardLocator()
