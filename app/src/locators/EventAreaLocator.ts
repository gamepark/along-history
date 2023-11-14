import { PlayerColor } from '@gamepark/along-history/PlayerColor'
import { getRelativePlayerIndex, ItemContext, LineLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { boardDescription } from '../material/BoardDescription'
import { cardDescription } from '../material/CardDescription'
import { discardTileDescription } from '../material/DiscardTileDescription'
import { civilisationAreaDescription } from './CivilisationAreaDescription'
import { getPlayerLocation, Orientation } from './PlayerLocator'

class EventAreaLocator extends LineLocator {
  getCoordinates(item: MaterialItem, context: ItemContext): Coordinates {
    const { x, y } = this.getXYCoordinates(item, context)
    return {
      x: x + (item.selected ? -0.2 : 0),
      y: y + (item.selected ? -0.5 : 0),
      z: item.selected ? 20 : 0
    }
  }

  getXYCoordinates(item: MaterialItem, context: ItemContext): XYCoordinates {
    const l = getPlayerLocation(item.location.player!, context)
    switch (l.orientation) {
      case Orientation.LEFT_RIGHT:
        return {
          x: l.eventArea.x + cardDescription.width / 2,
          y: l.eventArea.y + cardDescription.height / 2
        }
      case Orientation.TOP_BOTTOM:
        return {
          x: l.eventArea.x - cardDescription.height / 2,
          y: l.eventArea.y + cardDescription.width / 2
        }
      case Orientation.RIGHT_LEFT:
        return {
          x: l.eventArea.x - cardDescription.width / 2,
          y: l.eventArea.y - cardDescription.height / 2
        }
      case Orientation.BOTTOM_TOP:
        return {
          x: l.eventArea.x + cardDescription.height / 2,
          y: l.eventArea.y - cardDescription.width / 2
        }
    }
  }

  getRotateZ(item: MaterialItem, context: ItemContext) {
    const l = getPlayerLocation(item.location.player!, context)
    return l.orientation * 90
  }

  getDelta(item: MaterialItem, context: ItemContext) {
    const l = getPlayerLocation(item.location.player!, context)
    switch (l.orientation) {
      case Orientation.LEFT_RIGHT:
        return { x: cardDescription.width + 1, z: 0.05 }
      case Orientation.TOP_BOTTOM:
        return { y: cardDescription.width + 1, z: 0.05 }
      case Orientation.RIGHT_LEFT:
        return { x: -cardDescription.width - 1, z: 0.05 }
      case Orientation.BOTTOM_TOP:
        return { y: -cardDescription.width - 1, z: 0.05 }
    }
  }

  getDeltaMax(item: MaterialItem, context: ItemContext) {
    const eventAreaWidth = this.getEventAreaWidth(context, item.location.player!)
    return { x: eventAreaWidth - cardDescription.width - discardTileDescription.width - 1 }
  }

  getEventAreaWidth(context: MaterialContext, player: PlayerColor) {
    const playerIndex = getRelativePlayerIndex(context, player)
    switch (playerIndex) {
      case 0:
        return boardDescription.width
      case 1:
      case 4:
        return civilisationAreaDescription.width - cardDescription.height - 1
      default:
        return civilisationAreaDescription.width - civilisationAreaDescription.height - 1
    }
  }

  getEventAreaDeltaX(context: MaterialContext, player: PlayerColor) {
    const playerIndex = getRelativePlayerIndex(context, player)
    switch (playerIndex) {
      case 1:
        return cardDescription.height + 1
      case 3:
        return civilisationAreaDescription.height + 1
      default:
        return 0
    }
  }
}

export const eventAreaLocator = new EventAreaLocator()
