import { Bonus } from '../../material/cards/Bonus'
import { CardId } from '../../material/cards/CardId'
import { CardsInfo } from '../../material/cards/CardsInfo'
import { LoseCardRule } from './LoseCardRule'

export class StarvingFailureRule extends LoseCardRule {
  getCardsToLose() {
    const cards = super.getCardsToLose()
    const popBonusCards = cards.id<CardId>(id => CardsInfo[id.front].bonus.includes(Bonus.Population))
    if (popBonusCards.length > 0) {
      return popBonusCards
    }
    const bonusCards = cards.id<CardId>(id => CardsInfo[id.front].bonus.length > 0)
    return bonusCards.length > 0 ? bonusCards : cards
  }
}