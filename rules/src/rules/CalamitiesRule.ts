import { isSelectItemType, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { CardId } from '../material/cards/CardId'
import { CardsInfo } from '../material/cards/CardsInfo'
import { CardType } from '../material/cards/CardType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class CalamitiesRule extends PlayerTurnRule {
  onRuleStart() {
    const calamities = this.calamities
    if (calamities.length === 1) {
      this.memorize(Memory.Calamity, calamities.getIndex())
      return [this.rules().startRule(RuleId.CannibalsFailure)]
    } else if (calamities.length === 0) {
      return [this.rules().startRule(RuleId.Wars)]
    }
    return []
  }

  get calamities() {
    return this.material(MaterialType.Card).location(LocationType.EventArea).player(this.player)
      .id<CardId>(id => CardsInfo[id.front].type === CardType.Calamity)
  }

  getPlayerMoves() {
    return this.calamities.selectItems()
  }

  afterItemMove(move: ItemMove) {
    if (isSelectItemType(MaterialType.Card)(move)) {
      const card = this.material(MaterialType.Card).getItem<CardId>(move.itemIndex)
      delete card?.selected
      return [this.rules().startRule(RuleId.CannibalsFailure)]
    }
    return []
  }
}