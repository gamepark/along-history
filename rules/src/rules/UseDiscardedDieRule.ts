import { isRoll, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'
import { TradeCardsRule } from './TradeCardsRule'

export class UseDiscardedDieRule extends TradeCardsRule {
  getPlayerMoves() {
    return super.getPlayerMoves().concat(this.rerollOneDice)
  }

  get rerollOneDice() {
    return this.material(MaterialType.Dice).location(LocationType.PlayerResources).player(this.player).rollItems()
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isRoll(move)) {
      return [this.startRule(RuleId.Actions)]
    }
    return super.afterItemMove(move)
  }
}