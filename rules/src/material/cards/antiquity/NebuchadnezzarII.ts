import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { goldCost } from '../effects/GoldCostEffect'
import { ownCard } from '../effects/conditions/OwnCardsCondition'

export const NebuchadnezzarII: CardInfo = {
  type: CardType.Figure,
  populationCost: 5,
  resourcesCost: [Resource.Culture],
  goldCost: 12,
  victoryPoints: 2,
  bonus: [Bonus.Ingenuity],
  effects: [goldCost(5, ownCard(Card.HangingGardensOfBabylon))]
}