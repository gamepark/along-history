import { PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'

export class ReRollDices extends PlayerTurnRule {
  getPlayerMoves() {
    return this.material(MaterialType.Dice).location(LocationType.PlayerDices).player(this.player)
      .moveItems(item => ({ type: LocationType.DiscardTile, parent: 0, rotation: item.location.rotation }))
  }
}