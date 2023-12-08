import { Card } from '../../Card'
import { EffectType } from './EffectType'

export type TradeCardEffect = {
  type: EffectType.TradeCard
  card: Card
}

export const tradeCard = (card: Card): TradeCardEffect => ({ type: EffectType.TradeCard, card })