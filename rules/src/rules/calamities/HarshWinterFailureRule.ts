import { Memory } from '../Memory'
import { CalamityFailureRule } from './CalamityFailureRule'

export class HarshWinterFailureRule extends CalamityFailureRule {
  onRuleStart() {
    this.memorize(Memory.PassNextTurn, true, this.player)
    return this.getEndRuleMoves()
  }
}