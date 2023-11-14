import { css } from '@emotion/react'
import { LocationType } from '@gamepark/along-history/material/LocationType'
import { PlayerColor } from '@gamepark/along-history/PlayerColor'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { cardDescription } from '../material/CardDescription'
import { civilisationAreaHeight, getPlayerLocation, Orientation } from './PlayerLocator'

export class CivilisationAreaDescription extends LocationDescription {
  alwaysVisible = true
  borderRadius = cardDescription.borderRadius

  getLocations({ rules }: MaterialContext) {
    return rules.players.map(player => ({ type: LocationType.CivilisationArea, player }))
  }

  getExtraCss(location: Location) {
    return css`
      background-color: ${playerAreaColor[location.player!]};
    `
  }

  getSize(location: Location, context: MaterialContext) {
    const l = getPlayerLocation(location.player!, context)
    return { width: l.civilisationArea.width, height: civilisationAreaHeight }
  }

  getCoordinates(location: Location, context: LocationContext) {
    const l = getPlayerLocation(location.player!, context)
    switch (l.orientation) {
      case Orientation.LEFT_RIGHT:
        return {
          x: l.civilisationArea.x + l.civilisationArea.width / 2,
          y: l.civilisationArea.y + civilisationAreaHeight / 2,
          z: 0
        }
      case Orientation.TOP_BOTTOM:
        return {
          x: l.civilisationArea.x - civilisationAreaHeight / 2,
          y: l.civilisationArea.y + l.civilisationArea.width / 2,
          z: 0
        }
      case Orientation.RIGHT_LEFT:
        return {
          x: l.civilisationArea.x - l.civilisationArea.width / 2,
          y: l.civilisationArea.y - civilisationAreaHeight / 2,
          z: 0
        }
      case Orientation.BOTTOM_TOP:
        return {
          x: l.civilisationArea.x + civilisationAreaHeight / 2,
          y: l.civilisationArea.y - l.civilisationArea.width / 2,
          z: 0
        }
    }
  }

  getRotateZ(location: Location, context: LocationContext) {
    const l = getPlayerLocation(location.player!, context)
    return l.orientation * 90
  }
}

export const civilisationAreaDescription = new CivilisationAreaDescription()

const playerAreaColor: Record<PlayerColor, string> = {
  [PlayerColor.White]: 'rgba(255, 255, 255, 0.2)',
  [PlayerColor.Yellow]: 'rgba(255, 255, 0, 0.2)',
  [PlayerColor.Blue]: 'rgba(0, 0, 255, 0.2)',
  [PlayerColor.Green]: 'rgba(0, 255, 0, 0.2)',
  [PlayerColor.Red]: 'rgba(255, 0, 0, 0.2)'
}
