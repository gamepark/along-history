import { CustomMove, isStartRule, PlayerTurnRule, RuleMove } from '@gamepark/rules-api'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class CounterattackRule extends PlayerTurnRule {
  getPlayerMoves() {
    return [
      this.rules().startRule(RuleId.PrepareArmy),
      this.rules().customMove(CustomMoveType.Pass)
    ]
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Pass) {
      return [this.rules().startPlayerTurn(RuleId.Wars, this.remind(Memory.Attacker))]
    }
    return []
  }

  onRuleEnd(move: RuleMove) {
    if (isStartRule(move) && move.id === RuleId.PrepareArmy) {
      this.memorize(Memory.Counterattack, true)
      this.memorize(Memory.Defender, this.remind(Memory.Attacker))
      this.memorize(Memory.Attacker, this.player)
      this.forget(Memory.Strength)
    }
    return []
  }
}