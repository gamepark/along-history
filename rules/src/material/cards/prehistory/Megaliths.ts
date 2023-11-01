import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const Megaliths: CardInfo = {
  type: CardType.Wonder,
  populationCost: 6,
  resourcesCost: [Resource.Ingenuity],
  victoryPoints: 3
}