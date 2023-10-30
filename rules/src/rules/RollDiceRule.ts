import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class RollDiceRule extends MaterialRulesPart {
  onRuleStart(): MaterialMove[] {
    const player = this.activePlayer
    const moves: MaterialMove[] = this.material(MaterialType.Dice).rollItems({ type: LocationType.PlayerDices, player })
    moves.push(this.rules().startPlayerTurn(RuleId.UseDice, player))
    return moves
  }

  get activePlayer() {
    return this.material(MaterialType.DiscardTile).getItem()!.location.player!
  }
}