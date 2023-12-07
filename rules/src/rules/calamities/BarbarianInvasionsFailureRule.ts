import { RuleId } from '../RuleId'
import { LoseBonusCardRule } from './LoseBonusCardRule'

export class BarbarianInvasionsFailureRule extends LoseBonusCardRule {
  getEndRuleMoves() {
    return [this.rules().startRule(RuleId.TransmitCalamity)]
  }

  onRuleEnd() {
    return []
  }
}