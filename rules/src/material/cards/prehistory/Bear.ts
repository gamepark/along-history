import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { ownOnOfCards } from '../effects/conditions/OwnCardsCondition'
import { losePopulation } from '../effects/LosePopulationEffect'

export const Bear: CardInfo = {
  type: CardType.Figure,
  populationCost: 4,
  resourcesCost: [Resource.Strength],
  victoryPoints: 1,
  bonus: [],
  effects: [losePopulation(ownOnOfCards(Card.Hills, Card.Mountain))]
}