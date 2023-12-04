import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { nonTransmissible } from '../effects/NonTransmissibleEffect'

export const BarbarianInvasions: CardInfo = {
  type: CardType.Calamity,
  populationCost: 5,
  resourcesCost: [Resource.Strength, Resource.Strength],
  victoryPoints: 2,
  bonus: [],
  effects: [nonTransmissible]
}