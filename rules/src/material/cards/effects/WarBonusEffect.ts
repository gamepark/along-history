import { Condition } from './conditions/Condition'
import { EffectType } from './EffectType'

export type WarBonusEffect = {
  type: EffectType.WarBonus,
  condition?: Condition
}

export const warBonus = (condition?: Condition): WarBonusEffect => ({ type: EffectType.WarBonus, condition })