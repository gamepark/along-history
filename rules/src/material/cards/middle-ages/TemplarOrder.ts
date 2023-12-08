import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { warBonus } from '../effects/WarBonusEffect'

export const TemplarOrder: CardInfo = {
  type: CardType.Progress,
  populationCost: 6,
  resourcesCost: [Resource.Culture],
  victoryPoints: 3,
  bonus: [],
  effects: [warBonus(1)] // TODO
}