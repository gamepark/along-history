import { EffectType } from './EffectType'

export type SwapEffect = {
  type: EffectType.Swap,
}

export const swapEffect: SwapEffect = { type: EffectType.Swap }