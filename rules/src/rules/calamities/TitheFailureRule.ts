import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { LoseCardRule } from './LoseCardRule'

export class TitheFailureRule extends LoseCardRule {
  onRuleStart() {
    const coins = this.material(MaterialType.Coin).player(this.player)
    if (coins.getQuantity() >= 12) {
      const opponents = this.game.players.filter(p => p !== this.player)
      return [
        ...opponents.map(player => coins.moveItem({ type: LocationType.PlayerCoins, player }, 12 / opponents.length)),
        ...this.getEndRuleMoves()
      ]
    } else {
      return super.onRuleStart()
    }
  }
}