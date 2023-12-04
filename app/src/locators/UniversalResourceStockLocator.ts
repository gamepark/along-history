import { LocationType } from '@gamepark/along-history/material/LocationType'
import { ItemContext, LineLocator, LocationContext, LocationDescription } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { cardDescription } from '../material/CardDescription'

class UniversalResourceStockLocator extends LineLocator {
  locationDescription = new UniversalResourceStockDescription()

  getCoordinates(_item: MaterialItem, context: ItemContext) {
    return { ...this.locationDescription.getCoordinates(_item.location, context), z: 0 }
  }

  delta = { x: -0.1, y: -0.5, z: 0.1 }
}

class UniversalResourceStockDescription extends LocationDescription {
  width = 6
  height = 6
  borderRadius = this.width / 2

  getCoordinates(_location: Location, { rules: { players } }: LocationContext) {
    if (players.length === 3) {
      return {
        x: cardDescription.width * 3 + 8,
        y: -cardDescription.height / 2 - 1,
        z: 5
      }
    } else {
      return {
        x: 54,
        y: 11.7,
        z: 5
      }
    }
  }

  location = { type: LocationType.UniversalResourceStock }
}

export const universalResourceStockLocator = new UniversalResourceStockLocator()