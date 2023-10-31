import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const Valley: CardInfo = {
  type: CardType.Land,
  populationCost: 3,
  resourcesCost: [Resource.Ingenuity]
}