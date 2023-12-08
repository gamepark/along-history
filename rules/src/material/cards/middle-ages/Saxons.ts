import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { nonTransmissible } from '../effects/NonTransmissibleEffect'

export const Saxons: CardInfo = {
  type: CardType.Calamity,
  populationCost: NaN, // TODO
  resourcesCost: [Resource.Strength, Resource.Strength],
  victoryPoints: 1,
  bonus: [],
  effects: [nonTransmissible]
}