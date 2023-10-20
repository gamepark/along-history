import { ItemContext, LineLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '../../../../workshop/packages/rules-api'

class PlayerUniversalResourceLocator extends LineLocator {
  delta = { y: 3 }

  getCoordinates(item: MaterialItem<number, number>, context: ItemContext<number, number, number>): Coordinates {
    const playerIndex = this.getRelativePlayerIndex(context, item.location.player!)
    switch (playerIndex) {
      case 1:
        return { x: 30, y: 0, z: 0 }
      default:
        return { x: 0, y: 20, z: 0 }
    }
  }
}

export const playerUniversalResourceLocator = new PlayerUniversalResourceLocator()