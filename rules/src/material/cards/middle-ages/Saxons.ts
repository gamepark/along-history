import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { costPerBonus } from '../effects/CostPerBonusEffect'
import { nonTransmissible } from '../effects/NonTransmissibleEffect'

export const Saxons: CardInfo = {
  type: CardType.Calamity,
  populationCost: NaN,
  resourcesCost: [Resource.Strength, Resource.Strength],
  victoryPoints: 1,
  bonus: [],
  effects: [nonTransmissible, costPerBonus]
}