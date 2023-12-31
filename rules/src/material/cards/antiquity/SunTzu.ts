import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { general } from '../effects/GeneralEffect'
import { goldCost } from '../effects/GoldCostEffect'
import { ownCard } from '../effects/conditions/OwnCardsCondition'

export const SunTzu: CardInfo = {
  type: CardType.Figure,
  populationCost: 6,
  resourcesCost: [Resource.Culture],
  goldCost: 14,
  victoryPoints: 2,
  bonus: [Bonus.Population, Bonus.Strength],
  effects: [general, goldCost(5, ownCard(Card.GreatWallOfChina))]
}