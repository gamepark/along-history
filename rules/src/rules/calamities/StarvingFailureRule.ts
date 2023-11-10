import { Bonus } from '../../material/cards/Bonus'
import { CardId } from '../../material/cards/CardId'
import { CardsInfo } from '../../material/cards/CardsInfo'
import { LoseBonusCardRule } from './LoseBonusCardRule'

export class StarvingFailureRule extends LoseBonusCardRule {
  getCardsToLose() {
    const cards = super.getCardsToLose()
    const popBonusCards = cards.id<CardId>(id => CardsInfo[id.front].bonus.includes(Bonus.Population))
    return popBonusCards.length > 0 ? popBonusCards : cards
  }
}