import { Condition } from './conditions/Condition'
import { EffectType } from './EffectType'

export type WarBonusEffect = {
  type: EffectType.WarBonus,
  bonus: number,
  condition?: Condition
  multiplier?: Condition
  defenseOnly?: boolean
  attackOnly?: boolean
}

export const warBonus = (bonus: number, condition?: Condition): WarBonusEffect => ({ type: EffectType.WarBonus, bonus, condition })

export const defenseBonus = (bonus: number, condition?: Condition): WarBonusEffect => ({ type: EffectType.WarBonus, bonus, condition, defenseOnly: true })

export const attackBonus = (bonus: number, condition?: Condition): WarBonusEffect => ({ type: EffectType.WarBonus, bonus, condition, attackOnly: true })

export const warBonusMultiplier = (bonus: number, multiplier?: Condition): WarBonusEffect => ({ type: EffectType.WarBonus, bonus, multiplier })

export const defenseBonusMultiplier = (bonus: number, multiplier?: Condition): WarBonusEffect => (
  { type: EffectType.WarBonus, bonus, multiplier, defenseOnly: true }
)