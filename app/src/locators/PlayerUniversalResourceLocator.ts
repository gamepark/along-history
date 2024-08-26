import { ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { cardDescription } from '../material/CardDescription'
import { playerAchievementsLocator } from './PlayerAchievementsLocator'
import { getPlayerLocation, getPlayerRotateZ, Orientation } from './PlayerLocator'

class PlayerUniversalResourceLocator extends ListLocator {
  getCoordinates(location: Location, context: ItemContext) {
    const l = getPlayerLocation(context, location.player)
    return playerAchievementsLocator.getCoordinates(location, context, l.civilisationArea.width - cardDescription.width - 3)
  }

  getGap(location: Location, context: MaterialContext) {
    const l = getPlayerLocation(context, location.player)
    switch (l.orientation) {
      case Orientation.LEFT_RIGHT:
        return { x: -2 }
      case Orientation.TOP_BOTTOM:
        return { y: -2 }
      case Orientation.RIGHT_LEFT:
        return { x: 2 }
      case Orientation.BOTTOM_TOP:
        return { y: 2 }
    }
  }

  getRotateZ = (location: Location, context: ItemContext) => getPlayerRotateZ(context, location.player) + 45
}

export const playerUniversalResourceLocator = new PlayerUniversalResourceLocator()