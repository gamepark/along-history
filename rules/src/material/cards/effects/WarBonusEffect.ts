import { Condition } from './conditions/Condition'
import { EffectType } from './EffectType'

export type WarBonusEffect = {
  type: EffectType.WarBonus,
  bonus: number,
  condition?: Condition
  defenseOnly?: boolean
  attackOnly?: boolean
}

export const warBonus = (bonus: number, condition?: Condition): WarBonusEffect => ({ type: EffectType.WarBonus, bonus, condition })

export const defenseBonus = (bonus: number, condition?: Condition): WarBonusEffect => ({ type: EffectType.WarBonus, bonus, condition, defenseOnly: true })