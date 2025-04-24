import { css } from '@emotion/react'
import { PlayerColor } from '@gamepark/along-history/PlayerColor'
import { isDecayMove } from '@gamepark/along-history/rules/DecayRule'
import { DropAreaDescription, ItemContext, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialMove } from '@gamepark/rules-api'
import { cardDescription } from '../material/CardDescription'
import { CivilisationAreaHelp } from './help/CivilisationAreaHelp'
import { civilisationAreaHeight, getPlayerLocation } from './PlayerLocator'

export class CivilisationAreaDescription extends DropAreaDescription {
  borderRadius = cardDescription.borderRadius
  help = CivilisationAreaHelp

  getExtraCss = ({ player = PlayerColor.White }: Location) => css`
    background-color: ${this.playerAreaColor[player]};
  `

  playerAreaColor = {
    [PlayerColor.White]: 'rgba(255, 255, 255, 0.2)',
    [PlayerColor.Yellow]: 'rgba(255, 255, 0, 0.2)',
    [PlayerColor.Blue]: 'rgba(0, 0, 255, 0.2)',
    [PlayerColor.Green]: 'rgba(0, 255, 0, 0.2)',
    [PlayerColor.Red]: 'rgba(255, 0, 0, 0.2)'
  }

  getLocationSize(location: Location, context: MaterialContext) {
    const l = getPlayerLocation(context, location.player)
    return { width: l.civilisationArea.width, height: civilisationAreaHeight }
  }

  canDrop(move: MaterialMove, location: Location, context: ItemContext) {
    if (isDecayMove(move)) return false
    return super.canDrop(move, location, context)
  }
}

export const civilisationAreaDescription = new CivilisationAreaDescription()
