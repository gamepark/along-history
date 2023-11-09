import { PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export class CalamityFailureRule extends PlayerTurnRule {
  getEndRuleMoves() {
    return [this.discardCalamity, this.endRule]
  }

  get discardCalamity() {
    return this.material(MaterialType.Card).index(this.remind(Memory.Calamity)).moveItem({ type: LocationType.Discard })
  }

  get endRule() {
    return this.rules().startRule(RuleId.Calamities)
  }

  onRuleEnd() {
    this.forget(Memory.Calamity)
    return []
  }
}