import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { ItemLocator } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '../../../../workshop/packages/rules-api'

class AchievementsBoardLocator extends ItemLocator {
  parentItemType = MaterialType.Board

  getPositionOnParent(location: Location) {
    const x = location.x!
    return { x: x === 0 ? 6.1 : 7.2 + 12.52 * x, y: 50 + 13.5 * location.y! - 2 }
  }

  getPosition(item: MaterialItem): Coordinates {
    switch (item.location.z) {
      case 1:
        return { x: -1, y: -1, z: 0.1 }
      case 2:
        return { x: 1, y: -1, z: 0.1 }
      case 3:
        return { x: -1, y: 1, z: 0.3 }
      case 4:
        return { x: 1, y: 1, z: 0.3 }
      default:
        return { x: 0, y: 0, z: 0.2 }
    }
  }
}

export const achievementsBoardLocator = new AchievementsBoardLocator()
