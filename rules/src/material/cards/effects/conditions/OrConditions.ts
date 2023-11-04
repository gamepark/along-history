import { Condition } from './Condition'
import { ConditionType } from './ConditionType'

export type OrConditions = {
  type: ConditionType.Or
  conditions: Condition[]
}

export const or = (conditions: Condition[]): OrConditions => ({ type: ConditionType.Or, conditions })
