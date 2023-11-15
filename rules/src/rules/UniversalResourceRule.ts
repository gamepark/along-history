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
    moves.push(...this.endPlayerTurn)
    return moves
  }

  get endPlayerTurn() {
    if (this.material(MaterialType.DiscardTile).getItem()?.location.player === this.nextPlayer) {
      return this.endRound
    } else {
      return [
        ...this.material(MaterialType.ResultToken).location(LocationType.PlayerResources).player(this.player)
          .moveItems({ type: LocationType.PlayerResources, player: this.nextPlayer }),
        this.rules().startPlayerTurn(RuleId.Upkeep, this.nextPlayer)
      ]
    }
  }

  get endRound() {
    const moves: MaterialMove[] = this.material(MaterialType.ResultToken).location(LocationType.PlayerResources).player(this.player)
      .moveItems({ type: LocationType.ResultTokenStock })
    if (this.ageIsOver) {
      moves.push(this.rules().endGame())
    } else {
      const nextActivePlayer = this.game.players[(this.game.players.indexOf(this.player) + 2) % this.game.players.length]
      moves.push(this.material(MaterialType.DiscardTile).moveItem({ type: LocationType.PlayerDiscardTile, player: nextActivePlayer }))
      moves.push(this.rules().startPlayerTurn(RuleId.Upkeep, nextActivePlayer))
    }
    return moves
  }

  get ageIsOver() {
    return this.material(MaterialType.AchievementToken).location(l => l.type === LocationType.AchievementsBoard && l.x === 7).length === 0
      || this.material(MaterialType.Card).location(LocationType.Deck).length === 0
  }
}