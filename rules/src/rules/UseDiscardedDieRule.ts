import { isRoll, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'
import { TradeRule } from './TradeRule'

export class UseDiscardedDieRule extends TradeRule {
  getPlayerMoves() {
    return super.getPlayerMoves().concat(this.rerollOneDice)
  }

  get rerollOneDice() {
    return this.material(MaterialType.Dice).location(LocationType.PlayerDices).player(this.player).rollItems()
  }

  afterItemMove(move: MaterialMove) {
    if (isRoll(move)) {
      return [this.rules().startRule(RuleId.UseDice)]
    }
    return []
  }
}