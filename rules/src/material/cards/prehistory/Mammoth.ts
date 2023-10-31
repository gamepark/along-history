import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const Mammoth: CardInfo = {
  type: CardType.Figure,
  populationCost: 6,
  resourcesCost: [Resource.Strength]
}