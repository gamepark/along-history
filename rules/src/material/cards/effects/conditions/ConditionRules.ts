import { PlayerTurnRule } from '@gamepark/rules-api'
import { sumBy } from 'lodash'
import { PlayerColor } from '../../../../PlayerColor'
import { Memory } from '../../../../rules/Memory'
import { LocationType } from '../../../LocationType'
import { MaterialType } from '../../../MaterialType'
import { CardId } from '../../CardId'
import { CardsInfo } from '../../CardsInfo'
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
      case ConditionType.OwnCardType:
        return this.getCivCards(player).id<CardId>(id => CardsInfo[id.front].type === condition.cardType).length >= condition.quantity
      case ConditionType.Opponent:
        const opponent = this.getOpponent(player)
        return this.hasCondition(condition.condition, opponent)
    }
  }

  countCondition(condition: Condition | undefined, player = this.player): number {
    if (!condition) return 0
    switch (condition.type) {
      case ConditionType.Or:
        return sumBy(condition.conditions, condition => this.countCondition(condition, player))
      case ConditionType.And:
        return Math.min(...condition.conditions.map(condition => this.countCondition(condition, player)))
      case ConditionType.OwnCards:
        return Math.floor(this.getActiveCards(player).id<CardId>(id => condition.cards.includes(id.front)).length / condition.quantity)
      case ConditionType.OwnCardType:
        return Math.floor(this.getCivCards(player).id<CardId>(id => CardsInfo[id.front].type === condition.cardType).length / condition.quantity)
      case ConditionType.Opponent:
        const opponent = this.getOpponent(player)
        return this.countCondition(condition.condition, opponent)
    }
  }

  getCivCards(player = this.player) {
    return this.material(MaterialType.Card).location(LocationType.CivilisationArea).player(player)
  }

  getActiveCards(player = this.player) {
    return this.getCivCards(player).location(l => !l.z)
  }

  getOpponent(player = this.player) {
    const attacker = this.remind<PlayerColor | undefined>(Memory.Attacker)
    const defender = this.remind<PlayerColor | undefined>(Memory.Defender)
    if (player === attacker) return defender
    else if (player === defender) return attacker
    return
  }
}