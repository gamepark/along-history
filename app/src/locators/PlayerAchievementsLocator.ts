import { ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { achievementTokenDescription } from '../material/AchievementTokenDescription'
import { cardDescription } from '../material/CardDescription'
import { civilisationAreaHeight, getPlayerLocation, getPlayerRotateZ, Orientation } from './PlayerLocator'

class PlayerAchievementsLocator extends ListLocator {
  getCoordinates(location: Location, context: MaterialContext, deltaX = achievementTokenDescription.width / 2 + 1) {
    const l = getPlayerLocation(context, location.player)
    const deltaY = civilisationAreaHeight / 2 - cardDescription.height / 2
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

  getGap(location: Location, context: MaterialContext) {
    const l = getPlayerLocation(context, location.player)
    switch (l.orientation) {
      case Orientation.LEFT_RIGHT:
        return { x: 3 }
      case Orientation.TOP_BOTTOM:
        return { y: 3 }
      case Orientation.RIGHT_LEFT:
        return { x: -3 }
      case Orientation.BOTTOM_TOP:
        return { y: -3 }
    }
  }

  getMaxGap(location: Location, context: MaterialContext) {
    const l = getPlayerLocation(context, location.player)
    switch (l.orientation) {
      case Orientation.LEFT_RIGHT:
        return { x: 18 }
      case Orientation.TOP_BOTTOM:
        return { y: 18 }
      case Orientation.RIGHT_LEFT:
        return { x: -18 }
      case Orientation.BOTTOM_TOP:
        return { y: -18 }
    }
  }

  getRotateZ(location: Location, context: ItemContext) {
    return getPlayerRotateZ(context, location.player)
  }
}

export const playerAchievementsLocator = new PlayerAchievementsLocator()