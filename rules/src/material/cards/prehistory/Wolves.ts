import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { ownCard } from '../effects/conditions/OwnCardsCondition'
import { discard } from '../effects/DiscardEffect'
import { populationDiscount } from '../effects/DiscountEffect'

export const Wolves: CardInfo = {
  type: CardType.Calamity,
  populationCost: 4,
  resourcesCost: [Resource.Strength],
  victoryPoints: 1,
  bonus: [],
  effects: [discard(ownCard(Card.TheFire)), populationDiscount(-3, ownCard(Card.Forest))]
}