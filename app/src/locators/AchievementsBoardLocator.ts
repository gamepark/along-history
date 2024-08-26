import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { DropAreaDescription, Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { achievementTokenDescription } from '../material/AchievementTokenDescription'
import { boardDescription } from '../material/BoardDescription'
import { AchievementBoardLocationHelp } from './help/AchievementBoardLocationHelp'

class AchievementsBoardLocator extends Locator {
  parentItemType = MaterialType.Board
  locationDescription = new AchievementBoardLocationDescription()

  getParentItem = (_: Location, context: MaterialContext) => boardDescription.getStaticItems(context)[0]

  getPositionOnParent = ({ x = 0, y = 0 }: Location) => ({ x: x === 0 ? 7.55 : x === 7 ? 93.9 : 8.5 + 12.25 * x, y: 50 + 12.4 * y })

  getCoordinates(location: Location) {
    switch (location.z) {
      case 0:
        return { x: 0, y: -0.5, z: 0.2 }
      case 1:
        return { x: -1, y: -1.5, z: 0.1 }
      case 2:
        return { x: 1, y: -1.5, z: 0.1 }
      case 3:
        return { x: -1, y: 0.5, z: 0.3 }
      case 4:
        return { x: 1, y: 0.5, z: 0.3 }
      default:
        return {}
    }
  }
}

class AchievementBoardLocationDescription extends DropAreaDescription {
  borderRadius = 5

  help = AchievementBoardLocationHelp

  getLocationSize(location: Location) {
    const size = location.x === 0 ? 3.5 : achievementTokenDescription.width
    return { width: size, height: size }
  }
}

export const achievementsBoardLocator = new AchievementsBoardLocator()
