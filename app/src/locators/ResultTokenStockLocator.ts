import { GridLocator } from '@gamepark/react-game'
import { boardDescription } from '../material/BoardDescription'
import { cardDescription } from '../material/CardDescription'
import { resultTokenDescription } from '../material/ResultTokenDescription'
import { boardTableLocator } from './BoardTableLocator'

class ResultTokenStockLocator extends GridLocator {
  coordinates = {
    x: boardTableLocator.position.x + boardDescription.width / 2 + resultTokenDescription.width / 2 + 1,
    y: cardDescription.height + 1.9,
    z: 0.8
  }
  itemsPerLine = 3
  itemsGap = { x: 2 }
  linesGap = { y: 2 }
}

export const resultTokenStockLocator = new ResultTokenStockLocator()