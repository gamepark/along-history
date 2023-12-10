import { CardType } from '../../CardType'
import { ConditionType } from './ConditionType'

export type OwnCardTypeCondition = {
  type: ConditionType.OwnCardType
  cardType: CardType
  quantity: number
}

export const ownCardType = (cardType: CardType, quantity = 1): OwnCardTypeCondition => ({ type: ConditionType.OwnCardType, cardType, quantity })
