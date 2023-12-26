import { isCreateItemType, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { diceToDiscardTile, DiceType, getDiceSymbol } from '../material/Dices'
import { DiceSymbol, goldAmount } from '../material/DiceSymbol'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'
import { UseDiscardedDieRule } from './UseDiscardedDieRule'

export class UseGoldDieRule extends UseDiscardedDieRule {
  onRuleStart() {
    if (this.transmissibleCards.player(this.player).length === 0) {
      return [this.takeGold()]
    }
    return []
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = [this.takeGold(), ...this.availableMultipliers.moveItems(diceToDiscardTile)]
    const multiplier = this.remind<number>(Memory.Multiplier)
    if (!multiplier) {
      moves.push(...super.getPlayerMoves())
    }
    return moves
  }

  takeGold(quantity = this.goldAmount) {
    return this.material(MaterialType.Coin).createItem({ quantity, location: { type: LocationType.PlayerCoins, player: this.player } })
  }

  get goldAmount() {
    const multiplier = this.remind<number>(Memory.Multiplier) ?? 1
    return goldAmount(getDiceSymbol(this.material(MaterialType.Dice).id(DiceType.Gold).getItem()!)) * multiplier
  }

  get availableMultipliers() {
    return this.material(MaterialType.Dice).location(LocationType.PlayerResources)
      .filter(item => getDiceSymbol(item) === DiceSymbol.Multiplier).player(this.player)
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Dice)(move) && move.location.type === LocationType.DiscardTile) {
      if (this.availableMultipliers.length > 0) {
        this.memorize<number | undefined>(Memory.Multiplier, (multiplier = 1) => multiplier * 2)
        return []
      } else {
        return [this.takeGold(this.goldAmount * 2)]
      }
    } else if (isCreateItemType(MaterialType.Coin)(move)) {
      this.forget(Memory.Multiplier)
      return [this.rules().startRule(RuleId.Actions)]
    } else {
      return super.afterItemMove(move)
    }
  }
}