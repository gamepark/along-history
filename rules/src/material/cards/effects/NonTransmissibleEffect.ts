import { EffectType } from './EffectType'

export type NonTransmissibleEffect = {
  type: EffectType.NonTransmissible,
}

export const nonTransmissible: NonTransmissibleEffect = { type: EffectType.NonTransmissible }