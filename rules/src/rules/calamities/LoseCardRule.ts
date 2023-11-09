import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { CalamityFailureRule } from './CalamityFailureRule'

export class LoseCardRule extends CalamityFailureRule {
  onRuleStart() {
    if (this.getCardsToLose().length === 0) {
      return this.getEndRuleMoves()
    }
    return []
  }

  getPlayerMoves() {
    return this.getCardsToLose().moveItems({ type: LocationType.Discard })
  }

  getCardsToLose() {
    return this.material(MaterialType.Card).location(LocationType.CivilisationArea).player(this.player)
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Discard && move.itemIndex !== this.remind(Memory.Calamity)) {
      return this.getEndRuleMoves()
    }
    return []
  }
}