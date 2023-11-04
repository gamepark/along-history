import { Condition } from './conditions/Condition'
import { EffectType } from './EffectType'

export type DiscountEffect = {
  type: EffectType.Discount,
  condition: Condition
  population: number
}

export const populationDiscount = (population: number, condition: Condition): DiscountEffect => ({ type: EffectType.Discount, condition, population })