import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { defenseBonus } from '../effects/WarBonusEffect'

export const HimejiCastle: CardInfo = {
  type: CardType.Wonder,
  populationCost: 7,
  resourcesCost: [Resource.Ingenuity],
  goldCost: 15,
  victoryPoints: 3,
  bonus: [Bonus.Strength],
  effects: [defenseBonus(1)]
}