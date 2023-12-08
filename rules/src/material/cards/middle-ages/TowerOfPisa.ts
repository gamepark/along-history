import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { earnGold } from '../effects/EarnGoldEffect'

export const TowerOfPisa: CardInfo = {
  type: CardType.Wonder,
  populationCost: 6,
  resourcesCost: [Resource.Ingenuity],
  victoryPoints: 3,
  bonus: [],
  effects: [earnGold(5)]
}