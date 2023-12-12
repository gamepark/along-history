import { Card } from '../../material/Card'
import { CardId } from '../../material/cards/CardId'
import { BarbarianInvasionsFailureRule } from './BarbarianInvasionsFailureRule'

export class BlackDeathFailureRule extends BarbarianInvasionsFailureRule {
  getCardsToLose() {
    const cards = this.activeCards
    if (cards.getItems<CardId>().some(card => card.id!.front === Card.Avicenna)) return cards
    return super.getCardsToLose()
  }
}