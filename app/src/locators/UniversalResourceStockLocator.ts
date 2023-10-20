import { LineLocator } from '@gamepark/react-game'

class UniversalResourceStockLocator extends LineLocator {
  coordinates = { x: 0, y: -17, z: 0.8 }
  delta = { x: -0.1, y: -0.1, z: 0.1 }
}

export const universalResourceStockLocator = new UniversalResourceStockLocator()