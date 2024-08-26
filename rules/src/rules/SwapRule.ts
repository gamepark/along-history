import { CustomMove, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { RuleId } from './RuleId'
import { TradeCardsRule } from './TradeCardsRule'

export class SwapRule extends TradeCardsRule {
  getPlayerMoves(): MaterialMove[] {
    return super.getPlayerMoves().concat(this.customMove(CustomMoveType.Pass))
  }

  get opponentCardSelected() {
    return this.transmissibleCards.player(p => p !== this.player).selected()
  }

  get playerCardSelected() {
    return this.transmissibleCards.player(this.player).selected()
  }

  get transmissibleCards() {
    return this.material(MaterialType.Card).location(LocationType.CivilisationArea)
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Pass) {
      delete this.playerCardSelected.getItem()!.selected
      return [this.startRule(RuleId.Actions)]
    }
    return []
  }
}