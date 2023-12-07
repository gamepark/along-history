import { Age } from '@gamepark/along-history/material/Age'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { Memory } from '@gamepark/along-history/rules/Memory'
import { ItemLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { diceDescription } from '../material/DiceDescription'

class DiscardTileLocator extends ItemLocator {
  parentItemType = MaterialType.DiscardTile

  getPositionOnParent(location: Location, { rules }: MaterialContext) {
    const x = location.x
    if (x === undefined) return { x: 50, y: 50 }
    if (rules.remind(Memory.CurrentAge) == Age.Prehistory) {
      return { x: 30 + 40 * (x % 2), y: 20 + Math.floor(x / 2) * 30 }
    } else {
      switch (x) {
        case 0:
          return { x: 30, y: 20 }
        case 1:
          return { x: 70, y: 20 }
        case 2:
          return { x: 15, y: 50 }
        case 3:
          return { x: 50, y: 50 }
        case 4:
          return { x: 85, y: 50 }
        case 5:
          return { x: 30, y: 80 }
        case 6:
        default:
          return { x: 70, y: 80 }
      }
    }
  }

  getPosition() {
    return { x: 0, y: 0, z: diceDescription.width }
  }
}

export const discardTileLocator = new DiscardTileLocator()