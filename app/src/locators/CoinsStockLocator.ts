import { LocationType } from '@gamepark/along-history/material/LocationType'
import { ItemContext, LocationContext, LocationDescription, PileLocator } from '@gamepark/react-game'
import { Location, MaterialItem } from '../../../../workshop/packages/rules-api'
import { resultTokenStockLocator } from './ResultTokenStockLocator'

class CoinStockLocator extends PileLocator {
  locationDescription = new CoinsStockDescription()

  getCoordinates(_item: MaterialItem, context: ItemContext) {
    return { ...this.locationDescription.getCoordinates(_item.location, context), z: 0 }
  }

  radius = 2
}

class CoinsStockDescription extends LocationDescription {
  width = 6
  height = 6
  borderRadius = this.width / 2

  getCoordinates(_location: Location, { rules: { players } }: LocationContext) {
    const { x, y } = resultTokenStockLocator.getBaseCoordinates(players.length)
    return { x: x + 11, y: y + 5, z: 5 }
  }

  location = { type: LocationType.UniversalResourceStock }
}

export const coinsStockLocator = new CoinStockLocator()
