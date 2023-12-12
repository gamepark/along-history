import { Card } from '../../material/Card'
import { CardId } from '../../material/cards/CardId'
import { RuleId } from '../RuleId'
import { LoseCardRule } from './LoseCardRule'

export class SaxonsFailureRule extends LoseCardRule {
  onRuleStart() {
    if (this.activeCards.getItems<CardId>().some(card => card.id!.front === Card.Charlemagne)) {
      return this.getEndRuleMoves()
    }
    return []
  }

  getEndRuleMoves() {
    return [this.rules().startRule(RuleId.TransmitCalamity)]
  }

  onRuleEnd() {
    return []
  }
}