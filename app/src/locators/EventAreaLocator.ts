import { PlayerColor } from '@gamepark/along-history/PlayerColor'
import { getRelativePlayerIndex, ItemContext, LineLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { boardDescription } from '../material/BoardDescription'
import { cardDescription } from '../material/CardDescription'
import { discardTileDescription } from '../material/DiscardTileDescription'
import { civilisationAreaDescription } from './CivilisationAreaDescription'
import { playerLocator } from './PlayerLocator'

class EventAreaLocator extends LineLocator {
  transformItemLocation(item: MaterialItem, context: ItemContext) {
    return playerLocator.transformItemInFrontOfPlayer(item, context).concat(this.transformOwnItemLocation(item, context))
  }

  getCoordinates(item: MaterialItem, context: ItemContext): Coordinates {
    return {
      x: cardDescription.width / 2 + this.getEventAreaDeltaX(context, item.location.player!) + (item.selected ? -0.2 : 0),
      y: -cardDescription.height / 2 - 1 + (item.selected ? -0.5 : 0),
      z: item.selected ? 20 : 0
    }
  }

  delta = { x: cardDescription.width + 1, z: 0.05 }

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
