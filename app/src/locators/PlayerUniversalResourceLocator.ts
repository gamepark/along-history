import { ItemContext, LineLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { cardDescription } from '../material/CardDescription'
import { civilisationAreaHeight, getPlayerLocation, Orientation } from './PlayerLocator'

class PlayerUniversalResourceLocator extends LineLocator {
  getCoordinates(item: MaterialItem, context: ItemContext): Coordinates {
    const { x, y } = this.getXYCoordinates(item, context)
    return { x: x, y: y, z: 0.5 }
  }

  getXYCoordinates(item: MaterialItem, context: ItemContext): XYCoordinates {
    const l = getPlayerLocation(item.location.player!, context)
    switch (l.orientation) {
      case Orientation.LEFT_RIGHT:
        return {
          x: l.civilisationArea.x + l.civilisationArea.width - cardDescription.width - 3,
          y: l.civilisationArea.y + civilisationAreaHeight / 2 - cardDescription.height / 2
        }
      case Orientation.TOP_BOTTOM:
        return {
          x: l.civilisationArea.x - civilisationAreaHeight / 2 + cardDescription.height / 2,
          y: l.civilisationArea.y + l.civilisationArea.width - cardDescription.width - 3
        }
      case Orientation.RIGHT_LEFT:
        return {
          x: l.civilisationArea.x - l.civilisationArea.width + cardDescription.width + 3,
          y: l.civilisationArea.y - civilisationAreaHeight / 2 + cardDescription.height / 2
        }
      case Orientation.BOTTOM_TOP:
        return {
          x: l.civilisationArea.x + civilisationAreaHeight / 2 - cardDescription.height / 2,
          y: l.civilisationArea.y - l.civilisationArea.width + cardDescription.width + 3
        }
    }
  }

  getDelta(item: MaterialItem, context: ItemContext) {
    const l = getPlayerLocation(item.location.player!, context)
    switch (l.orientation) {
      case Orientation.LEFT_RIGHT:
        return { x: -2, z: 0.05 }
      case Orientation.TOP_BOTTOM:
        return { y: -2, z: 0.05 }
      case Orientation.RIGHT_LEFT:
        return { x: 2, z: 0.05 }
      case Orientation.BOTTOM_TOP:
        return { y: 2, z: 0.05 }
    }
  }

  getRotateZ(item: MaterialItem, context: ItemContext) {
    const l = getPlayerLocation(item.location.player!, context)
    return l.orientation * 90 + 45
  }
}

export const playerUniversalResourceLocator = new PlayerUniversalResourceLocator()