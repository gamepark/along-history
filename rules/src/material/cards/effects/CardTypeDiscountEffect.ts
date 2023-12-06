import { CardType } from '../CardType'
import { EffectType } from './EffectType'

export type CardTypeDiscountEffect = {
  type: EffectType.CardTypeDiscount,
  cardType: CardType
  discount: number
}

export const cardTypeDiscount = (cardType: CardType, discount: number): CardTypeDiscountEffect => ({ type: EffectType.CardTypeDiscount, cardType, discount })