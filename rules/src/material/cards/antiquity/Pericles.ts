import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const Pericles: CardInfo = {
  type: CardType.Figure,
  populationCost: 5,
  resourcesCost: [Resource.Culture],
  goldCost: 12,
  victoryPoints: 2,
  bonus: [Bonus.Culture],
  effects: []
}