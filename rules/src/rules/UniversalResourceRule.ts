import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class UniversalResourceRule extends PlayerTurnRule {
  onRuleStart() {
    const moves: MaterialMove[] = []
    if (this.remind(Memory.CardAcquired)) {
      this.forget(Memory.CardAcquired)
    } else if (this.material(MaterialType.UniversalResource).player(this.player).getQuantity() < 2) {
      moves.push(this.material(MaterialType.UniversalResource).location(LocationType.UniversalResourceStock)
        .moveItem({ type: LocationType.PlayerUniversalResource, player: this.player }, 1))
    }
    if (this.material(MaterialType.DiscardTile).getItem()?.location.player === this.nextPlayer) {
      return this.endRound
    }
    moves.push(this.rules().startPlayerTurn(RuleId.Upkeep, this.nextPlayer))
    return moves
  }

  get endRound() {
    if (this.ageIsOver) {
      return [this.rules().endGame()]
    } else {
      const nextActivePlayer = this.game.players[(this.game.players.indexOf(this.player) + 2) % this.game.players.length]
      return [
        this.material(MaterialType.DiscardTile).moveItem({ type: LocationType.PlayerDiscardTile, player: nextActivePlayer }),
        this.rules().startPlayerTurn(RuleId.Upkeep, nextActivePlayer)
      ]
    }
  }

  get ageIsOver() {
    return false // TODO
  }
}