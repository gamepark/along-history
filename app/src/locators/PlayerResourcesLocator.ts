import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { cardDescription } from '../material/CardDescription'
import { diceDescription } from '../material/DiceDescription'
import { civilisationAreaHeight, getPlayerLocation, Orientation } from './PlayerLocator'

class PlayerResourcesLocator extends ItemLocator {

  getPosition(item: MaterialItem, context: ItemContext) {
    const itemIndex = this.getItemIndex(item, context)
    const l = getPlayerLocation(item.location.player!, context)
    const z = diceDescription.width / 2 + (item.selected ? diceDescription.width : 0)
    const deltaX = l.civilisationArea.width - 27.5 + itemIndex * 2.2 - (item.selected ? 0.2 : 0)
    const deltaY = civilisationAreaHeight / 2 - cardDescription.height / 2 - (item.selected ? 0.5 : 0)
    switch (l.orientation) {
      case Orientation.LEFT_RIGHT:
        return {
          x: l.civilisationArea.x + deltaX,
          y: l.civilisationArea.y + deltaY,
          z
        }
      case Orientation.TOP_BOTTOM:
        return {
          x: l.civilisationArea.x - deltaY,
          y: l.civilisationArea.y + deltaX,
          z
        }
      case Orientation.RIGHT_LEFT:
        return {
          x: l.civilisationArea.x - deltaX,
          y: l.civilisationArea.y - deltaY,
          z
        }
      case Orientation.BOTTOM_TOP:
        return {
          x: l.civilisationArea.x + deltaY,
          y: l.civilisationArea.y - deltaX,
          z
        }
    }
  }

  getRotations(item: MaterialItem, context: ItemContext) {
    if (context.type === MaterialType.Dice) {
      return [this.getDicePerspective(item, context), ...super.getRotations(item, context)]
    } else {
      return super.getRotations(item, context)
    }
  }

  getDicePerspective(item: MaterialItem, context: ItemContext) {
    const playerLocation = getPlayerLocation(item.location.player!, context)
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

  getRotateZ(item: MaterialItem, context: ItemContext) {
    const l = getPlayerLocation(item.location.player!, context)
    return l.orientation * 90
  }
}

export const playerResourcesLocator = new PlayerResourcesLocator()