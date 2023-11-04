import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const Valley: CardInfo = {
  type: CardType.Land,
  populationCost: 3,
  resourcesCost: [Resource.Ingenuity],
  victoryPoints: 1,
  bonus: [Bonus.Population],
  effects: []
}