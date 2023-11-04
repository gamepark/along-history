import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { GridLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { diceDescription } from '../material/DiceDescription'
import { getDicePerspective } from './getPlayerRotation'

class DiscardTileLocator extends GridLocator {
  parentItemType = MaterialType.DiscardTile
  itemsPerLine = 2
  itemsGap = { x: 2.5 }
  linesGap = { y: 2.5 }
  positionOnParent = { x: 50, y: 50 }
  coordinates = { x: -1.25, y: -2.5, z: diceDescription.width }

  getRotations(item: MaterialItem, context: ItemContext) {
    return [getDicePerspective(context), ...super.getRotations(item, context)]
  }
}

export const discardTileLocator = new DiscardTileLocator()