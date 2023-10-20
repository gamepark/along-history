import { BoardDescription } from '@gamepark/react-game'
import DiscardTile from '../images/board/DiscardTile.jpg'

class DiscardTileDescription extends BoardDescription {
  image = DiscardTile
  width = 6.2
  height = 8.6

  rules = () => <></>
}

export const discardTileDescription = new DiscardTileDescription()