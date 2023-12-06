import { EffectType } from './EffectType'

export type EarnGoldEffect = {
  type: EffectType.EarnGold,
  amount: number
}

export const earnGold = (amount: number): EarnGoldEffect => ({ type: EffectType.EarnGold, amount })