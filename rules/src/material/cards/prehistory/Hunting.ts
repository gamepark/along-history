import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const Hunting: CardInfo = {
  type: CardType.Progress,
  populationCost: 4,
  resourcesCost: [Resource.Ingenuity],
  victoryPoints: 2,
  bonus: [Bonus.Population]
}