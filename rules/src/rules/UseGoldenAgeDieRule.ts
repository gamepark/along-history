import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'
import { UpkeepRule } from './UpkeepRule'
import { UseDiscardedDieRule } from './UseDiscardedDieRule'

export class UseGoldenAgeDieRule extends UseDiscardedDieRule {
  getPlayerMoves(): MaterialMove[] {
    return super.getPlayerMoves().concat(new UpkeepRule(this.game).unRotateCards)
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.CivilisationArea) {
      return [
        this.startRule(RuleId.Actions),
        ...new UpkeepRule(this.game).unRotateCards
      ]
    } else {
      return super.afterItemMove(move)
    }
  }
}