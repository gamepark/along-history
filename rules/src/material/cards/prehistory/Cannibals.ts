import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const Cannibals: CardInfo = {
  type: CardType.Calamity,
  populationCost: 6,
  resourcesCost: [Resource.Strength],
  victoryPoints: 1,
  bonus: []
}