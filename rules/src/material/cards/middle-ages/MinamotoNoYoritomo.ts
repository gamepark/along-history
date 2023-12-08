import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { ownCard } from '../effects/conditions/OwnCardsCondition'
import { general } from '../effects/GeneralEffect'
import { goldCost } from '../effects/GoldCostEffect'

export const MinamotoNoYoritomo: CardInfo = {
  type: CardType.Figure,
  populationCost: 6,
  resourcesCost: [Resource.Culture],
  goldCost: 12,
  victoryPoints: 2,
  bonus: [Bonus.Population, Bonus.Strength, Bonus.Culture],
  effects: [general, goldCost(7, ownCard(Card.HimejiCastle))]
}