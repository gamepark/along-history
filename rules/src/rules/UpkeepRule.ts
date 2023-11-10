import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'
import { UniversalResourceRule } from './UniversalResourceRule'

export class UpkeepRule extends PlayerTurnRule {
  onRuleStart() {
    if (this.remind(Memory.PassNextTurn, this.player)) {
      this.forget(Memory.PassNextTurn, this.player)
      return new UniversalResourceRule(this.game).endPlayerTurn
    }
    const moves = this.unRotateCards
    if (this.isActivePlayer) {
      moves.push(this.rules().startRule(RuleId.RollDice))
    } else {
      moves.push(this.rules().startRule(RuleId.Actions))
    }
    return moves
  }

  get unRotateCards(): MaterialMove[] {
    return this.material(MaterialType.Card).location(LocationType.CivilisationArea).player(this.player)
      .rotation(true).rotateItems(undefined)
  }

  get isActivePlayer() {
    return this.material(MaterialType.DiscardTile).getItem()?.location.player === this.player
  }
}