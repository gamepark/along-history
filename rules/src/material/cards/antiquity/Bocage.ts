import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const Bocage: CardInfo = {
  type: CardType.Land,
  populationCost: 5,
  resourcesCost: [Resource.Strength],
  victoryPoints: 1,
  bonus: [],
  effects: []
}