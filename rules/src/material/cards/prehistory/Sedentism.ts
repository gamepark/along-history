import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { ownCard } from '../effects/conditions/OwnCardsCondition'
import { free } from '../effects/FreeEffect'

export const Sedentism: CardInfo = {
  type: CardType.Progress,
  populationCost: 5,
  resourcesCost: [Resource.Ingenuity],
  victoryPoints: 2,
  bonus: [Bonus.Population],
  effects: [free(ownCard(Card.HomoSapiens))]
}