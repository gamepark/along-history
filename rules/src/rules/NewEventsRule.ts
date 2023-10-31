import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class NewEventsRule extends PlayerTurnRule {
  onRuleStart() {
    const eventCards = this.material(MaterialType.Card).location(LocationType.EventArea).player(this.player).length
    const deck = this.material(MaterialType.Card).location(LocationType.Deck).deck()
    const moves: MaterialMove[] = deck.deal({ type: LocationType.EventArea, player: this.player }, 3 - eventCards)
    moves.push(this.rules().startRule(RuleId.Achievements))
    return moves
  }
}