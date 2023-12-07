import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { general } from '../effects/GeneralEffect'
import { warBonus } from '../effects/WarBonusEffect'

export const JuliusCaesar: CardInfo = {
  type: CardType.Figure,
  populationCost: 5,
  resourcesCost: [Resource.Culture],
  goldCost: 14,
  victoryPoints: 2,
  bonus: [Bonus.Population, Bonus.Strength],
  effects: [general, warBonus(1)]
}