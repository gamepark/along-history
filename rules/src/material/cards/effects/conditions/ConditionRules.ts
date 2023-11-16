import { PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../../LocationType'
import { MaterialType } from '../../../MaterialType'
import { CardId } from '../../CardId'
import { Condition } from './Condition'
import { ConditionType } from './ConditionType'

export class ConditionRules extends PlayerTurnRule {
  hasCondition(condition: Condition | undefined, player = this.player): boolean {
    if (!condition) return true
    switch (condition.type) {
      case ConditionType.Or:
        return condition.conditions.some(condition => this.hasCondition(condition, player))
      case ConditionType.And:
        return condition.conditions.every(condition => this.hasCondition(condition, player))
      case ConditionType.OwnCards:
        return this.getActiveCards(player).id<CardId>(id => condition.cards.includes(id.front)).length >= condition.quantity
    }
  }

  getActiveCards(player = this.player) {
    return this.material(MaterialType.Card).location(l => l.type === LocationType.CivilisationArea && !l.z).player(player)
  }
}