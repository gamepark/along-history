import { LocationType } from '@gamepark/along-history/material/LocationType'
import { DeckLocator, LocationDescription } from '@gamepark/react-game'
import { boardDescription } from '../material/BoardDescription'
import { cardDescription } from '../material/CardDescription'

class DiscardLocator extends DeckLocator {
  hidden = false
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
    x: -boardDescription.width / 2 + cardDescription.width * 3 / 2 + 1,
    y: -boardDescription.height / 2 - 5,
    z: 10
  }
}

export const discardLocator = new DiscardLocator()
