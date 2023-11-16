import { LocationType } from '@gamepark/along-history/material/LocationType'
import { BoardDescription, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import DiscardTile from '../images/board/DiscardTile.jpg'
import { getPlayerRotation } from '../locators/PlayerLocator'

class DiscardTileDescription extends BoardDescription {
  image = DiscardTile
  width = 6.2
  height = 8.6

  location = { type: LocationType.DiscardTile }

  getRotateZ(item: MaterialItem, context: ItemContext) {
    return getPlayerRotation(item, context) + (item.location.rotation ? 45 : 0)
  }

  rules = () => <></>
}

export const discardTileDescription = new DiscardTileDescription()