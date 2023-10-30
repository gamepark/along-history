import { isMoveItem, isRoll, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'

export class ActivePlayerTurn extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    return this.material(MaterialType.Dice).rollItems({ type: LocationType.PlayerDices, player: this.player })
  }

  getPlayerMoves() {
    const discardedDice = this.remind(Memory.DiscardedDice)
    if (discardedDice !== undefined) {
      return this.rerollDice
    }
    return this.discardDice
  }

  get discardDice() {
    return this.material(MaterialType.Dice).location(LocationType.PlayerDices).player(this.player)
      .moveItems(item => ({ type: LocationType.DiscardTile, parent: 0, rotation: item.location.rotation }))
  }

  get rerollDice() {
    return this.material(MaterialType.Dice).location(LocationType.PlayerDices).player(this.player).rollItems()
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    switch (move.itemType) {
      case MaterialType.Dice:
        if (isMoveItem(move) && move.location.type === LocationType.DiscardTile) {
          this.memorize(Memory.DiscardedDice, move.itemIndex)
        } else if (isRoll(move)) {
          this.forget(Memory.DiscardedDice)
        }
    }
    return []
  }
}