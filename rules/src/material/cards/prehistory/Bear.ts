import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const Bear: CardInfo = {
  type: CardType.Figure,
  populationCost: 4,
  resourcesCost: [Resource.Strength]
}