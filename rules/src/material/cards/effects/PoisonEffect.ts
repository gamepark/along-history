import { EffectType } from './EffectType'

export type PoisonEffect = {
  type: EffectType.Poison,
}

export const poison: PoisonEffect = { type: EffectType.Poison }