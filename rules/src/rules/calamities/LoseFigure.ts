import { MaterialMove } from '../../../../../workshop/packages/rules-api'
import { CardId } from '../../material/cards/CardId'
import { CardsInfo } from '../../material/cards/CardsInfo'
import { CardType } from '../../material/cards/CardType'
import { LocationType } from '../../material/LocationType'
import { RuleId } from '../RuleId'
import { LoseCardRule } from './LoseCardRule'

export class LoseFigureRule extends LoseCardRule {
  getCardsToLose() {
    const cards = this.activeCards
    const figures = cards.id<CardId>(id => CardsInfo[id.front].type === CardType.Figure)
    if (figures.length) return figures
    return super.getCardsToLose()
  }

  getEndRuleMoves(): MaterialMove[] {
    const calamity = this.calamity.getItem()!
    if (calamity.location.type === LocationType.CivilisationArea) { // Poison
      return [this.rules().startPlayerTurn(RuleId.Actions, calamity.location.player!)]
    } else {
      return super.getEndRuleMoves()
    }
  }
}