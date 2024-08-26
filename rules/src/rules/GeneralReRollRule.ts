import { CustomMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { sum } from 'lodash'
import { getDiceSymbol } from '../material/Dices'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class GeneralReRollRule extends PlayerTurnRule {
  onRuleStart() {
    const generalsLeft = this.remind<number>(Memory.GeneralsLeft)
    return !generalsLeft ? [this.nextRule] : []
  }

  getPlayerMoves() {
    const moves = this.selectDices
    moves.push(this.customMove(this.selectedDice.length === 0 ? CustomMoveType.Pass : CustomMoveType.Reroll))
    return moves
  }

  get selectedDice() {
    return this.material(MaterialType.Dice).selected()
  }

  get dices() {
    return this.material(MaterialType.Dice).location(LocationType.PlayerResources).player(this.player)
  }

  get selectDices(): MaterialMove[] {
    return this.dices.selected(false).selectItems()
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Pass) {
      return [this.nextRule]
    }
    if (move.type === CustomMoveType.Reroll) {
      const generalsLeft = this.remind<number>(Memory.GeneralsLeft) - 1
      const selectedDice = this.selectedDice
      for (const item of selectedDice.getItems()) {
        delete item.selected
      }
      const moves: MaterialMove[] = selectedDice.rollItems()
      if (!generalsLeft) {
        moves.push(this.nextRule)
        this.forget(Memory.GeneralsLeft)
      } else {
        this.memorize(Memory.GeneralsLeft, generalsLeft)
      }
      return moves
    }
    return []
  }

  get nextRule() {
    const defender = this.remind(Memory.Defender)
    return this.player !== defender ? this.startPlayerTurn(RuleId.PrepareArmy, defender) : this.startRule(RuleId.WarOutcome)
  }

  onRuleEnd() {
    this.addDiceStrength()
    return []
  }

  addDiceStrength() {
    const diceStrength = sum(this.dices.getItems().map(getDiceSymbol))
    this.memorize<number>(Memory.Strength, strength => strength + diceStrength, this.player)
  }
}