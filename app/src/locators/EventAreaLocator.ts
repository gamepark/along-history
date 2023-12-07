import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { ItemContext, LineLocator } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { cardDescription } from '../material/CardDescription'
import { discardTileDescription } from '../material/DiscardTileDescription'
import { eventAreaDescription } from './EventAreaDescription'
import { getPlayerLocation, Orientation } from './PlayerLocator'

class EventAreaLocator extends LineLocator {
  locationDescription = eventAreaDescription

  getCoordinates(item: MaterialItem, context: ItemContext): Coordinates {
    const { x, y } = this.getXYCoordinates(item, context)
    return {
      x: x + (item.selected ? -0.2 : 0),
      y: y + (item.selected ? -0.5 : 0),
      z: item.selected ? 20 : 0
    }
  }

  countItems(location: Location, { rules }: ItemContext) {
    const areaXPositions = rules.material(MaterialType.Card).location(l => l.type === LocationType.EventArea && l.player === location.player).getItems().map(item => item.location.x!)
    return areaXPositions.length > 0 ? Math.max(...areaXPositions) + 1 : 0
  }

  getXYCoordinates(item: MaterialItem, context: ItemContext): XYCoordinates {
    const l = getPlayerLocation(item.location.player!, context)
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

  getDelta(item: MaterialItem, context: ItemContext) {
    const l = getPlayerLocation(item.location.player!, context)
    switch (l.orientation) {
      case Orientation.LEFT_RIGHT:
        return { x: cardDescription.width + 1, z: 0.05 }
      case Orientation.TOP_BOTTOM:
        return { y: cardDescription.width + 1, z: 0.05 }
      case Orientation.RIGHT_LEFT:
        return { x: -cardDescription.width - 1, z: 0.05 }
      case Orientation.BOTTOM_TOP:
        return { y: -cardDescription.width - 1, z: 0.05 }
    }
  }

  getDeltaMax(item: MaterialItem, context: ItemContext) {
    const l = getPlayerLocation(item.location.player!, context)
    return { x: l.eventArea.width - cardDescription.width - discardTileDescription.width - 1 }
  }
}

export const eventAreaLocator = new EventAreaLocator()
