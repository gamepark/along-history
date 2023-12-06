import { Condition } from './conditions/Condition'
import { EffectType } from './EffectType'

export type GoldCostEffect = {
  type: EffectType.GoldCost,
  condition: Condition
  cost: number
}

export const goldCost = (cost: number, condition: Condition): GoldCostEffect => ({ type: EffectType.GoldCost, condition, cost })