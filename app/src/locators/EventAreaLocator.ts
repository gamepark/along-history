import { ItemContext, LineLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { boardDescription } from '../material/BoardDescription'
import { cardDescription } from '../material/CardDescription'

class EventAreaLocator extends LineLocator {
  getCoordinates(item: MaterialItem, context: ItemContext): Coordinates {
    const playerIndex = this.getRelativePlayerIndex(context, item.location.player!)
    switch (playerIndex) {
      case 0:
        return {
          x: cardDescription.width / 2 - boardDescription.width / 2 - (item.selected ? 0.2 : 0),
          y: boardDescription.height / 2 + cardDescription.height / 2 + 1 - (item.selected ? 0.5 : 0),
          z: item.selected ? 20 : 0
        }
      default:
        return {
          x: boardDescription.width / 2 + cardDescription.height / 2 + 1 - (item.selected ? 0.2 : 0),
          y: boardDescription.height / 2 - cardDescription.width / 2 - (item.selected ? 0.5 : 0),
          z: item.selected ? 20 : 0
        }
    }
  }

  getDelta(item: MaterialItem, context: ItemContext): Partial<Coordinates> {
    const playerIndex = this.getRelativePlayerIndex(context, item.location.player!)
    switch (playerIndex) {
      case 0:
        return { x: cardDescription.width + 1 }
      default:
        return { y: -cardDescription.width - 1 }
    }
  }

  getRotateZ(item: MaterialItem<number, number>, context: ItemContext<number, number, number>): number {
    const playerIndex = this.getRelativePlayerIndex(context, item.location.player!)
    return playerIndex === 0 ? 0 : -90
  }
}

export const eventAreaLocator = new EventAreaLocator()