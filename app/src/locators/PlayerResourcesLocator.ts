import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { getRelativePlayerIndex, ItemContext, ItemLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { boardDescription } from '../material/BoardDescription'
import { cardDescription } from '../material/CardDescription'
import { diceDescription } from '../material/DiceDescription'
import { getDicePerspective, getPlayerRotation } from './getPlayerRotation'

class PlayerResourcesLocator extends ItemLocator {
  getPosition(item: MaterialItem, context: ItemContext) {
    const playerIndex = getRelativePlayerIndex(context, item.location.player)
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
          x: boardDescription.width / 2 + cardDescription.height + 3,
          y: boardDescription.height / 2 - 5 - itemIndex * 2,
          z: diceDescription.width / 2
        }
    }
  }

  getRotations(item: MaterialItem, context: ItemContext) {
    if (context.type === MaterialType.Dice) {
      return [getDicePerspective(context), ...super.getRotations(item, context)]
    } else {
      return super.getRotations(item, context)
    }
  }

  getRotateZ(item: MaterialItem, context: ItemContext): number {
    return getPlayerRotation(context, item.location.player)
  }
}

export const playerResourcesLocator = new PlayerResourcesLocator()