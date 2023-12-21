import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { LoseCardRule } from './LoseCardRule'

export class EarthquakeFailureRule extends LoseCardRule {
  getEndRuleMoves() {
    return [
      ...this.material(MaterialType.Card).location(LocationType.EventArea).player(this.player).moveItems({ type: LocationType.Discard }),
      this.endRule
    ]
  }
}