import { isRoll, ItemMove } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'
import { TradeCardsRule } from './TradeCardsRule'

export class UseDiscardedDieRule extends TradeCardsRule {
  getPlayerMoves() {
    return super.getPlayerMoves().concat(this.rerollOneDice)
  }

  get rerollOneDice() {
    return this.material(MaterialType.Dice).location(LocationType.PlayerDices).player(this.player).rollItems()
  }

  afterItemMove(move: ItemMove) {
    if (isRoll(move)) {
      return [this.rules().startRule(RuleId.Actions)]
    }
    return super.afterItemMove(move)
  }
}