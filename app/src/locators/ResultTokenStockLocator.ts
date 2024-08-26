import { FlexLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { boardDescription } from '../material/BoardDescription'
import { cardDescription } from '../material/CardDescription'
import { resultTokenDescription } from '../material/ResultTokenDescription'

class ResultTokenStockLocator extends FlexLocator {
  lineSize = 4
  gap = { x: 2 }
  lineGap = { y: 2 }

  getCoordinates(_: Location, { rules }: MaterialContext) {
    if (rules.players.length === 3) {
      return {
        x: cardDescription.width * 2 + resultTokenDescription.width / 2 + 2,
        y: -cardDescription.height + resultTokenDescription.width / 2 - 1
      }
    } else {
      return {
        x: boardDescription.width + resultTokenDescription.width / 2 + 1,
        y: cardDescription.height + 1.9
      }
    }
  }

  getItemIndex(item: MaterialItem) {
    const x = item.location.x!
    if (x < 12) {
      return x + Math.floor(x / 3)
    } else {
      return x - (15 - x) * 3
    }
  }
}

export const resultTokenStockLocator = new ResultTokenStockLocator()