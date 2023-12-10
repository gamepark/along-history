import { CardType } from '../../CardType'
import { ConditionType } from './ConditionType'

export type OwnCardTypeCondition = {
  type: ConditionType.OwnCardType
  cardType: CardType
}

export const ownCardType = (cardType: CardType): OwnCardTypeCondition => ({ type: ConditionType.OwnCardType, cardType })
