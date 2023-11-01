import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const Earthquake: CardInfo = {
  type: CardType.Calamity,
  populationCost: 6,
  resourcesCost: [Resource.Ingenuity, Resource.Ingenuity],
  victoryPoints: 1,
  bonus: []
}