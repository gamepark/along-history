import { CustomMove, PlayerTurnRule } from '@gamepark/rules-api'
import { CardId } from '../material/cards/CardId'
import { CardsInfo } from '../material/cards/CardsInfo'
import { CardType } from '../material/cards/CardType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { CustomMoveType } from './CustomMoveType'
import { RuleId } from './RuleId'

export class PoisonRule extends PlayerTurnRule {
  getPlayerMoves() {
    return this.game.players.filter(player => player !== this.player && this.activeFigures(player).length > 0)
      .map(player => this.rules().customMove(CustomMoveType.ChoosePlayer, player))
  }

  activeFigures(player: PlayerColor) {
    return this.material(MaterialType.Card).location(l => l.type === LocationType.CivilisationArea && l.player === player && !l.z)
      .id<CardId>(id => CardsInfo[id!.front].type === CardType.Figure)
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.ChoosePlayer) {
      return this.poisonPlayer(move.data)
    }
    return []
  }

  poisonPlayer(player: PlayerColor) {
    const activeFigures = this.activeFigures(player)
    if (activeFigures.length === 1) {
      return [
        activeFigures.moveItem({ type: LocationType.Discard }),
        this.rules().startRule(RuleId.Actions)
      ]
    } else {
      return [this.rules().startPlayerTurn(RuleId.LoseFigure, player)]
    }
  }
}