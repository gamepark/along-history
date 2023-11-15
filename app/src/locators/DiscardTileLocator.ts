import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { GridLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { diceDescription } from '../material/DiceDescription'
import { getPlayerLocation, Orientation } from './PlayerLocator'

class DiscardTileLocator extends GridLocator {
  parentItemType = MaterialType.DiscardTile
  itemsPerLine = 2
  itemsGap = { x: 2.5 }
  linesGap = { y: 2.5 }
  positionOnParent = { x: 50, y: 50 }
  coordinates = { x: -1.25, y: -2.5, z: diceDescription.width }

  getRotations(item: MaterialItem, context: ItemContext) {
    return [this.getPerspective(context), ...super.getRotations(item, context)]
  }

  getPerspective(context: ItemContext) {
    const discardTileOwner = context.rules.material(MaterialType.DiscardTile).getItem()!.location.player!
    const playerLocation = getPlayerLocation(discardTileOwner, context)
    switch (playerLocation.orientation) {
      case Orientation.LEFT_RIGHT:
        return 'rotate3d(1, -1, 0, 15deg)'
      case Orientation.TOP_BOTTOM:
        return 'rotate3d(-1, -1, 0, 15deg)'
      case Orientation.RIGHT_LEFT:
        return 'rotate3d(-1, 1, 0, 15deg)'
      case Orientation.BOTTOM_TOP:
        return 'rotate3d(1, 1, 0, 15deg)'
    }
  }
}

export const discardTileLocator = new DiscardTileLocator()