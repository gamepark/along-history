import { EffectType } from './EffectType'

export type GeneralEffect = {
  type: EffectType.General,
}

export const general: GeneralEffect = { type: EffectType.General }