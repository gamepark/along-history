import { ItemContext, LineLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem, XYCoordinates } from '../../../../workshop/packages/rules-api'
import { achievementTokenDescription } from '../material/AchievementTokenDescription'
import { cardDescription } from '../material/CardDescription'
import { civilisationAreaDescription } from './CivilisationAreaDescription'
import { getPlayerLocation, Orientation } from './PlayerLocator'

class PlayerAchievementsLocator extends LineLocator {
  hidden = true

  getCoordinates(item: MaterialItem, context: ItemContext): Coordinates {
    const { x, y } = this.getXYCoordinates(item, context)
    return { x: x, y: y, z: 0.5 }
  }

  getXYCoordinates(item: MaterialItem, context: ItemContext): XYCoordinates {
    const l = getPlayerLocation(item.location.player!, context)
    const deltaX = achievementTokenDescription.width / 2 + 1
    const deltaY = (civilisationAreaDescription.height - cardDescription.height) / 2
    switch (l.orientation) {
      case Orientation.LEFT_RIGHT:
        return {
          x: l.civilisationArea.x + deltaX,
          y: l.civilisationArea.y + deltaY
        }
      case Orientation.TOP_BOTTOM:
        return {
          x: l.civilisationArea.x - deltaY,
          y: l.civilisationArea.y + deltaX
        }
      case Orientation.RIGHT_LEFT:
        return {
          x: l.civilisationArea.x - deltaX,
          y: l.civilisationArea.y - deltaY
        }
      case Orientation.BOTTOM_TOP:
        return {
          x: l.civilisationArea.x + deltaY,
          y: l.civilisationArea.y - deltaX
        }
    }
  }

  getDelta(item: MaterialItem, context: ItemContext) {
    const l = getPlayerLocation(item.location.player!, context)
    switch (l.orientation) {
      case Orientation.LEFT_RIGHT:
        return { x: 3, z: 0.05 }
      case Orientation.TOP_BOTTOM:
        return { y: 3, z: 0.05 }
      case Orientation.RIGHT_LEFT:
        return { x: -3, z: 0.05 }
      case Orientation.BOTTOM_TOP:
        return { y: -3, z: 0.05 }
    }
  }

  getRotateZ(item: MaterialItem, context: ItemContext) {
    const l = getPlayerLocation(item.location.player!, context)
    return l.orientation * 90
  }
}

export const playerAchievementsLocator = new PlayerAchievementsLocator()