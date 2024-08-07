import { LocationType } from '@gamepark/along-history/material/LocationType'
import { ItemContext, LineLocator, LocationContext, LocationDescription } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { resultTokenStockLocator } from './ResultTokenStockLocator'

class UniversalResourceStockLocator extends LineLocator {
  location = { type: LocationType.UniversalResourceStock }
  locationDescription = new UniversalResourceStockDescription()

  getCoordinates(_item: MaterialItem, context: ItemContext) {
    return { ...this.locationDescription.getCoordinates(_item.location, context), z: 0 }
  }

  delta = { x: -0.1, y: -0.1, z: 0.1 }
}

class UniversalResourceStockDescription extends LocationDescription {
  width = 6
  height = 6
  borderRadius = this.width / 2

  getCoordinates(_location: Location, { rules: { players } }: LocationContext) {
    const { x, y } = resultTokenStockLocator.getBaseCoordinates(players.length)
    return { x: x + 9, y: y + 1, z: 5 }
  }
}

export const universalResourceStockLocator = new UniversalResourceStockLocator()