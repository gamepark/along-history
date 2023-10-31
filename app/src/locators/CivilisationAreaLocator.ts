import { LocationType } from '@gamepark/along-history/material/LocationType'
import { getRelativePlayerIndex, ItemContext, LineLocator, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '../../../../workshop/packages/rules-api'
import { boardDescription } from '../material/BoardDescription'
import { cardDescription } from '../material/CardDescription'

class CivilisationAreaLocator extends LineLocator {
  locationDescription = new CivilisationAreaDescription()

  getCoordinates(item: MaterialItem, context: ItemContext): Coordinates {
    const playerIndex = getRelativePlayerIndex(context, item.location.player)
    switch (playerIndex) {
      case 0:
        return {
          x: cardDescription.width / 2 - boardDescription.width / 2,
          y: boardDescription.height / 2 + cardDescription.height * 1.5 + 2,
          z: 0
        }
      default:
        return {
          x: boardDescription.width / 2 + cardDescription.height * 1.5 + 2,
          y: boardDescription.height / 2 - cardDescription.width / 2,
          z: item.selected ? 20 : 0
        }
    }
  }

  getDelta(item: MaterialItem, context: ItemContext): Partial<Coordinates> {
    const playerIndex = getRelativePlayerIndex(context, item.location.player)
    switch (playerIndex) {
      case 0:
        return { x: cardDescription.width + 1 }
      default:
        return { y: -cardDescription.width - 1 }
    }
  }

  getRotateZ(item: MaterialItem<number, number>, context: ItemContext<number, number, number>): number {
    const playerIndex = getRelativePlayerIndex(context, item.location.player)
    return playerIndex === 0 ? 0 : -90
  }
}

class CivilisationAreaDescription extends LocationDescription {
  height = cardDescription.height + 1
  width = boardDescription.width
  borderRadius = cardDescription.borderRadius
  coordinates = {
    x: 0,
    y: boardDescription.height / 2 + cardDescription.height * 1.5 + 2,
    z: 0
  }

  getLocations({ player }: MaterialContext) {
    return player !== undefined ? [{ type: LocationType.CivilisationArea, player }] : []
  }
}

export const civilisationAreaLocator = new CivilisationAreaLocator()