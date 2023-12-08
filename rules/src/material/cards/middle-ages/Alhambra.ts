import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { earnGold } from '../effects/EarnGoldEffect'

export const Alhambra: CardInfo = {
  type: CardType.Wonder,
  populationCost: 7,
  resourcesCost: [Resource.Ingenuity],
  victoryPoints: 3,
  bonus: [Bonus.Culture],
  effects: [earnGold(5)]
}