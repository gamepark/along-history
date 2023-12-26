import { CustomMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { AlongHistoryRules } from '../AlongHistoryRules'
import { Age } from '../material/Age'
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
    this.forget(Memory.Attacker)
    this.forget(Memory.Defender)
    this.forget(Memory.Strength)
    this.forget(Memory.LegacyUsed)
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
    const ageIsOver = this.ageIsOver
    const age = this.remind<Age>(Memory.CurrentAge)
    const gameIsOver = ageIsOver && age === this.remind<Age>(Memory.LastAge)
    if (ageIsOver) {
      const scoreMemory = age === Age.Prehistory ? Memory.PrehistoryScore : age === Age.Antiquity ? Memory.AntiquityScore : Memory.MiddleAgesScore
      const rules = new AlongHistoryRules(this.game)
      for (const player of this.game.players) {
        this.memorize(scoreMemory, rules.getOngoingAgeScore(player), player)
      }
    }
    if (gameIsOver) {
      moves.push(this.rules().endGame())
    } else {
      const nextActivePlayer = this.game.players[(this.game.players.indexOf(this.player) + 2) % this.game.players.length]
      moves.push(this.material(MaterialType.DiscardTile).moveItem({ type: LocationType.PlayerDiscardTile, player: nextActivePlayer }))
      moves.push(this.rules().startPlayerTurn(ageIsOver ? RuleId.PrepareNextAge : RuleId.Upkeep, nextActivePlayer))
    }
    return moves
  }

  get ageIsOver() {
    return this.material(MaterialType.AchievementToken).location(l => l.type === LocationType.AchievementsBoard && l.x === 7).length === 0
      || this.material(MaterialType.Card).location(LocationType.Deck).length === 0
  }
}