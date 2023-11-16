import { isMoveItem, isSelectItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { CardId } from '../material/cards/CardId'
import { CardsInfo } from '../material/cards/CardsInfo'
import { EffectType } from '../material/cards/effects/EffectType'
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

  get transmissibleCards() {
    return this.material(MaterialType.Card).location(LocationType.EventArea)
      .id<CardId>(id => !CardsInfo[id.front].effects.some(effect => effect.type === EffectType.NonTransmissible))
  }

  get selectOpponentCard(): MaterialMove[] {
    return this.transmissibleCards.player(p => p !== this.player).selectItems()
  }

  get selectPlayerCard(): MaterialMove[] {
    return this.transmissibleCards.player(this.player).selectItems()
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isSelectItem(move) && move.itemType === MaterialType.Card) {
      const opponentCard = this.opponentCardSelected
      const playerCard = this.playerCardSelected
      if (opponentCard.length && playerCard.length) {
        delete playerCard.getItem()!.selected
        return [
          playerCard.moveItem(opponentCard.getItem()!.location),
          opponentCard.moveItem(playerCard.getItem()!.location),
          this.rules().startRule(RuleId.Actions)
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