import { isDeleteItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
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

  afterItemMove(move: ItemMove) {
    if (isDeleteItemType(MaterialType.Coin)(move)) {
      return this.getEndRuleMoves()
    }
    return []
  }

  onRuleEnd() {
    super.onRuleEnd()
    return [
      ...this.material(MaterialType.Card).location(LocationType.Discard).moveItems({ type: LocationType.Deck }),
      this.material(MaterialType.Card).location(l => l.type === LocationType.Deck || l.type === LocationType.Discard).shuffle()
    ]
  }
}