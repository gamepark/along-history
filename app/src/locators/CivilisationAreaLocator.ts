import { LocationType } from '@gamepark/along-history/material/LocationType'
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
    const l = getPlayerLocation(item.location.player!, context)
    const cards = context.rules.material(MaterialType.Card).location(l => l.type === LocationType.CivilisationArea && l.player === item.location.player)
    const maxX = cards.sort(item => -item.location.x!).getItem()!.location.x!
    const decayCards = cards.location(l => l.z !== 0)
    const decayBefore = decayCards.location(l => l.x! < item.location.x!).length
    const decayDelta = 1
    let deltaX = cardDescription.width + 1
    if (maxX > 0) {
      //const decayXMax = decayCards.location(l => l.x === maxX).length
      deltaX = Math.min(deltaX, (l.civilisationArea.width - decayCards.length * decayDelta - cardDescription.width) / maxX)
    }
    return item.location.x! * deltaX + (decayBefore + item.location.z!) * decayDelta
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
    return l.orientation * 90 + (item.location.rotation ? 45 : 0)
  }
}

export const civilisationAreaLocator = new CivilisationAreaLocator()
