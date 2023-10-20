import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { GridLocator } from '@gamepark/react-game'
import { diceDescription } from '../material/DiceDescription'

class DiscardTileLocator extends GridLocator {
  parentItemType = MaterialType.DiscardTile
  itemsPerLine = 2
  itemsGap = { x: 2.5 }
  linesGap = { y: 2.5 }
  positionOnParent = { x: 30, y: 20 }
  coordinates = {x: 0, y: 0, z: diceDescription.width}

  getRotations() {
    return ['rotate3d(1, -1, 0, 15deg)']
  }
}

export const discardTileLocator = new DiscardTileLocator()