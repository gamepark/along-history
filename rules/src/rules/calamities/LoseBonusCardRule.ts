import { CardId } from '../../material/cards/CardId'
import { CardsInfo } from '../../material/cards/CardsInfo'
import { LoseCardRule } from './LoseCardRule'

export class LoseBonusCardRule extends LoseCardRule {
  getCardsToLose() {
    const cards = super.getCardsToLose()
    const bonusCards = cards.id<CardId>(id => CardsInfo[id.front].bonus.length > 0)
    return bonusCards.length > 0 ? bonusCards : cards
  }
}