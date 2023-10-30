import { CustomMove, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { RuleId } from './RuleId'
import { TradeRule } from './TradeRule'

export class UseReRollDieRule extends TradeRule {
  getPlayerMoves() {
    if (this.selectedDice.length > 0) {
      return this.selectDices.concat(this.rules().customMove(CustomMoveType.Reroll))
    } else {
      return super.getPlayerMoves().concat(this.selectDices)
    }
  }

  get selectedDice() {
    return this.material(MaterialType.Dice).selected()
  }

  get selectDices(): MaterialMove[] {
    return this.material(MaterialType.Dice).location(LocationType.PlayerDices).player(this.player).selected(false).selectItems()
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Reroll) {
      const selectedDice = this.selectedDice
      const moves: MaterialMove[] = selectedDice.rollItems()
      for (const item of selectedDice.getItems()) {
        delete item.selected
      }
      moves.push(this.rules().startRule(RuleId.UseDice))
      return moves
    }
    return []
  }
}