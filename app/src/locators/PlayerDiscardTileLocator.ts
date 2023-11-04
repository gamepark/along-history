import { getRelativePlayerIndex, ItemContext, ItemLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { boardDescription } from '../material/BoardDescription'
import { discardTileDescription } from '../material/DiscardTileDescription'
import { getPlayerRotation } from './getPlayerRotation'

class PlayerDiscardTileLocator extends ItemLocator {
  getPosition(item: MaterialItem, context: ItemContext): Coordinates {
    const playerIndex = getRelativePlayerIndex(context, item.location.player)
    switch (playerIndex) {
      case 0:
        return {
          x: boardDescription.width / 2 - discardTileDescription.width / 2,
          y: boardDescription.height / 2 + discardTileDescription.height / 2 + 1,
          z: 0
        }
      default:
        return {
          x: boardDescription.width / 2 + discardTileDescription.height / 2 + 1,
          y: -20,
          z: 0
        }
    }
  }

  getRotateZ(item: MaterialItem, context: ItemContext): number {
    return getPlayerRotation(context, item.location.player)
  }
}

export const playerDiscardTileLocator = new PlayerDiscardTileLocator()