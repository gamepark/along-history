import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { ItemContext, Locator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { cardDescription } from '../material/CardDescription'
import { diceDescription } from '../material/DiceDescription'
import { civilisationAreaHeight, getPlayerLocation, getPlayerRotation, Orientation } from './PlayerLocator'

class PlayerResourcesLocator extends Locator {

  getPosition(item: MaterialItem, context: ItemContext) {
    const itemIndex = this.getItemIndex(item, context)
    const l = getPlayerLocation(item.location.player!, context)
    const z = context.type === MaterialType.Dice ? diceDescription.width / 2 + (item.selected ? diceDescription.width : 0) : 0.05
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

  getRotateZ(item: MaterialItem, context: ItemContext) {
    return getPlayerRotation(item, context)
  }
}

export const playerResourcesLocator = new PlayerResourcesLocator()