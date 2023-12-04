import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const Agriculture: CardInfo = {
  type: CardType.Progress,
  populationCost: 4,
  resourcesCost: [Resource.Ingenuity, Resource.Ingenuity],
  victoryPoints: 2,
  bonus: [Bonus.Population, Bonus.Population],
  effects: []
}