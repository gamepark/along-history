import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const Hills: CardInfo = {
  type: CardType.Land,
  populationCost: 4,
  resourcesCost: [Resource.Ingenuity],
  victoryPoints: 1,
  bonus: [Bonus.Ingenuity]
}