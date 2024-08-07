import { AchievementBoard } from '@gamepark/along-history/material/AchievementBoard'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { Memory } from '@gamepark/along-history/rules/Memory'
import { ItemContext, Locator, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem, MaterialMove, MaterialRules } from '@gamepark/rules-api'
import { shallowEqual } from 'react-redux'
import { achievementTokenDescription } from '../material/AchievementTokenDescription'
import { AchievementBoardLocationHelp } from './help/AchievementBoardLocationHelp'

class AchievementsBoardLocator extends Locator {
  parentItemType = MaterialType.Board
  locationDescription = new AchievementBoardLocationDescription()

  getParentItemId(_location: Location, { rules }: ItemContext) {
    return rules.remind(Memory.Board) ?? AchievementBoard.Front
  }

  getPositionOnParent(location: Location) {
    const x = location.x!
    return { x: x === 0 ? 7.55 : x === 7 ? 93.9 : 8.5 + 12.25 * x, y: 50 + 12.4 * location.y! }
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

class AchievementBoardLocationDescription extends LocationDescription {
  borderRadius = 5

  help = AchievementBoardLocationHelp

  getLocationSize(location: Location) {
    const size = location.x === 0 ? 3.5 : achievementTokenDescription.width
    return { width: size, height: size }
  }

  isMoveToLocation(move: MaterialMove<number, number, number>, location: Location<number, number>, context: MaterialContext<number, number, number>): boolean {
    return !locationHasAchievementToken(location, context.rules) && super.isMoveToLocation(move, location, context)
  }
}

const locationHasAchievementToken = (location: Location, rules: MaterialRules) => {
  return rules.material(MaterialType.AchievementToken).location(l => shallowEqual(location, l)).length > 0
}

export const achievementsBoardLocator = new AchievementsBoardLocator()
