import { getRelativePlayerIndex, ItemContext, LineLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { boardDescription } from '../material/BoardDescription'
import { cardDescription } from '../material/CardDescription'

class PlayerAchievementsLocator extends LineLocator {
  delta = { y: 3 }

  getCoordinates(item: MaterialItem, context: ItemContext): Coordinates {
    const playerIndex = getRelativePlayerIndex(context, item.location.player)
    switch (playerIndex) {
      case 0:
        return {
          x: -boardDescription.width / 2 + cardDescription.width * 3 + 9,
          y: boardDescription.height / 2 + cardDescription.height - 1,
          z: 0
        }
      default:
        return {
          x: boardDescription.width / 2 + cardDescription.height + 3,
          y: boardDescription.height / 2 + 5,
          z: 0
        }
    }
  }

  getDelta(item: MaterialItem, context: ItemContext): Partial<Coordinates> {
    const playerIndex = getRelativePlayerIndex(context, item.location.player)
    switch (playerIndex) {
      case 0:
        return { x: 3 }
      default:
        return { y: -3 }
    }
  }
}

export const playerAchievementsLocator = new PlayerAchievementsLocator()