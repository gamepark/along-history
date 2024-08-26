import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { cardDescription } from '../material/CardDescription'
import { discardTileDescription } from '../material/DiscardTileDescription'
import { eventAreaDescription } from './EventAreaDescription'
import { getPlayerLocation, getPlayerRotateZ, Orientation } from './PlayerLocator'

class EventAreaLocator extends ListLocator {
  locationDescription = eventAreaDescription

  getItemCoordinates(item: MaterialItem<number, number>, context: ItemContext<number, number, number>): Partial<Coordinates> {
    const { x = 0, y = 0, z = 0 } = super.getItemCoordinates(item, context)
    return item.selected ? { x: x - 0.2, y: y - 0.5, z: z + 1 } : { x, y }
  }

  countItems(location: Location, { rules }: ItemContext) {
    const areaXPositions = rules.material(MaterialType.Card).location(l => l.type === LocationType.EventArea && l.player === location.player).getItems().map(item => item.location.x!)
    return areaXPositions.length > 0 ? Math.max(...areaXPositions) + 1 : 0
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const l = getPlayerLocation(context, location.player)
    switch (l.orientation) {
      case Orientation.LEFT_RIGHT:
        return {
          x: l.eventArea.x + cardDescription.width / 2,
          y: l.eventArea.y + cardDescription.height / 2
        }
      case Orientation.TOP_BOTTOM:
        return {
          x: l.eventArea.x - cardDescription.height / 2,
          y: l.eventArea.y + cardDescription.width / 2
        }
      case Orientation.RIGHT_LEFT:
        return {
          x: l.eventArea.x - cardDescription.width / 2,
          y: l.eventArea.y - cardDescription.height / 2
        }
      case Orientation.BOTTOM_TOP:
        return {
          x: l.eventArea.x + cardDescription.height / 2,
          y: l.eventArea.y - cardDescription.width / 2
        }
    }
  }

  getGap(location: Location, context: MaterialContext) {
    const gap = cardDescription.width + 1
    const l = getPlayerLocation(context, location.player)
    switch (l.orientation) {
      case Orientation.LEFT_RIGHT:
        return { x: gap }
      case Orientation.TOP_BOTTOM:
        return { y: gap }
      case Orientation.RIGHT_LEFT:
        return { x: -gap }
      case Orientation.BOTTOM_TOP:
        return { y: -gap }
    }
  }

  getMaxGap(location: Location, context: MaterialContext) {
    const l = getPlayerLocation(context, location.player)
    const max = l.eventArea.width - cardDescription.width - discardTileDescription.width - 1
    switch (l.orientation) {
      case Orientation.LEFT_RIGHT:
        return { x: max }
      case Orientation.TOP_BOTTOM:
        return { y: max }
      case Orientation.RIGHT_LEFT:
        return { x: -max }
      case Orientation.BOTTOM_TOP:
        return { y: -max }
    }
  }

  getRotateZ(location: Location, context: ItemContext) {
    return getPlayerRotateZ(context, location.player) + (location.rotation ? 45 : 0)
  }
}

export const eventAreaLocator = new EventAreaLocator()
