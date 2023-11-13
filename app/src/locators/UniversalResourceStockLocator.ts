import { LocationType } from '@gamepark/along-history/material/LocationType'
import { LineLocator, LocationDescription } from '@gamepark/react-game'

class UniversalResourceStockLocator extends LineLocator {
  locationDescription = new UniversalResourceStockDescription()
  coordinates = this.locationDescription.coordinates
  delta = { x: -0.1, y: -0.1, z: 0.1 }
  rotateZ = 45
}

class UniversalResourceStockDescription extends LocationDescription {
  width = 8
  height = 8
  borderRadius = this.width / 2
  coordinates = { x: 23, y: 5, z: 0.8 }
  location = { type: LocationType.UniversalResourceStock }
}

export const universalResourceStockLocator = new UniversalResourceStockLocator()