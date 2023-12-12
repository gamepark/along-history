import { Card } from '../../material/Card'
import { CardId } from '../../material/cards/CardId'
import { CardsInfo } from '../../material/cards/CardsInfo'
import { CardType } from '../../material/cards/CardType'
import { LoseBonusCardRule } from './LoseBonusCardRule'

export class CholeraFailureRule extends LoseBonusCardRule {
  getCardsToLose() {
    const cards = this.activeCards
    if (cards.getItems<CardId>().some(card => card.id!.front === Card.Avicenna)) return cards
    const figures = cards.id<CardId>(id => CardsInfo[id.front].type === CardType.Figure)
    if (figures.length) return figures
    return super.getCardsToLose()
  }
}