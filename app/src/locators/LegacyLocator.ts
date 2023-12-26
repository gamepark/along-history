import { ItemContext, LineLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { cardDescription } from '../material/CardDescription'
import { civilisationAreaDescription } from './CivilisationAreaDescription'
import { civilisationAreaHeight, getPlayerLocation, Orientation, PlayerLocation } from './PlayerLocator'

class LegacyLocator extends LineLocator {
  locationDescription = civilisationAreaDescription

  getCoordinates(item: MaterialItem, context: ItemContext): Coordinates {
    const l = getPlayerLocation(item.location.player!, context)
    const { x, y } = this.getXYCoordinates(l)
    return { x, y, z: -10 }
  }

  getDelta(item: MaterialItem, context: ItemContext) {
    const l = getPlayerLocation(item.location.player!, context)
    switch (l.orientation) {
      case Orientation.LEFT_RIGHT:
        return { y: -1.3, z: 0.05 }
      case Orientation.TOP_BOTTOM:
        return { x: 1.3, z: 0.05 }
      case Orientation.RIGHT_LEFT:
        return { y: 1.3, z: 0.05 }
      case Orientation.BOTTOM_TOP:
        return { x: -1.3, z: 0.05 }
    }
  }

  getDeltaMax(item: MaterialItem, context: ItemContext) {
    const l = getPlayerLocation(item.location.player!, context)
    switch (l.orientation) {
      case Orientation.LEFT_RIGHT:
        return { y: -11.5 }
      case Orientation.TOP_BOTTOM:
        return { x: 11.5 }
      case Orientation.RIGHT_LEFT:
        return { y: 11.5 }
      case Orientation.BOTTOM_TOP:
        return { x: -11.5 }
    }
  }

  getXYCoordinates(l: PlayerLocation): XYCoordinates {
    switch (l.orientation) {
      case Orientation.LEFT_RIGHT:
        return {
          x: l.civilisationArea.x + l.civilisationArea.width - cardDescription.width / 2,
          y: l.civilisationArea.y + civilisationAreaHeight - cardDescription.height / 2
        }
      case Orientation.TOP_BOTTOM:
        return {
          x: l.civilisationArea.x - civilisationAreaHeight + cardDescription.height / 2,
          y: l.civilisationArea.y + l.civilisationArea.width - cardDescription.width / 2
        }
      case Orientation.RIGHT_LEFT:
        return {
          x: l.civilisationArea.x - l.civilisationArea.width + cardDescription.width / 2,
          y: l.civilisationArea.y - civilisationAreaHeight + cardDescription.height / 2
        }
      case Orientation.BOTTOM_TOP:
        return {
          x: l.civilisationArea.x + civilisationAreaHeight - cardDescription.height / 2,
          y: l.civilisationArea.y - l.civilisationArea.width + cardDescription.width / 2
        }
    }
  }
}

export const legacyLocator = new LegacyLocator()
