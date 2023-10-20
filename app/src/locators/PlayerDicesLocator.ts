import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '../../../../workshop/packages/rules-api'
import { boardDescription } from '../material/BoardDescription'
import { diceDescription } from '../material/DiceDescription'
import { discardTileDescription } from '../material/DiscardTileDescription'

class PlayerDicesLocator extends ItemLocator {
  getPosition(item: MaterialItem, context: ItemContext): Coordinates {
    const playerIndex = this.getRelativePlayerIndex(context, item.location.player!)
    const itemIndex = this.getItemIndex(item, context)
    switch (playerIndex) {
      case 0:
        return {
          x: itemIndex * 2.2 + 2,
          y: boardDescription.height / 2 + diceDescription.width / 2 + 1,
          z: diceDescription.width / 2
        }
      default:
        return {
          x: boardDescription.width / 2 + discardTileDescription.height / 2 + 1,
          y: -20,
          z: diceDescription.width / 2
        }
    }
  }

  getRotations(item: MaterialItem): string[] {
    return ['rotate3d(1, -1, 0, 15deg)', diceDescription.getRotationForSide((item.location.rotation ?? 1) - 1)]
  }
}

export const playerDicesLocator = new PlayerDicesLocator()