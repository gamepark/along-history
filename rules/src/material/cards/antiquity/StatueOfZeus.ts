import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const StatueOfZeus: CardInfo = {
  type: CardType.Wonder,
  populationCost: 6,
  resourcesCost: [Resource.Ingenuity],
  goldCost: 12,
  victoryPoints: 3,
  bonus: [],
  effects: []
}