import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export abstract class ActivePlayerRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    return this.material(MaterialType.Card).location(LocationType.EventArea).player(this.player)
      .moveItems({ type: LocationType.CivilisationArea, player: this.player })
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItem(move) && move.itemType === MaterialType.Card && move.location.type === LocationType.CivilisationArea) {
      return [this.rules().startRule(RuleId.PayCard)]
    }
    return []
  }
}