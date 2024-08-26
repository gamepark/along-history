import { DropAreaDescription, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { resultTokenStockLocator } from './ResultTokenStockLocator'

class UniversalResourceStockLocator extends ListLocator {
  locationDescription = new DropAreaDescription({ width: 6, height: 6, borderRadius: 3 })

  getCoordinates(location: Location, context: MaterialContext) {
    const { x, y } = resultTokenStockLocator.getCoordinates(location, context)
    return { x: x + 9, y: y + 1 }
  }

  gap = { x: -0.1, y: -0.1 }

  rotateZ = 45
}

export const universalResourceStockLocator = new UniversalResourceStockLocator()