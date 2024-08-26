import { LocationContext, PileLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { coinDescription } from '../material/CoinDescription'
import { resultTokenStockLocator } from './ResultTokenStockLocator'

class CoinStockLocator extends PileLocator {
  location = coinDescription.stockLocation
  radius = 2

  getCoordinates(location: Location, context: LocationContext) {
    const { x, y } = resultTokenStockLocator.getCoordinates(location, context)
    return { x: x + 11, y: y + 5 }
  }
}

export const coinsStockLocator = new CoinStockLocator()
