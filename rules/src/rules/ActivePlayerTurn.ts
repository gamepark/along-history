import { isMoveItem, isRoll, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { getDiceSymbol } from '../material/Dices'
import { DiceSymbol } from '../material/DiceSymbol'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'

export class ActivePlayerTurn extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    return this.material(MaterialType.Dice).rollItems({ type: LocationType.PlayerDices, player: this.player })
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = []
    const discardedDice = this.remind(Memory.DiscardedDice)
    if (discardedDice !== undefined) {
      if (getDiceSymbol(this.material(MaterialType.Dice).getItem(discardedDice)!) === DiceSymbol.Reroll) {
        moves.push(...this.selectDices)
        if (this.selectedDices.length > 0) {
          moves.push(this.rules().customMove(CustomMoveType.Reroll))
        }
      } else {
        moves.push(...this.rerollOneDice)
      }
    } else {
      moves.push(...this.discardDice)
    }
    return moves
  }

  get discardDice() {
    return this.material(MaterialType.Dice).location(LocationType.PlayerDices).player(this.player)
      .moveItems(item => ({ type: LocationType.DiscardTile, parent: 0, rotation: item.location.rotation }))
  }

  get rerollOneDice() {
    return this.material(MaterialType.Dice).location(LocationType.PlayerDices).player(this.player).rollItems()
  }

  get selectDices() {
    return this.material(MaterialType.Dice).location(LocationType.PlayerDices).player(this.player).selected(false).selectItems()
  }

  get selectedDices() {
    return this.material(MaterialType.Dice).selected()
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