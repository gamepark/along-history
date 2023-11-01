import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const Wildcrafting: CardInfo = {
  type: CardType.Progress,
  populationCost: 3,
  resourcesCost: [Resource.Ingenuity],
  victoryPoints: 1,
  bonus: [Bonus.Population]
}