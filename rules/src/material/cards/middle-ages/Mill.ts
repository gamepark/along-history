import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { earnGold } from '../effects/EarnGoldEffect'

export const Mill: CardInfo = {
  type: CardType.Progress,
  populationCost: 5,
  resourcesCost: [Resource.Ingenuity],
  victoryPoints: 2,
  bonus: [Bonus.Gold2, Bonus.Population], // TODO: gain gold when tilted for population?
  effects: [earnGold(4)]
}