import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { cardDescription } from '../material/CardDescription'
import { civilisationAreaDescription } from './CivilisationAreaDescription'
import { playerLocator } from './PlayerLocator'

class CivilisationAreaLocator extends ItemLocator {
  locationDescription = civilisationAreaDescription

  transformItemLocation(item: MaterialItem, context: ItemContext) {
    return playerLocator.transformItemInFrontOfPlayer(item, context).concat(this.transformOwnItemLocation(item, context))
  }

  /**
   * Calculate absolute position of the elements inside this area, integrating spaces between cards and decay shifts.
   * @param item
   * @param context
   * @returns
   */
  getPosition(item: MaterialItem, context: ItemContext): Coordinates {
    const previousColumnsContent: Array<number> = []
    ;[...Array(item.location.x).keys()].forEach((column) => {
      previousColumnsContent[column] = context.rules
        .material(MaterialType.Card)
        .player(item.location.player)
        .locationId(item.location.id)
        .location((loc) => loc.type === item.location.type && loc.x === column).length
    })

    const shiftDecay = 1
    const shiftCard = 1
    const previousShiftsCount = previousColumnsContent.reduce((acc, colCont) => acc + colCont - 1, 0)
    let originX, originY
    originX = cardDescription.width / 2
    originY = civilisationAreaDescription.height - cardDescription.height / 2
    return {
      x:
        originX +
        cardDescription.width * previousColumnsContent.length + //all cards width total
        shiftCard * previousColumnsContent.length + //shift between each card, total
        shiftDecay * previousShiftsCount + //previous piles shifts
        shiftDecay * item.location.z!, //this pile shift
      y: originY,
      z: 5 - item.location.z! * 0.1 - item.location.x! * 0.05
    }
  }

  getRotations(item: MaterialItem) {
    return item.location.rotation ? [`rotateZ(${90}deg)`] : []
  }
}

export const civilisationAreaLocator = new CivilisationAreaLocator()
