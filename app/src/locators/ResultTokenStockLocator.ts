import { FlexLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { boardDescription } from '../material/BoardDescription'
import { cardDescription } from '../material/CardDescription'
import { resultTokenDescription } from '../material/ResultTokenDescription'

class ResultTokenStockLocator extends FlexLocator {
  getItemIndex(item: MaterialItem) {
    const x = item.location.x!
    if (x < 12) {
      return x + Math.floor(x / 3)
    } else {
      return x - (15 - x) * 3
    }
  }

  getCoordinates(_item: MaterialItem, { rules: { players } }: ItemContext) {
    const { x, y } = this.getBaseCoordinates(players.length)
    return {
      x: x,
      y: y,
      z: 0.1
    }
  }

  getBaseCoordinates(players: number) {
    if (players === 3) {
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

  itemsPerLine = 4
  itemsGap = { x: 2 }
  linesGap = { y: 2 }
}

export const resultTokenStockLocator = new ResultTokenStockLocator()