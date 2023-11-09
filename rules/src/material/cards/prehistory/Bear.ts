import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { ownCard, ownOnOfCards } from '../effects/conditions/OwnCardsCondition'
import { discard } from '../effects/DiscardEffect'
import { losePopulation } from '../effects/LosePopulationEffect'

export const Bear: CardInfo = {
  type: CardType.Figure,
  populationCost: 4,
  resourcesCost: [Resource.Strength],
  victoryPoints: 1,
  bonus: [],
  effects: [discard(ownCard(Card.TheFire)), losePopulation(ownOnOfCards(Card.Hills, Card.Mountain))]
}