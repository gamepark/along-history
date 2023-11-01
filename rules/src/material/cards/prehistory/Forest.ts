import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const Forest: CardInfo = {
  type: CardType.Land,
  populationCost: 5,
  resourcesCost: [Resource.Ingenuity],
  victoryPoints: 1
}