import { Card } from '../../../Card'
import { ConditionType } from './ConditionType'
import { or, OrConditions } from './OrConditions'

export type OwnCardsCondition = {
  type: ConditionType.OwnCards
  cards: Card[]
  quantity: number
}

export const ownCard = (card: Card): OwnCardsCondition => ({type: ConditionType.OwnCards, cards: [card], quantity: 1})
export const ownOnOfCards = (...cards: Card[]): OrConditions => or(cards.map(ownCard))