import { MaterialRulesPart } from '@gamepark/rules-api'
import { RuleId } from './RuleId'

export class CalamitiesRule extends MaterialRulesPart {
  onRuleStart() {
    return [this.rules().startRule(RuleId.Wars)]
  }
}