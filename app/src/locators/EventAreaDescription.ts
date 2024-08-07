import { LocationType } from '@gamepark/along-history/material/LocationType'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { cardDescription } from '../material/CardDescription'
import { discardTileDescription } from '../material/DiscardTileDescription'
import { EventAreaHelp } from './help/EventAreaHelp'
import { getPlayerLocation, Orientation } from './PlayerLocator'

export class EventAreaDescription extends LocationDescription {
  borderRadius = cardDescription.borderRadius
  help = EventAreaHelp

  getLocations({ rules }: MaterialContext) {
    return rules.players.map(player => ({ type: LocationType.EventArea, player }))
  }

  getLocationSize(location: Location, context: MaterialContext) {
    const l = getPlayerLocation(location.player!, context)
    return { width: l.eventArea.width - discardTileDescription.width - 1, height: cardDescription.height }
  }

  getCoordinates(location: Location, context: LocationContext) {
    const l = getPlayerLocation(location.player!, context)
    const width = l.eventArea.width - discardTileDescription.width - 1
    switch (l.orientation) {
      case Orientation.LEFT_RIGHT:
        return {
          x: l.eventArea.x + width / 2,
          y: l.eventArea.y + cardDescription.height / 2,
          z: 5
        }
      case Orientation.TOP_BOTTOM:
        return {
          x: l.eventArea.x - cardDescription.height / 2,
          y: l.eventArea.y + width / 2,
          z: 5
        }
      case Orientation.RIGHT_LEFT:
        return {
          x: l.eventArea.x - width / 2,
          y: l.eventArea.y - cardDescription.height / 2,
          z: 5
        }
      case Orientation.BOTTOM_TOP:
        return {
          x: l.eventArea.x + cardDescription.height / 2,
          y: l.eventArea.y - width / 2,
          z: 5
        }
    }
  }

  getRotateZ(location: Location, context: LocationContext) {
    const l = getPlayerLocation(location.player!, context)
    return l.orientation * 90
  }
}

export const eventAreaDescription = new EventAreaDescription()
