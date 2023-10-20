import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'

export class RollDices extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    return this.material(MaterialType.Dice).rollItems({ type: LocationType.PlayerDices, player: this.player })
  }

  getPlayerMoves() {
    return []
  }
}