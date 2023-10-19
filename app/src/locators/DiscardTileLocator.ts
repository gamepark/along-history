import { GridLocator } from '@gamepark/react-game'

class DiscardTileLocator extends GridLocator {
  coordinates = { x: -11, y: -17, z: 0.8 }
  itemsPerLine = 2
  itemsGap = { x: 3 }
  linesGap = { y: 3 }

  getRotations() {
    return ['rotate3d(1, -1, 0, 15deg)']
  }
}

export const discardTileLocator = new DiscardTileLocator()