import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class NewEventsRule extends PlayerTurnRule {
  onRuleStart() {
    const eventCards = this.material(MaterialType.Card).location(LocationType.EventArea).player(this.player).getItems()
    const deck = this.material(MaterialType.Card).location(LocationType.Deck).deck()
    const moves: MaterialMove[] = deck.deal({ type: LocationType.EventArea, player: this.player }, 3 - eventCards.length)
    for (const eventCard of eventCards) {
      if (eventCard.location.x! > 2) {
        eventCard.location.x = [0, 1, 2].find(x => !eventCards.some(card => card.location.x === x))
      }
    }
    moves.push(this.startRule(RuleId.Achievements))
    return moves
  }
}