import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const Woodlands: CardInfo = {
  type: CardType.Land,
  populationCost: 4,
  resourcesCost: [Resource.Ingenuity]
}