import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { ItemLocator, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { isMoveItem, Location, MaterialMove } from '@gamepark/rules-api'
import { shallowEqual } from 'react-redux'
import { achievementTokenDescription } from '../material/AchievementTokenDescription'

class AchievementTokenLocator extends ItemLocator {
  parentItemType = MaterialType.AchievementToken
  positionOnParent = { x: 50, y: 50 }
  locationDescription = new AchievementTokenLocationDescription()
}

class AchievementTokenLocationDescription extends LocationDescription {
  width = achievementTokenDescription.width
  ratio = 1
  borderRadius = achievementTokenDescription.borderRadius

  isMoveToLocation(move: MaterialMove, location: Location, context: MaterialContext): boolean {
    return isMoveItem(move) && move.itemType === MaterialType.CivilisationToken
      && shallowEqual(move.location, context.rules.material(MaterialType.AchievementToken).getItem(location.parent!)?.location)
  }
}

export const achievementTokenLocator = new AchievementTokenLocator()