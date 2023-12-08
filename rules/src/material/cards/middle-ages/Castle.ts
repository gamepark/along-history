import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const Castle: CardInfo = {
  type: CardType.Progress,
  populationCost: 5,
  resourcesCost: [Resource.Ingenuity, Resource.Ingenuity],
  victoryPoints: 2,
  bonus: [Bonus.Strength],
  effects: [] // TODO
}