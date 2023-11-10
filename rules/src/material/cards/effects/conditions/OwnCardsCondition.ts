import { Card } from '../../../Card'
import { ConditionType } from './ConditionType'

export type OwnCardsCondition = {
  type: ConditionType.OwnCards
  cards: Card[]
  quantity: number
}

export const ownCard = (card: Card): OwnCardsCondition => ({ type: ConditionType.OwnCards, cards: [card], quantity: 1 })
export const ownOneOfCards = (...cards: Card[]): OwnCardsCondition => ({ type: ConditionType.OwnCards, cards, quantity: 1 })
export const ownTwoOfCards = (...cards: Card[]): OwnCardsCondition => ({ type: ConditionType.OwnCards, cards, quantity: 2 })