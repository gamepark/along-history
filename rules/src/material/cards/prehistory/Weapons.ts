import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const Weapons: CardInfo = {
  type: CardType.Progress,
  populationCost: 6,
  resourcesCost: [Resource.Ingenuity],
  victoryPoints: 2
}