import { MaterialRulesPart } from '@gamepark/rules-api'
import { RuleId } from './RuleId'

export class WarsRule extends MaterialRulesPart {
  onRuleStart() {
    return [this.rules().startRule(RuleId.NewEvents)]
  }
}