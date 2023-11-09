import { Condition } from './conditions/Condition'
import { EffectType } from './EffectType'

export type DiscardEffect = {
  type: EffectType.Discard,
  condition: Condition
}

export const discard = (condition: Condition): DiscardEffect => ({ type: EffectType.Discard, condition })