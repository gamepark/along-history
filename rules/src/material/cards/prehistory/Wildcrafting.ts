import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const Wildcrafting: CardInfo = {
  type: CardType.Progress,
  populationCost: 3,
  resourcesCost: [Resource.Ingenuity],
  victoryPoints: 1
}