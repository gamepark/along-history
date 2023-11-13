import { ItemContext, LineLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { cardDescription } from '../material/CardDescription'
import { civilisationAreaDescription } from './CivilisationAreaDescription'
import { playerLocator } from './PlayerLocator'

class PlayerUniversalResourceLocator extends LineLocator {
  transformItemLocation(item: MaterialItem, context: ItemContext) {
    return playerLocator.transformItemInFrontOfPlayer(item, context).concat(this.transformOwnItemLocation(item, context))
  }

  coordinates = {
    x: civilisationAreaDescription.width - cardDescription.width - 3,
    y: (civilisationAreaDescription.height - cardDescription.height) / 2,
    z: 0
  }

  delta = { x: -2 }

  rotateZ = 45
}

export const playerUniversalResourceLocator = new PlayerUniversalResourceLocator()