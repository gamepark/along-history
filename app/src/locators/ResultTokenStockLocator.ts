import { GridLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '../../../../workshop/packages/rules-api'
import { boardDescription } from '../material/BoardDescription'
import { cardDescription } from '../material/CardDescription'
import { resultTokenDescription } from '../material/ResultTokenDescription'

class ResultTokenStockLocator extends GridLocator {
  getCoordinates(_item: MaterialItem, { rules: { players } }: ItemContext) {
    if (players.length === 3) {
      return {
        x: cardDescription.width * 2 + resultTokenDescription.width / 2 + 2,
        y: -cardDescription.height + resultTokenDescription.width / 2 - 1,
        z: 0.8
      }
    } else {
      return {
        x: boardDescription.width + resultTokenDescription.width / 2 + 1,
        y: cardDescription.height + 1.9,
        z: 0.8
      }
    }
  }

  itemsPerLine = 3
  itemsGap = { x: 2 }
  linesGap = { y: 2 }
}

export const resultTokenStockLocator = new ResultTokenStockLocator()