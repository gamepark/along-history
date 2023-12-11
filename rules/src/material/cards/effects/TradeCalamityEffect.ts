import { Card } from '../../Card'
import { EffectType } from './EffectType'

export type TradeCalamityEffect = {
  type: EffectType.TradeCalamity
  card: Card
}

export const tradeCalamity = (card: Card): TradeCalamityEffect => ({ type: EffectType.TradeCalamity, card })