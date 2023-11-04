import { Condition } from './Condition'
import { ConditionType } from './ConditionType'

export type AndConditions = {
  type: ConditionType.And
  conditions: Condition[]
}

export const and = (...conditions: Condition[]): AndConditions => ({ type: ConditionType.And, conditions })