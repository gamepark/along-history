import { LocationType } from '@gamepark/along-history/material/LocationType'
import { DropAreaDescription, ItemContext, LocationContext, MaterialContext, PileLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { playerAchievementsLocator } from './PlayerAchievementsLocator'
import { getPlayerLocation, getPlayerRotateZ, Orientation } from './PlayerLocator'

class PlayerCoinsLocator extends PileLocator {
  locationDescription = new DropAreaDescription({ width: 8, height: 4.2, borderRadius: 3 })

  getLocations = ({ rules }: MaterialContext) => rules.players.map(player => ({ type: LocationType.PlayerCoins, player }))

  getRotateZ = (location: Location, context: LocationContext) => getPlayerRotateZ(context, location.player)

  getCoordinates(location: Location, context: ItemContext) {
    const l = getPlayerLocation(context, location.player)
    return playerAchievementsLocator.getCoordinates(location, context, l.civilisationArea.width - 32.5)
  }

  getRadius(location: Location, context: ItemContext) {
    const l = getPlayerLocation(context, location.player)
    if (l.orientation === Orientation.RIGHT_LEFT || l.orientation === Orientation.LEFT_RIGHT) {
      return { x: 3, y: 1 }
    } else {
      return { x: 1, y: 3 }
    }
  }
}

export const playerCoinsLocator = new PlayerCoinsLocator()
