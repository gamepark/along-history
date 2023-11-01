import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const HomoSapiens: CardInfo = {
  type: CardType.Figure,
  populationCost: 7,
  resourcesCost: [Resource.Culture],
  victoryPoints: 3,
  bonus: []
}