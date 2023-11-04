import { PlayerTurnRule } from '@gamepark/rules-api'
import { Card } from '../../../Card'
import { LocationType } from '../../../LocationType'
import { MaterialType } from '../../../MaterialType'
import { CardId } from '../../CardId'
import { Condition } from './Condition'
import { ConditionType } from './ConditionType'

export class ConditionRules extends PlayerTurnRule {
  hasCondition(condition: Condition, player = this.player): boolean {
    switch (condition.type) {
      case ConditionType.Or:
        return condition.conditions.some(condition => this.hasCondition(condition, player))
      case ConditionType.And:
        return condition.conditions.every(condition => this.hasCondition(condition, player))
      case ConditionType.OwnCards:
        return condition.cards.filter(card => this.ownCard(card, player)).length >= condition.quantity
    }
  }

  ownCard(card: Card, player = this.player) {
    return this.material(MaterialType.Card).location(LocationType.CivilisationArea).player(player).id<CardId>(id => id.front === card).length > 0
  }
}