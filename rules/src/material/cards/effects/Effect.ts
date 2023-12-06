import { Condition } from './conditions/Condition'
import { DiscardEffect } from './DiscardEffect'
import { DiscountEffect } from './DiscountEffect'
import { EarnGoldEffect } from './EarnGoldEffect'
import { EffectType } from './EffectType'
import { FreeEffect } from './FreeEffect'
import { LosePopulationEffect } from './LosePopulationEffect'
import { NonTransmissibleEffect } from './NonTransmissibleEffect'
import { WarBonusEffect } from './WarBonusEffect'

export type Effect = DiscountEffect | FreeEffect | LosePopulationEffect | DiscardEffect | NonTransmissibleEffect | WarBonusEffect
  | EarnGoldEffect

export function isEffectWithCondition(effect: Effect): effect is Effect & { condition: Condition } {
  switch (effect.type) {
    case EffectType.Discount:
    case EffectType.Free:
    case EffectType.Discard:
      return true
    case EffectType.LosePopulation:
      return effect.condition !== undefined
    default:
      return false
  }
}