import { css } from '@emotion/react'
import { LocationType } from '@gamepark/along-history/material/LocationType'
import { PlayerColor } from '@gamepark/along-history/PlayerColor'
import { ItemContext, LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '../../../../workshop/packages/rules-api'
import { boardDescription } from '../material/BoardDescription'
import { cardDescription } from '../material/CardDescription'
import { playerLocator } from './PlayerLocator'

export class CivilisationAreaDescription extends LocationDescription {
  alwaysVisible = true
  height = 13
  width = this.height + cardDescription.height * 2 + boardDescription.height + 3
  borderRadius = cardDescription.borderRadius

  getLocations({ rules }: MaterialContext) {
    return rules.players.map(player => ({ type: LocationType.CivilisationArea, player }))
  }

  getExtraCss(location: Location) {
    return css`
      background-color: ${playerAreaColor[location.player!]};
    `
  }

  transformOwnLocation(location: Location, context: LocationContext) {
    return playerLocator.transformItemInFrontOfPlayer({ location }, context as ItemContext).concat(super.transformOwnLocation(location, context))
  }

  coordinates = {
    x: this.width / 2,
    y: this.height / 2,
    z: 0
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
