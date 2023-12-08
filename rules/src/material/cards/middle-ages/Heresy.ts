import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { destroy } from '../effects/DestroyEffect'
import { nonTransmissible } from '../effects/NonTransmissibleEffect'

export const Heresy: CardInfo = {
  type: CardType.Calamity,
  populationCost: 6,
  resourcesCost: [Resource.Culture],
  victoryPoints: 1,
  bonus: [],
  effects: [nonTransmissible, destroy(Card.JoanOfArc)]
}