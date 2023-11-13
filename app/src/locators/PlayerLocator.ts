import { getRelativePlayerIndex, ItemContext, ItemLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { boardDescription } from '../material/BoardDescription'
import { cardDescription } from '../material/CardDescription'
import { civilisationAreaDescription } from './CivilisationAreaDescription'

class PlayerLocator {
  transformItemInFrontOfPlayer(item: MaterialItem, context: ItemContext) {
    const playerIndex = getRelativePlayerIndex(context, item.location.player)
    switch (playerIndex) {
      case 0:
        return new BottomPlayerLocator().transformItemLocation(item, context)
      case 1:
        return new LeftPlayerLocator().transformItemLocation(item, context)
      case 2:
        return new TopLeftPlayerLocator().transformItemLocation(item, context)
      case 3:
        return new TopRightPlayerLocator().transformItemLocation(item, context)
      default:
        return new RightPlayerLocator().transformItemLocation(item, context)
    }
  }
}

export const playerLocator = new PlayerLocator()

class BottomPlayerLocator extends ItemLocator {
  position = {
    x: -civilisationAreaDescription.width + cardDescription.height + civilisationAreaDescription.height + 1.5,
    y: boardDescription.height / 2 + cardDescription.height + 2,
    z: 0
  }

  getRotations() {
    return []
  }
}

class LeftPlayerLocator extends ItemLocator {
  position = {
    x: -civilisationAreaDescription.width + civilisationAreaDescription.height - 0.5,
    y: -boardDescription.height / 2 - cardDescription.height - 1,
    z: 0
  }

  getRotations() {
    return [`rotateZ(${90}${this.rotationUnit})`]
  }
}

class TopLeftPlayerLocator extends ItemLocator {
  position = {
    x: -0.5,
    y: -boardDescription.height / 2 - cardDescription.height - 2,
    z: 0
  }

  getRotations() {
    return [`rotateZ(${180}${this.rotationUnit})`]
  }
}

class TopRightPlayerLocator extends ItemLocator {
  position = {
    x: civilisationAreaDescription.width + 0.5,
    y: -boardDescription.height / 2 - cardDescription.height - 2,
    z: 0
  }

  getRotations() {
    return [`rotateZ(${180}${this.rotationUnit})`]
  }
}

class RightPlayerLocator extends ItemLocator {
  position = {
    x: civilisationAreaDescription.width - civilisationAreaDescription.height + 0.5,
    y: civilisationAreaDescription.width - boardDescription.height / 2 - cardDescription.height - 1,
    z: 0
  }

  getRotations() {
    return [`rotateZ(${-90}${this.rotationUnit})`]
  }
}
