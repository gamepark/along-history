import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { nonTransmissible } from '../effects/NonTransmissibleEffect'

export const SpartacusUprising: CardInfo = {
  type: CardType.Calamity,
  populationCost: 7,
  resourcesCost: [Resource.Strength],
  victoryPoints: 1,
  bonus: [],
  effects: [nonTransmissible]
}