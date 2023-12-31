import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { ownOneOfCards } from '../effects/conditions/OwnCardsCondition'
import { populationDiscount } from '../effects/DiscountEffect'

export const Neanderthal: CardInfo = {
  type: CardType.Figure,
  populationCost: 6,
  resourcesCost: [Resource.Culture],
  victoryPoints: 2,
  bonus: [],
  effects: [populationDiscount(3, ownOneOfCards(Card.Australopithecus, Card.HomoErectus))]
}