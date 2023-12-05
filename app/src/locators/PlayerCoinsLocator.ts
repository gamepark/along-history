import { LocationType } from '@gamepark/along-history/material/LocationType'
import { ItemContext, LocationContext, LocationDescription, MaterialContext, PileLocator } from '@gamepark/react-game'
import { Location, MaterialItem } from '../../../../workshop/packages/rules-api'
import { cardDescription } from '../material/CardDescription'
import { civilisationAreaHeight, getPlayerLocation, Orientation } from './PlayerLocator'

class PlayerCoinsLocator extends PileLocator {
  locationDescription = new PlayerCoinsDescription()

  getCoordinates(item: MaterialItem, context: ItemContext) {
    return { ...this.locationDescription.getCoordinates(item.location, context), z: 0.1 }
  }

  getRadius(item: MaterialItem, context: ItemContext) {
    const l = getPlayerLocation(item.location.player!, context)
    if (l.orientation === Orientation.RIGHT_LEFT || l.orientation === Orientation.LEFT_RIGHT) {
      return { x: 3, y: 1 }
    } else {
      return { x: 1, y: 3 }
    }
  }
}

class PlayerCoinsDescription extends LocationDescription {
  width = 8
  height = 4.2
  borderRadius = 3

  getLocations({ rules }: MaterialContext) {
    return rules.players.map(player => ({ type: LocationType.PlayerCoins, player }))
  }

  getCoordinates(location: Location, context: LocationContext) {
    const l = getPlayerLocation(location.player!, context)
    const deltaX = l.civilisationArea.width - 32.5
    const deltaY = civilisationAreaHeight / 2 - cardDescription.height / 2
    switch (l.orientation) {
      case Orientation.LEFT_RIGHT:
        return {
          x: l.civilisationArea.x + deltaX,
          y: l.civilisationArea.y + deltaY,
          z: 5
        }
      case Orientation.TOP_BOTTOM:
        return {
          x: l.civilisationArea.x - deltaY,
          y: l.civilisationArea.y + deltaX,
          z: 5
        }
      case Orientation.RIGHT_LEFT:
        return {
          x: l.civilisationArea.x - deltaX,
          y: l.civilisationArea.y - deltaY,
          z: 5
        }
      case Orientation.BOTTOM_TOP:
        return {
          x: l.civilisationArea.x + deltaY,
          y: l.civilisationArea.y - deltaX,
          z: 5
        }
    }
  }

  getRotateZ(location: Location, context: LocationContext) {
    const l = getPlayerLocation(location.player!, context)
    return l.orientation === Orientation.TOP_BOTTOM || l.orientation === Orientation.BOTTOM_TOP ? 90 : 0
  }

  location = { type: LocationType.UniversalResourceStock }
}

export const playerCoinsLocator = new PlayerCoinsLocator()
