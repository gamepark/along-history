import { ItemContext, LineLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { boardDescription } from '../material/BoardDescription'
import { cardDescription } from '../material/CardDescription'

class PlayerUniversalResourceLocator extends LineLocator {
  delta = { y: 3 }

  getCoordinates(item: MaterialItem, context: ItemContext): Coordinates {
    const playerIndex = this.getRelativePlayerIndex(context, item.location.player!)
    switch (playerIndex) {
      case 0:
        return {
          x: -boardDescription.width / 2 + cardDescription.width * 3 + 5,
          y: boardDescription.height / 2 + cardDescription.height - 1,
          z: 0
        }
      default:
        return {
          x: boardDescription.width / 2 + cardDescription.height + 3,
          y: boardDescription.height / 2 - 1.5,
          z: 0
        }
    }
  }

  getDelta(item: MaterialItem, context: ItemContext): Partial<Coordinates> {
    const playerIndex = this.getRelativePlayerIndex(context, item.location.player!)
    switch (playerIndex) {
      case 0:
        return { x: 3 }
      default:
        return { y: -3 }
    }
  }

  getRotateZ(item: MaterialItem, context: ItemContext): number {
    const playerIndex = this.getRelativePlayerIndex(context, item.location.player!)
    return playerIndex === 0 ? 45 : -45
  }
}

export const playerUniversalResourceLocator = new PlayerUniversalResourceLocator()