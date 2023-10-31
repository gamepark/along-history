import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const Tools: CardInfo = {
  type: CardType.Progress,
  populationCost: 5,
  resourcesCost: [Resource.Ingenuity]
}