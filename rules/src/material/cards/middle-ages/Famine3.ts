import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { ownCard } from '../effects/conditions/OwnCardsCondition'
import { discard } from '../effects/DiscardEffect'
import { nonTransmissible } from '../effects/NonTransmissibleEffect'

export const Famine3: CardInfo = {
  type: CardType.Calamity,
  populationCost: 6,
  resourcesCost: [Resource.Ingenuity],
  victoryPoints: 1,
  bonus: [],
  effects: [nonTransmissible, discard(ownCard(Card.Plough))]
}