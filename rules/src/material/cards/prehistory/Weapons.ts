import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { warBonus } from '../effects/WarBonusEffect'

export const Weapons: CardInfo = {
  type: CardType.Progress,
  populationCost: 6,
  resourcesCost: [Resource.Ingenuity],
  victoryPoints: 2,
  bonus: [Bonus.Population, Bonus.Strength],
  effects: [warBonus()]
}