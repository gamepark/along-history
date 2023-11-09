import { Bonus } from '../../material/cards/Bonus'
import { CardId } from '../../material/cards/CardId'
import { CardsInfo } from '../../material/cards/CardsInfo'
import { LoseCardRule } from './LoseCardRule'

export class CannibalsFailureRule extends LoseCardRule {
  getCardsToLose() {
    const cards = super.getCardsToLose()
    const popBonusCards = cards.id<CardId>(id => CardsInfo[id.front].bonus.includes(Bonus.Population))
    return popBonusCards.length > 0 ? popBonusCards : cards
  }
}