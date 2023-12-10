import { Card } from '../../Card'
import { ArtilleryEffect } from './ArtilleryEffect'
import { CancelEffect } from './CancelEffect'
import { CardTypeDiscountEffect } from './CardTypeDiscountEffect'
import { Condition } from './conditions/Condition'
import { DestroyEffect } from './DestroyEffect'
import { DiscardEffect } from './DiscardEffect'
import { DiscountEffect } from './DiscountEffect'
import { EarnGoldEffect } from './EarnGoldEffect'
import { EffectType } from './EffectType'
import { FreeEffect } from './FreeEffect'
import { GeneralEffect } from './GeneralEffect'
import { GoldCostEffect } from './GoldCostEffect'
import { LosePopulationEffect } from './LosePopulationEffect'
import { NonTransmissibleEffect } from './NonTransmissibleEffect'
import { RansomEffect } from './RansomEffect'
import { TradeCardEffect } from './TradeCardEffect'
import { WarBonusEffect } from './WarBonusEffect'

export type Effect = DiscountEffect | FreeEffect | LosePopulationEffect | DiscardEffect | NonTransmissibleEffect | WarBonusEffect
  | EarnGoldEffect | GoldCostEffect | CardTypeDiscountEffect | GeneralEffect | DestroyEffect | TradeCardEffect | ArtilleryEffect | RansomEffect
  | CancelEffect

export function isEffectWithCondition(effect: Effect): effect is Effect & { condition: Condition } {
  switch (effect.type) {
    case EffectType.Discount:
    case EffectType.Free:
    case EffectType.Discard:
    case EffectType.GoldCost:
      return true
    case EffectType.LosePopulation:
    case EffectType.WarBonus:
      return effect.condition !== undefined
    default:
      return false
  }
}

export function isCardEffect(effect: Effect): effect is Effect & { card: Card } {
  switch (effect.type) {
    case EffectType.Destroy:
    case EffectType.TradeCard:
    case EffectType.Cancel:
      return true
    default:
      return false
  }
}
