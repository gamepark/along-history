import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { boardDescription } from '../material/BoardDescription'
import { diceDescription } from '../material/DiceDescription'
import { discardTileDescription } from '../material/DiscardTileDescription'

class PlayerDicesLocator extends ItemLocator {
  getPosition(item: MaterialItem, context: ItemContext) {
    const playerIndex = this.getRelativePlayerIndex(context, item.location.player!)
    const itemIndex = this.getItemIndex(item, context)
    switch (playerIndex) {
      case 0:
        return {
          x: itemIndex * 2.2 + 2 - (item.selected ? 0.2 : 0),
          y: boardDescription.height / 2 + diceDescription.width / 2 + 1 - (item.selected ? 0.5 : 0),
          z: diceDescription.width / 2 + (item.selected ? diceDescription.width : 0)
        }
      default:
        return {
          x: boardDescription.width / 2 + discardTileDescription.height / 2 + 1,
          y: -20,
          z: diceDescription.width / 2
        }
    }
  }

  getRotations(item: MaterialItem, context: ItemContext) {
    return ['rotate3d(1, -1, 0, 15deg)', ...super.getRotations(item, context)]
  }
}

export const playerDicesLocator = new PlayerDicesLocator()