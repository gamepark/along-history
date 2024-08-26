import { ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { diceDescription } from '../material/DiceDescription'
import { playerAchievementsLocator } from './PlayerAchievementsLocator'
import { getPlayerLocation, getPlayerRotateZ, Orientation } from './PlayerLocator'

class PlayerResourcesLocator extends ListLocator {
  getCoordinates(location: Location, context: MaterialContext) {
    const l = getPlayerLocation(context, location.player)
    return playerAchievementsLocator.getCoordinates(location, context, l.civilisationArea.width - 27.5)
  }

  getGap(location: Location, context: MaterialContext) {
    const l = getPlayerLocation(context, location.player)
    switch (l.orientation) {
      case Orientation.LEFT_RIGHT:
        return { x: 2.2 }
      case Orientation.TOP_BOTTOM:
        return { y: 2.2 }
      case Orientation.RIGHT_LEFT:
        return { x: -2.2 }
      case Orientation.BOTTOM_TOP:
        return { y: -2.2 }
    }
  }

  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const { x = 0, y = 0, z = 0 } = super.getItemCoordinates(item, context)
    return item.selected ? { x: x - 0.2, y: y - 0.5, z: z + diceDescription.width } : { x, y, z }
  }

  getRotateZ = (location: Location, context: ItemContext) => getPlayerRotateZ(context, location.player)
}

export const playerResourcesLocator = new PlayerResourcesLocator()