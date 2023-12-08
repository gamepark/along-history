import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const NotreDame: CardInfo = {
  type: CardType.Wonder,
  populationCost: 8,
  resourcesCost: [Resource.Ingenuity],
  goldCost: 15,
  victoryPoints: 3,
  bonus: [Bonus.Culture],
  effects: []
}