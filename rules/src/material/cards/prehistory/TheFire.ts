import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { ownCard } from '../effects/conditions/OwnCardsCondition'
import { free } from '../effects/FreeEffect'

export const TheFire: CardInfo = {
  type: CardType.Progress,
  populationCost: 5,
  resourcesCost: [Resource.Ingenuity, Resource.Ingenuity],
  victoryPoints: 3,
  bonus: [Bonus.Population, Bonus.Population],
  effects: [free(ownCard(Card.HomoErectus))]
}