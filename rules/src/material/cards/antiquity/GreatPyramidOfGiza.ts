import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const GreatPyramidOfGiza: CardInfo = {
  type: CardType.Wonder,
  populationCost: 5,
  resourcesCost: [Resource.Ingenuity, Resource.Ingenuity],
  goldCost: 10,
  victoryPoints: 4,
  bonus: [],
  effects: []
}