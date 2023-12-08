import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { general } from '../effects/GeneralEffect'
import { warBonus } from '../effects/WarBonusEffect'

export const LeCid: CardInfo = {
  type: CardType.Figure,
  populationCost: 6,
  resourcesCost: [Resource.Strength],
  goldCost: 10,
  victoryPoints: 2,
  bonus: [],
  effects: [general, warBonus(1)] // TODO: war capture
}