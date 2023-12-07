import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { defenseBonus } from '../effects/WarBonusEffect'

export const GreatWallOfChina: CardInfo = {
  type: CardType.Wonder,
  populationCost: 9,
  resourcesCost: [Resource.Ingenuity],
  victoryPoints: 3,
  bonus: [],
  effects: [defenseBonus(2)]
}