import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class UpkeepRule extends PlayerTurnRule {
  onRuleStart() {
    const moves: MaterialMove[] = this.material(MaterialType.Card).location(LocationType.CivilisationArea).player(this.player)
      .rotation(true).rotateItems(undefined)
    if (this.isActivePlayer) {
      moves.push(this.rules().startRule(RuleId.RollDice))
    } else {
      moves.push(this.rules().startRule(RuleId.Actions))
    }
    return moves
  }

  get isActivePlayer() {
    return this.material(MaterialType.DiscardTile).getItem()?.location.player === this.player
  }
}