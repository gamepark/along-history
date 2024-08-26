import { RuleId } from '../RuleId'
import { LoseBonusCardRule } from './LoseBonusCardRule'

export class BarbarianInvasionsFailureRule extends LoseBonusCardRule {
  getEndRuleMoves() {
    return [this.startRule(RuleId.TransmitCalamity)]
  }

  onRuleEnd() {
    return []
  }
}