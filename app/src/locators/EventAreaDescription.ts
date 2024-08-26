import { DropAreaDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { cardDescription } from '../material/CardDescription'
import { discardTileDescription } from '../material/DiscardTileDescription'
import { EventAreaHelp } from './help/EventAreaHelp'
import { getPlayerLocation } from './PlayerLocator'

export class EventAreaDescription extends DropAreaDescription {
  borderRadius = cardDescription.borderRadius
  help = EventAreaHelp

  getLocationSize(location: Location, context: MaterialContext) {
    const l = getPlayerLocation(context, location.player)
    return { width: l.eventArea.width - discardTileDescription.width - 1, height: cardDescription.height }
  }
}

export const eventAreaDescription = new EventAreaDescription()
