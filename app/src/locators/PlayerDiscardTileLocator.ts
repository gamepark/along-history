import { ItemContext, Locator } from '@gamepark/react-game'
import { Coordinates, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { cardDescription } from '../material/CardDescription'
import { discardTileDescription } from '../material/DiscardTileDescription'
import { getPlayerLocation, getPlayerRotation, Orientation } from './PlayerLocator'

class PlayerDiscardTileLocator extends Locator {
  getPosition(item: MaterialItem, context: ItemContext): Coordinates {
    const { x, y } = this.getXYCoordinates(item, context)
    return { x, y, z: 0 }
  }

  getXYCoordinates(item: MaterialItem, context: ItemContext): XYCoordinates {
    const l = getPlayerLocation(item.location.player!, context)
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

  getRotateZ(item: MaterialItem, context: ItemContext) {
    return getPlayerRotation(item, context) + (item.location.rotation ? 45 : 0)
  }
}

export const playerDiscardTileLocator = new PlayerDiscardTileLocator()