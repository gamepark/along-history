import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '../../../../workshop/packages/rules-api'
import { boardDescription } from '../material/BoardDescription'
import { discardTileDescription } from '../material/DiscardTileDescription'

class PlayerDiscardTileLocator extends ItemLocator {
  getPosition(item: MaterialItem, context: ItemContext): Coordinates {
    const playerIndex = this.getRelativePlayerIndex(context, item.location.player!)
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

  getRotateZ(item: MaterialItem<number, number>, context: ItemContext<number, number, number>): number {
    const playerIndex = this.getRelativePlayerIndex(context, item.location.player!)
    return playerIndex === 0 ? 0 : -90
  }
}

export const playerDiscardTileLocator = new PlayerDiscardTileLocator()