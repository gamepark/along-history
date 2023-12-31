import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { general } from '../effects/GeneralEffect'
import { goldCost } from '../effects/GoldCostEffect'
import { ownCard } from '../effects/conditions/OwnCardsCondition'

export const Pericles: CardInfo = {
  type: CardType.Figure,
  populationCost: 5,
  resourcesCost: [Resource.Culture],
  goldCost: 12,
  victoryPoints: 2,
  bonus: [Bonus.Culture],
  effects: [general, goldCost(5, ownCard(Card.StatueOfZeus))]
}