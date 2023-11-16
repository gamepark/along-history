import { LocationType } from '@gamepark/along-history/material/LocationType'
import { DeckLocator, ItemContext, LocationContext, LocationDescription } from '@gamepark/react-game'
import { Location, MaterialItem } from '../../../../workshop/packages/rules-api'
import { cardDescription } from '../material/CardDescription'
import { getDeckCoordinates } from './DeckLocator'

class DiscardLocator extends DeckLocator {
  locationDescription = new DiscardLocationDescription()

  getCoordinates(_item: MaterialItem, context: ItemContext) {
    return { ...this.locationDescription.getCoordinates(_item.location, context), z: 0 }
  }

  delta = { x: -cardDescription.thickness, y: -cardDescription.thickness, z: cardDescription.thickness }
}

class DiscardLocationDescription extends LocationDescription {
  location = { type: LocationType.Discard }
  width = cardDescription.width
  height = cardDescription.height
  borderRadius = cardDescription.borderRadius

  getCoordinates(_location: Location, { rules: { players } }: LocationContext) {
    const deckCoordinates = getDeckCoordinates(players.length)
    return { x: deckCoordinates.x + cardDescription.width + 1, y: deckCoordinates.y, z: 10 }
  }
}

export const discardLocator = new DiscardLocator()
