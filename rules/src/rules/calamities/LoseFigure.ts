import { CardId } from '../../material/cards/CardId'
import { CardsInfo } from '../../material/cards/CardsInfo'
import { CardType } from '../../material/cards/CardType'
import { LoseCardRule } from './LoseCardRule'

export class LoseFigureRule extends LoseCardRule {
  getCardsToLose() {
    const cards = this.activeCards
    const figures = cards.id<CardId>(id => CardsInfo[id.front].type === CardType.Figure)
    if (figures.length) return figures
    return super.getCardsToLose()
  }
}