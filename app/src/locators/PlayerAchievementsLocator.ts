import { ItemContext, LineLocator } from '@gamepark/react-game'
import { MaterialItem } from '../../../../workshop/packages/rules-api'
import { achievementTokenDescription } from '../material/AchievementTokenDescription'
import { cardDescription } from '../material/CardDescription'
import { civilisationAreaDescription } from './CivilisationAreaDescription'
import { playerLocator } from './PlayerLocator'

class PlayerAchievementsLocator extends LineLocator {
  transformItemLocation(item: MaterialItem, context: ItemContext) {
    return playerLocator.transformItemInFrontOfPlayer(item, context).concat(this.transformOwnItemLocation(item, context))
  }

  coordinates = {
    x: achievementTokenDescription.width / 2 + 1,
    y: (civilisationAreaDescription.height - cardDescription.height) / 2,
    z: 0.5
  }

  delta = { x: 3 }
}

export const playerAchievementsLocator = new PlayerAchievementsLocator()