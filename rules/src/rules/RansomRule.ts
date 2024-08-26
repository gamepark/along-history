import { isMoveItem, ItemMove, MaterialMove, RuleMove, RuleMoveType, RuleStep, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class RansomRule extends SimultaneousRule {
  onRuleStart(move: RuleMove, previousRule?: RuleStep) {
    const moves: MaterialMove[] = []
    this.game.rule!.player = previousRule!.player
    if (move.type === RuleMoveType.StartSimultaneousRule && move.players) {
      for (const player of move.players) {
        const legalMoves = this.getLegalMoves(player)
        if (legalMoves.length === 0) {
          moves.push(this.endPlayerTurn(player))
        } else if (legalMoves.length === 1) {
          moves.push(legalMoves[0])
        }
      }
    }
    return moves
  }

  getActiveCards(player: PlayerColor) {
    return this.material(MaterialType.Card).location(l => l.type === LocationType.CivilisationArea && l.player === player && !l.z)
  }

  getActivePlayerLegalMoves(player: PlayerColor) {
    const moves: MaterialMove[] = this.getActiveCards(player).moveItems({ type: LocationType.Discard })
    const coins = this.material(MaterialType.Coin).player(player)
    const gold = coins.getQuantity()
    if (gold >= 5 || (gold > 0 && !moves.length)) {
      moves.push(coins.moveItem({ type: LocationType.PlayerCoins, player: this.game.rule!.player }, Math.min(5, gold)))
    }
    return moves
  }

  beforeItemMove(move: ItemMove) {
    if (isMoveItem(move)) {
      const item = this.material(move.itemType).getItem(move.itemIndex)
      return [this.endPlayerTurn(item!.location.player!)]
    }
    return []
  }

  getMovesAfterPlayersDone() {
    return [this.startPlayerTurn(RuleId.Actions, this.game.rule!.player!)]
  }

}