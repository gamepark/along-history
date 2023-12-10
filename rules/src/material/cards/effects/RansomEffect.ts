import { EffectType } from './EffectType'

export type RansomEffect = {
  type: EffectType.Ransom
}

export const ransom: RansomEffect = { type: EffectType.Ransom }