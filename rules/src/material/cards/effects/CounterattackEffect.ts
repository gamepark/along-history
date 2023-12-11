import { EffectType } from './EffectType'

export type CounterattackEffect = {
  type: EffectType.Counterattack,
}

export const counterattack: CounterattackEffect = { type: EffectType.Counterattack }