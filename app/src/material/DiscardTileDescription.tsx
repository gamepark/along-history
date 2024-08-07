import { LocationType } from '@gamepark/along-history/material/LocationType'
import { BoardDescription } from '@gamepark/react-game'
import DiscardTile from '../images/board/DiscardTile.jpg'
import { DiscardTileHelp } from './help/DiscardTileHelp'

class DiscardTileDescription extends BoardDescription {
  image = DiscardTile
  width = 6.2
  height = 8.6

  location = { type: LocationType.DiscardTile }

  help = DiscardTileHelp
}

export const discardTileDescription = new DiscardTileDescription()