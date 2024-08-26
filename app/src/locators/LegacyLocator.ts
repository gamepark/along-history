import { ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { cardDescription } from '../material/CardDescription'
import { civilisationAreaDescription } from './CivilisationAreaDescription'
import { civilisationAreaHeight, getPlayerLocation, getPlayerRotateZ, Orientation } from './PlayerLocator'

class LegacyLocator extends ListLocator {
  locationDescription = civilisationAreaDescription

  getGap(location: Location, context: MaterialContext) {
    const l = getPlayerLocation(context, location.player)
    switch (l.orientation) {
      case Orientation.LEFT_RIGHT:
        return { y: -1.3 }
      case Orientation.TOP_BOTTOM:
        return { x: 1.3 }
      case Orientation.RIGHT_LEFT:
        return { y: 1.3 }
      case Orientation.BOTTOM_TOP:
        return { x: -1.3 }
    }
  }

  getMaxGap(location: Location, context: MaterialContext) {
    const l = getPlayerLocation(context, location.player)
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

  getCoordinates(location: Location, context: ItemContext) {
    const l = getPlayerLocation(context, location.player)
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

  getRotateZ = (location: Location, context: ItemContext) => getPlayerRotateZ(context, location.player)
}

export const legacyLocator = new LegacyLocator()
