import { isDeleteItemType, isMoveItemsAtOnce, isMoveItemType, isShuffle, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { LoseCardRule } from './LoseCardRule'

export class PiracyFailureRule extends LoseCardRule {

  onRuleStart(): MaterialMove[] {
    if (!this.activeCards.length) {
      const coins = this.material(MaterialType.Coin).player(this.player)
      if (coins) {
        return [coins.deleteItem(10)]
      }
    }
    return super.onRuleStart()
  }

  getPlayerMoves() {
    const moves = super.getPlayerMoves()
    const playerCoins = this.material(MaterialType.Coin).player(this.player)
    const goldAmount = playerCoins.getQuantity()
    if (goldAmount >= 10) {
      moves.push(playerCoins.deleteItem(10))
    }
    return moves
  }

  getEndRuleMoves(): MaterialMove[] {
    return [this.discardCalamity]
  }

  afterItemMove(move: ItemMove) {
    if (isDeleteItemType(MaterialType.Coin)(move)) {
      return this.getEndRuleMoves()
    } else if (isMoveItemType(MaterialType.Card)(move) && move.itemIndex === this.remind(Memory.Calamity) && move.location.type === LocationType.Discard) {
      return [this.material(MaterialType.Card).location(LocationType.Discard).moveItemsAtOnce({ type: LocationType.Deck })]
    } else if (isMoveItemsAtOnce(move) && move.itemType === MaterialType.Card && move.location.type === LocationType.Deck) {
      return [this.material(MaterialType.Card).location(LocationType.Deck).shuffle()]
    } else if (isShuffle(move)) {
      return [this.endRule]
    }
    return []
  }
}