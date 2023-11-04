import { Condition } from './conditions/Condition'
import { EffectType } from './EffectType'

export type FreeEffect = {
  type: EffectType.Free,
  condition: Condition
}

export const free = (condition: Condition): FreeEffect => ({ type: EffectType.Free, condition })