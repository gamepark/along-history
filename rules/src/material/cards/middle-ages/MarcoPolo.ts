import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { ownCard } from '../effects/conditions/OwnCardsCondition'
import { goldCost } from '../effects/GoldCostEffect'

export const MarcoPolo: CardInfo = {
  type: CardType.Figure,
  populationCost: 5,
  resourcesCost: [Resource.Culture],
  goldCost: 12,
  victoryPoints: 2,
  bonus: [Bonus.Gold2],
  effects: [goldCost(7, ownCard(Card.Compass))]
}