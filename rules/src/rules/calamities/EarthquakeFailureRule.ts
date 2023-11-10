import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { LoseBonusCardRule } from './LoseBonusCardRule'

export class EarthquakeFailureRule extends LoseBonusCardRule {
  getEndRuleMoves() {
    return [
      ...this.material(MaterialType.Card).location(LocationType.EventArea).player(this.player).moveItems({ type: LocationType.Discard }),
      this.endRule
    ]
  }
}