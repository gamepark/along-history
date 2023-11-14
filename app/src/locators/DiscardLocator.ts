import { LocationType } from '@gamepark/along-history/material/LocationType'
import { DeckLocator, LocationDescription } from '@gamepark/react-game'
import { cardDescription } from '../material/CardDescription'
import { deckLocator } from './DeckLocator'

class DiscardLocator extends DeckLocator {
  locationDescription = new DiscardLocationDescription()
  coordinates = { ...this.locationDescription.coordinates, z: 0 }
  delta = { x: -cardDescription.thickness, y: -cardDescription.thickness, z: cardDescription.thickness }
}

class DiscardLocationDescription extends LocationDescription {
  location = { type: LocationType.Discard }
  width = cardDescription.width
  height = cardDescription.height
  borderRadius = cardDescription.borderRadius
  coordinates = {
    x: deckLocator.coordinates.x + cardDescription.width + 1,
    y: deckLocator.coordinates.y,
    z: 10
  }
}

export const discardLocator = new DiscardLocator()
