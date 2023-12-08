import { isCreateItemType, ItemMove } from '@gamepark/rules-api'
import { DiceSymbol, goldAmount, isGold } from '../material/DiceSymbol'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'
import { TradeCardsRule } from './TradeCardsRule'

export class UseGoldResultTokenRule extends TradeCardsRule {
  getPlayerMoves() {
    return [this.takeGold(), ...super.getPlayerMoves()]
  }

  get gold() {
    return goldAmount(this.material(MaterialType.ResultToken).player(this.player).id(isGold).getItem<DiceSymbol>()!.id!)
  }

  takeGold(quantity = this.gold) {
    return this.material(MaterialType.Coin).createItem({ quantity, location: { type: LocationType.PlayerCoins, player: this.player } })
  }

  afterItemMove(move: ItemMove) {
    if (isCreateItemType(MaterialType.Coin)(move)) {
      return [this.rules().startRule(RuleId.Actions)]
    } else {
      return super.afterItemMove(move)
    }
  }
}