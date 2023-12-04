import { GridLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { boardDescription } from '../material/BoardDescription'
import { cardDescription } from '../material/CardDescription'
import { resultTokenDescription } from '../material/ResultTokenDescription'

class ResultTokenStockLocator extends GridLocator {
  getItemIndex(item: MaterialItem) {
    const x = item.location.x!
    if (x < 12) {
      return x + Math.floor(x / 3)
    } else {
      return x - (15 - x) * 3
    }
  }

  getCoordinates(item: MaterialItem, { rules: { players } }: ItemContext) {
    if (players.length === 3) {
      return {
        x: cardDescription.width * 2 + resultTokenDescription.width / 2 + 2 - (item.selected ? 0.2 : 0),
        y: -cardDescription.height + resultTokenDescription.width / 2 - 1 - (item.selected ? 0.2 : 0),
        z: 0.8
      }
    } else {
      return {
        x: boardDescription.width + resultTokenDescription.width / 2 + 1 - (item.selected ? 0.2 : 0),
        y: cardDescription.height + 1.9 - (item.selected ? 0.2 : 0),
        z: 0.8
      }
    }
  }

  itemsPerLine = 4
  itemsGap = { x: 2 }
  linesGap = { y: 2 }
}

export const resultTokenStockLocator = new ResultTokenStockLocator()