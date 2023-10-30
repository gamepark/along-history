import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'

class AchievementsBoardLocator extends ItemLocator {
  parentItemType = MaterialType.Board

  getPositionOnParent(location: Location) {
    const x = location.x!
    return { x: x === 0 ? 6.1 : 7.2 + 12.52 * x, y: 50 + 13.5 * location.y! }
  }

  getPosition(item: MaterialItem, { type }: ItemContext): Coordinates {
    if (type !== MaterialType.CivilisationToken) return { x: 0, y: 0, z: 0.1 }
    const tokenDeltaY = -0.5
    switch (item.location.z) {
      case 1:
        return { x: -1, y: tokenDeltaY - 1, z: 0.1 }
      case 2:
        return { x: 1, y: tokenDeltaY - 1, z: 0.1 }
      case 3:
        return { x: -1, y: tokenDeltaY + 1, z: 0.3 }
      case 4:
        return { x: 1, y: tokenDeltaY + 1, z: 0.3 }
      default:
        return { x: 0, y: tokenDeltaY, z: 0.2 }
    }
  }
}

export const achievementsBoardLocator = new AchievementsBoardLocator()
