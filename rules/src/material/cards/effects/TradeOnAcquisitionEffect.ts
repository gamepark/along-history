import { Card } from '../../Card'
import { EffectType } from './EffectType'

export type TradeOnAcquisitionEffect = {
  type: EffectType.TradeOnAcquisition
  card: Card
}

export const tradeOnAcquisition = (card: Card): TradeOnAcquisitionEffect => ({ type: EffectType.TradeOnAcquisition, card })