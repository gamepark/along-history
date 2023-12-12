import { CardId } from '../../material/cards/CardId'
import { CardsInfo } from '../../material/cards/CardsInfo'
import { CardType } from '../../material/cards/CardType'
import { LoseCardRule } from './LoseCardRule'

export class LoseProgressRule extends LoseCardRule {
  getCardsToLose() {
    const cards = this.activeCards
    const progress = cards.id<CardId>(id => CardsInfo[id.front].type === CardType.Progress)
    if (progress.length) return progress
    return super.getCardsToLose()
  }
}