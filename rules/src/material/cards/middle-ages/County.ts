import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const County: CardInfo = {
  type: CardType.Land,
  populationCost: 5,
  resourcesCost: [Resource.Strength],
  goldCost: 12,
  victoryPoints: 1,
  bonus: [Bonus.Ingenuity],
  effects: []
}