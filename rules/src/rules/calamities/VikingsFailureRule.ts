import { MaterialType } from '../../material/MaterialType'
import { RuleId } from '../RuleId'
import { LoseCardRule } from './LoseCardRule'

export class VikingsFailureRule extends LoseCardRule {
  onRuleStart() {
    const coins = this.material(MaterialType.Coin).player(this.player)
    const gold = coins.getQuantity()
    return gold > 0 ? [coins.deleteItem(gold)] : []
  }

  getEndRuleMoves() {
    return [this.rules().startRule(RuleId.TransmitCalamity)]
  }

  onRuleEnd() {
    return []
  }
}