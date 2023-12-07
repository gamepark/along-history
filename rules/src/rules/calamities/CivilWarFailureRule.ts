import { CardId } from '../../material/cards/CardId'
import { CardsInfo } from '../../material/cards/CardsInfo'
import { CardType } from '../../material/cards/CardType'
import { LoseBonusCardRule } from './LoseBonusCardRule'

export class CivilWarFailureRule extends LoseBonusCardRule {
  getCardsToLose() {
    const cards = this.activeCards
    const wonders = cards.id<CardId>(id => CardsInfo[id.front].type === CardType.Wonder)
    if (wonders.length) return wonders
    const figures = cards.id<CardId>(id => CardsInfo[id.front].type === CardType.Figure)
    if (figures.length) return figures
    return super.getCardsToLose()
  }
}