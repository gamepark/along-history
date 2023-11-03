import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class RollDiceRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    const moves: MaterialMove[] = this.material(MaterialType.Dice).rollItems({ type: LocationType.PlayerResources, player: this.player })
    moves.push(this.rules().startPlayerTurn(RuleId.Actions, this.player))
    return moves
  }
}