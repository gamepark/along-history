import { GridLocator } from '@gamepark/react-game'

class ResultTokenStockLocator extends GridLocator {
  coordinates = { x: 10, y: -17, z: 0.8 }
  itemsPerLine = 3
  itemsGap = { x: 2 }
  linesGap = { y: 2 }
}

export const resultTokenStockLocator = new ResultTokenStockLocator()