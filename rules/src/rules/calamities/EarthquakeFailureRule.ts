import { CardId } from '../../material/cards/CardId'
import { CardsInfo } from '../../material/cards/CardsInfo'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { LoseCardRule } from './LoseCardRule'

export class EarthquakeFailureRule extends LoseCardRule {
  getCardsToLose() {
    const cards = super.getCardsToLose()
    const bonusCards = cards.id<CardId>(id => CardsInfo[id.front].bonus.length > 0)
    return bonusCards.length > 0 ? bonusCards : cards
  }

  getEndRuleMoves() {
    return [
      ...this.material(MaterialType.Card).location(LocationType.EventArea).player(this.player).moveItems({ type: LocationType.Discard }),
      this.endRule
    ]
  }
}