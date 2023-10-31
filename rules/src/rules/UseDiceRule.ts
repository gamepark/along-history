import { isMoveItem, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { getDiceSymbol } from '../material/Dices'
import { DiceSymbol } from '../material/DiceSymbol'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { ActivePlayerRule } from './ActivePlayerRule'
import { RuleId } from './RuleId'

export class UseDiceRule extends ActivePlayerRule {
  getPlayerMoves() {
    return super.getPlayerMoves().concat(this.discardDice)
  }

  get discardDice() {
    return this.material(MaterialType.Dice).location(LocationType.PlayerDices).player(this.player)
      .moveItems(item => ({ type: LocationType.DiscardTile, parent: 0, rotation: item.location.rotation }))
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItem(move) && move.itemType === MaterialType.Dice) {
      const isReRoll = getDiceSymbol(this.material(MaterialType.Dice).getItem(move.itemIndex)!) === DiceSymbol.ReRoll
      return [this.rules().startRule(isReRoll ? RuleId.UseReRollDie : RuleId.UseDiscardedDie)]
    }
    return super.afterItemMove(move)
  }
}