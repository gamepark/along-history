import { isMoveItem, isSelectItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class TradeCardsRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (!this.opponentCardSelected.length) {
      moves.push(...this.selectOpponentCard)
    }
    if (!this.playerCardSelected.length) {
      moves.push(...this.selectPlayerCard)
    }
    return moves
  }

  get opponentCardSelected() {
    return this.material(MaterialType.Card).location(LocationType.EventArea).player(p => p !== this.player).selected()
  }

  get playerCardSelected() {
    return this.material(MaterialType.Card).location(LocationType.EventArea).player(this.player).selected()
  }

  get selectOpponentCard(): MaterialMove[] {
    return this.material(MaterialType.Card).location(LocationType.EventArea).player(p => p !== this.player).selectItems()
  }

  get selectPlayerCard(): MaterialMove[] {
    return this.material(MaterialType.Card).location(LocationType.EventArea).player(this.player).selectItems()
  }

  afterItemMove(move: ItemMove) {
    if (isSelectItem(move) && move.itemType === MaterialType.Card) {
      const opponentCard = this.opponentCardSelected
      const playerCard = this.playerCardSelected
      if (opponentCard.length && playerCard.length) {
        delete playerCard.getItem()!.selected
        return [
          playerCard.moveItem(opponentCard.getItem()!.location),
          opponentCard.moveItem(playerCard.getItem()!.location),
          this.rules().startRule(RuleId.UseDice)
        ]
      } else {
        return [this.rules().startRule(RuleId.TradeCards)]
      }
    } else if (isMoveItem(move) && move.itemType === MaterialType.Card) {
      delete this.material(MaterialType.Card).getItem(move.itemIndex)?.selected
    }
    return []
  }
}