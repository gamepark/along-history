import { PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class UpkeepRule extends PlayerTurnRule {
  onRuleStart() {
    // TODO: remove civ cards rotation
    if (this.isActivePlayer) {
      return [this.rules().startRule(RuleId.RollDice)]
    } else {
      return [this.rules().startRule(RuleId.Actions)]
    }
  }

  get isActivePlayer() {
    return this.material(MaterialType.DiscardTile).getItem()?.location.player === this.player
  }
}