import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export class CalamityFailureRule extends PlayerTurnRule {
  getEndRuleMoves(): MaterialMove[] {
    return [this.discardCalamity, this.endRule]
  }

  get calamity() {
    return this.material(MaterialType.Card).index(this.remind(Memory.Calamity))
  }

  get discardCalamity() {
    return this.calamity.moveItem({ type: LocationType.Discard })
  }

  get endRule() {
    return this.startRule(RuleId.Calamities)
  }

  onRuleEnd(): MaterialMove[] {
    this.forget(Memory.Calamity)
    return []
  }
}