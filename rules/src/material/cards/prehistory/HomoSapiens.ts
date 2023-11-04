import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { ownOnOfCards } from '../effects/conditions/OwnCardsCondition'
import { populationDiscount } from '../effects/DiscountEffect'

export const HomoSapiens: CardInfo = {
  type: CardType.Figure,
  populationCost: 7,
  resourcesCost: [Resource.Culture],
  victoryPoints: 3,
  bonus: [],
  effects: [populationDiscount(3, ownOnOfCards(Card.CroMagnon, Card.Neanderthal))]
}