import { isMoveItem, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { diceToDiscardTile, getDiceSymbol } from '../material/Dices'
import { DiceSymbol } from '../material/DiceSymbol'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { AcquireCardsRule } from './AcquireCardsRule'
import { RuleId } from './RuleId'

export class ActionsRule extends AcquireCardsRule {
  getPlayerMoves() {
    return super.getPlayerMoves().concat(this.discardDice).concat(this.flipResultTokens)
  }

  get discardDice() {
    return this.material(MaterialType.Dice).location(LocationType.PlayerResources).player(this.player).moveItems(diceToDiscardTile)
  }

  get discardGoldenAgeDice() {
    return [] // Every die can already be discarded to trade, and we do not want twice the same legal move
  }

  get flipResultTokens() {
    return this.material(MaterialType.ResultToken).location(LocationType.PlayerResources).player(this.player)
      .rotation(undefined).rotateItems(true)
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItem(move) && move.itemType === MaterialType.Dice) {
      const isReRoll = getDiceSymbol(this.material(MaterialType.Dice).getItem(move.itemIndex)!) === DiceSymbol.ReRoll
      return [this.rules().startRule(isReRoll ? RuleId.UseReRollDie : RuleId.UseDiscardedDie)]
    } else if (isMoveItem(move) && move.itemType === MaterialType.ResultToken && move.location.rotation) {
      return [this.rules().startRule(RuleId.TradeCards)]
    }
    return super.afterItemMove(move)
  }
}