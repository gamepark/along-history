import { ItemLocator } from '@gamepark/react-game'
import { boardDescription } from '../material/BoardDescription'
import { cardDescription } from '../material/CardDescription'
import { civilisationAreaDescription } from './CivilisationAreaDescription'

class BoardTableLocator extends ItemLocator {
  position = {
    x: -civilisationAreaDescription.width + cardDescription.height + civilisationAreaDescription.height + 1.5 + boardDescription.width / 2,
    y: 0,
    z: 0
  }
}

export const boardTableLocator = new BoardTableLocator()