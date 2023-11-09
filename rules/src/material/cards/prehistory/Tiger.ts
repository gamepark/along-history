import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { ownCard } from '../effects/conditions/OwnCardsCondition'
import { discard } from '../effects/DiscardEffect'
import { populationDiscount } from '../effects/DiscountEffect'
import { losePopulation } from '../effects/LosePopulationEffect'

export const Tiger: CardInfo = {
  type: CardType.Figure,
  populationCost: 4,
  resourcesCost: [Resource.Strength],
  victoryPoints: 2,
  bonus: [],
  effects: [discard(ownCard(Card.TheFire)), losePopulation(), populationDiscount(-2, ownCard(Card.Woodlands))]
}