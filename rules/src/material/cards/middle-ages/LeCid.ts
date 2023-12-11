import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { general } from '../effects/GeneralEffect'
import { turnCoat } from '../effects/TurnCoatEffect'
import { warBonus } from '../effects/WarBonusEffect'

export const LeCid: CardInfo = {
  type: CardType.Figure,
  populationCost: 6,
  resourcesCost: [Resource.Strength],
  goldCost: 10,
  victoryPoints: 2,
  bonus: [Bonus.Population, Bonus.Strength],
  effects: [general, warBonus(1), turnCoat]
}