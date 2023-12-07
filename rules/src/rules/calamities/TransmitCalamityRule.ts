import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CalamityFailureRule } from './CalamityFailureRule'

export class TransmitCalamityRule extends CalamityFailureRule {
  getPlayerMoves(): MaterialMove<number, number, number>[] {
    const calamity = this.calamity
    return this.game.players.filter(p => p !== this.player).map(player =>
      calamity.moveItem({ type: LocationType.EventArea, player })
    )
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.EventArea) {
      return [this.endRule]
    }
    return []
  }
}