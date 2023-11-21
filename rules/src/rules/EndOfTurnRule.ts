import { CustomMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class EndOfTurnRule extends PlayerTurnRule {
  onRuleStart() {
    const moves: MaterialMove[] = []
    if (this.remind(Memory.CardAcquired)) {
      this.forget(Memory.CardAcquired)
    } else if (this.material(MaterialType.UniversalResource).player(this.player).getQuantity() < 2) {
      moves.push(this.material(MaterialType.UniversalResource).location(LocationType.UniversalResourceStock)
        .moveItem({ type: LocationType.PlayerUniversalResource, player: this.player }, 1))
    }
    moves.push(...this.material(MaterialType.Dice).location(LocationType.PlayerResources)
      .moveItems(item => ({ type: LocationType.DiscardTile, parent: 0, rotation: item.location.rotation })))
    return moves
  }

  getPlayerMoves() {
    return [this.rules().customMove(CustomMoveType.Pass)]
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Pass) {
      return this.endPlayerTurn
    }
    return []
  }

  get endPlayerTurn() {
    if (this.material(MaterialType.DiscardTile).getItem()?.location.player === this.nextPlayer) {
      return this.endRound
    } else {
      return [
        ...this.material(MaterialType.ResultToken).selected(true)
          .moveItems({ type: LocationType.PlayerResources, player: this.nextPlayer }),
        this.rules().startPlayerTurn(RuleId.Upkeep, this.nextPlayer)
      ]
    }
  }

  get endRound() {
    const selectedResultToken = this.material(MaterialType.ResultToken).selected(true)
    const moves: MaterialMove[] = selectedResultToken.moveItems({ type: LocationType.ResultTokenStock })
    for (const item of selectedResultToken.getItems()) {
      delete item.selected
    }
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