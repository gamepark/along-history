import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { cardDescription } from '../material/CardDescription'
import { discardTileDescription } from '../material/DiscardTileDescription'
import { getPlayerLocation, getPlayerRotateZ, Orientation } from './PlayerLocator'

class PlayerDiscardTileLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext) {
    const l = getPlayerLocation(context, location.player)
    switch (l.orientation) {
      case Orientation.LEFT_RIGHT:
        return {
          x: l.eventArea.x + l.eventArea.width - discardTileDescription.width / 2,
          y: l.eventArea.y + cardDescription.height - discardTileDescription.height / 2
        }
      case Orientation.TOP_BOTTOM:
        return {
          x: l.eventArea.x - cardDescription.height + discardTileDescription.height / 2,
          y: l.eventArea.y + l.eventArea.width - discardTileDescription.width / 2
        }
      case Orientation.RIGHT_LEFT:
        return {
          x: l.eventArea.x - l.eventArea.width + discardTileDescription.width / 2,
          y: l.eventArea.y - cardDescription.height + discardTileDescription.height / 2
        }
      case Orientation.BOTTOM_TOP:
        return {
          x: l.eventArea.x + cardDescription.height - discardTileDescription.height / 2,
          y: l.eventArea.y - l.eventArea.width + discardTileDescription.width / 2
        }
    }
  }

  getRotateZ(location: Location, context: MaterialContext) {
    return getPlayerRotateZ(context, location.player) + (location.rotation ? 45 : 0)
  }
}

export const playerDiscardTileLocator = new PlayerDiscardTileLocator()