import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { EndOfTurnRule } from './EndOfTurnRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class UpkeepRule extends PlayerTurnRule {
  onRuleStart() {
    if (this.remind(Memory.PassNextTurn, this.player)) {
      this.forget(Memory.PassNextTurn, this.player)
      return new EndOfTurnRule(this.game).endPlayerTurn
    }
    const moves = this.unRotateCards
    if (this.isActivePlayer) {
      moves.push(this.startRule(RuleId.RollDice))
    } else {
      moves.push(this.startRule(RuleId.Actions))
    }
    return moves
  }

  get unRotateCards(): MaterialMove[] {
    return this.material(MaterialType.Card).location(LocationType.CivilisationArea).player(this.player)
      .rotation(true).sort(item => item.location.x!).rotateItems(undefined)
  }

  get isActivePlayer() {
    return this.material(MaterialType.DiscardTile).getItem()?.location.player === this.player
  }
}