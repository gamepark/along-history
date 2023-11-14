import { ItemLocator } from '@gamepark/react-game'
import { boardDescription } from '../material/BoardDescription'

class BoardTableLocator extends ItemLocator {
  position = {
    x: boardDescription.width / 2,
    y: boardDescription.height / 2,
    z: 0
  }
}

export const boardTableLocator = new BoardTableLocator()