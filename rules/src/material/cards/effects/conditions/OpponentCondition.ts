import { Condition } from './Condition'
import { ConditionType } from './ConditionType'

export type OpponentCondition = {
  type: ConditionType.Opponent
  condition: Condition
}

export const opponent = (condition: Condition): OpponentCondition => ({ type: ConditionType.Opponent, condition })
