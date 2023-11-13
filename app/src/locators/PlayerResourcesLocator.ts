import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { cardDescription } from '../material/CardDescription'
import { diceDescription } from '../material/DiceDescription'
import { civilisationAreaDescription } from './CivilisationAreaDescription'
import { getDicePerspective } from './getPlayerRotation'
import { playerLocator } from './PlayerLocator'

class PlayerResourcesLocator extends ItemLocator {
  transformItemLocation(item: MaterialItem, context: ItemContext) {
    return playerLocator.transformItemInFrontOfPlayer(item, context).concat(this.transformOwnItemLocation(item, context))
  }

  getPosition(item: MaterialItem, context: ItemContext) {
    const itemIndex = this.getItemIndex(item, context)
    return {
      x: civilisationAreaDescription.width - 27.5 + itemIndex * 2.2 - (item.selected ? 0.2 : 0),
      y: (civilisationAreaDescription.height - cardDescription.height) / 2 - (item.selected ? 0.5 : 0),
      z: diceDescription.width / 2 + (item.selected ? diceDescription.width : 0)
    }
  }

  getRotations(item: MaterialItem, context: ItemContext) {
    if (context.type === MaterialType.Dice) {
      return [getDicePerspective(context), ...super.getRotations(item, context)]
    } else {
      return super.getRotations(item, context)
    }
  }
}

export const playerResourcesLocator = new PlayerResourcesLocator()