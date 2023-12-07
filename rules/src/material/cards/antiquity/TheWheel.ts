import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { earnGold } from '../effects/EarnGoldEffect'
import { warBonus } from '../effects/WarBonusEffect'

export const TheWheel: CardInfo = {
  type: CardType.Progress,
  populationCost: 6,
  resourcesCost: [Resource.Ingenuity],
  victoryPoints: 1,
  bonus: [],
  effects: [earnGold(2), warBonus(1)]
}