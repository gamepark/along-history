import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { cardDescription } from '../material/CardDescription'
import { civilisationAreaDescription } from './CivilisationAreaDescription'
import { civilisationAreaHeight, getPlayerLocation, Orientation, PlayerLocation } from './PlayerLocator'

class CivilisationAreaLocator extends ItemLocator {
  locationDescription = civilisationAreaDescription

  /**
   * Calculate absolute position of the elements inside this area, integrating spaces between cards and decay shifts.
   * @param item
   * @param context
   * @returns
   */
  getPosition(item: MaterialItem, context: ItemContext): Coordinates {
    const l = getPlayerLocation(item.location.player!, context)
    const { x, y } = this.getXYCoordinates(l)
    const delta = this.getDelta(item, context)
    const z = 5 - item.location.z! * 0.1 - item.location.x! * 0.05
    switch (l.orientation) {
      case Orientation.LEFT_RIGHT:
        return { x: x + delta, y, z }
      case Orientation.TOP_BOTTOM:
        return { x: x, y: y + delta, z }
      case Orientation.RIGHT_LEFT:
        return { x: x - delta, y, z }
      case Orientation.BOTTOM_TOP:
        return { x: x, y: y - delta, z }
    }

  }

  getDelta(item: MaterialItem, context: ItemContext): number {
    const previousColumnsContent: Array<number> = [];
    [...Array(item.location.x).keys()].forEach((column) => {
      previousColumnsContent[column] = context.rules
        .material(MaterialType.Card)
        .player(item.location.player)
        .locationId(item.location.id)
        .location((loc) => loc.type === item.location.type && loc.x === column).length
    })
    const shiftDecay = 1
    const shiftCard = 1
    const previousShiftsCount = previousColumnsContent.reduce((acc, colCont) => acc + colCont - 1, 0)
    return cardDescription.width * previousColumnsContent.length + //all cards width total
      shiftCard * previousColumnsContent.length + //shift between each card, total
      shiftDecay * previousShiftsCount + //previous piles shifts
      shiftDecay * item.location.z! //this pile shift
  }

  getXYCoordinates(l: PlayerLocation): XYCoordinates {
    switch (l.orientation) {
      case Orientation.LEFT_RIGHT:
        return {
          x: l.civilisationArea.x + cardDescription.width / 2,
          y: l.civilisationArea.y + civilisationAreaHeight - cardDescription.height / 2
        }
      case Orientation.TOP_BOTTOM:
        return {
          x: l.civilisationArea.x - civilisationAreaHeight + cardDescription.height / 2,
          y: l.civilisationArea.y + cardDescription.width / 2
        }
      case Orientation.RIGHT_LEFT:
        return {
          x: l.civilisationArea.x - cardDescription.width / 2,
          y: l.civilisationArea.y - civilisationAreaHeight + cardDescription.height / 2
        }
      case Orientation.BOTTOM_TOP:
        return {
          x: l.civilisationArea.x + civilisationAreaHeight - cardDescription.height / 2,
          y: l.civilisationArea.y - cardDescription.width / 2
        }
    }
  }

  getRotateZ(item: MaterialItem, context: ItemContext) {
    const l = getPlayerLocation(item.location.player!, context)
    return l.orientation * 90 + (item.location.rotation ? 90 : 0)
  }
}

export const civilisationAreaLocator = new CivilisationAreaLocator()
