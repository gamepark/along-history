import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { discardTileDescription } from '../material/DiscardTileDescription'
import { eventAreaLocator } from './EventAreaLocator'
import { playerLocator } from './PlayerLocator'

class PlayerDiscardTileLocator extends ItemLocator {
  transformItemLocation(item: MaterialItem, context: ItemContext) {
    return playerLocator.transformItemInFrontOfPlayer(item, context).concat(this.transformOwnItemLocation(item, context))
  }

  getPosition(item: MaterialItem, context: ItemContext): Coordinates {
    return {
      x: +eventAreaLocator.getEventAreaDeltaX(context, item.location.player!)
        + eventAreaLocator.getEventAreaWidth(context, item.location.player!)
        - discardTileDescription.width / 2,
      y: -discardTileDescription.height / 2 - 1,
      z: 0
    }
  }
}

export const playerDiscardTileLocator = new PlayerDiscardTileLocator()