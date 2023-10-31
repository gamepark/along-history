import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const Stonehenge: CardInfo = {
  type: CardType.Wonder,
  populationCost: 5,
  resourcesCost: [Resource.Ingenuity, Resource.Ingenuity]
}