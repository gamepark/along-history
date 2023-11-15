import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { GridLocator } from '@gamepark/react-game'
import { diceDescription } from '../material/DiceDescription'

class DiscardTileLocator extends GridLocator {
  parentItemType = MaterialType.DiscardTile
  itemsPerLine = 2
  itemsGap = { x: 2.5 }
  linesGap = { y: 2.5 }
  positionOnParent = { x: 50, y: 50 }
  coordinates = { x: -1.25, y: -2.5, z: diceDescription.width }
}

export const discardTileLocator = new DiscardTileLocator()