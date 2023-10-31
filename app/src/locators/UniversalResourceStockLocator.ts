import { LocationType } from '@gamepark/along-history/material/LocationType'
import { LineLocator, LocationDescription } from '@gamepark/react-game'

class UniversalResourceStockLocator extends LineLocator {
  coordinates = { x: 0, y: -17, z: 0.8 }
  delta = { x: -0.1, y: -0.1, z: 0.1 }
  rotateZ = 45
  locationDescription = new UniversalResourceStockDescription()
}

class UniversalResourceStockDescription extends LocationDescription {
  width = 8
  height = 8
  borderRadius = this.width / 2
  coordinates = { x: 0, y: -17, z: 0.8 }
  location = { type: LocationType.UniversalResourceStock }
}

export const universalResourceStockLocator = new UniversalResourceStockLocator()