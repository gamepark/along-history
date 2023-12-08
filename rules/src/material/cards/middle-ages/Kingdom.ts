import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const Kingdom: CardInfo = {
  type: CardType.Land,
  populationCost: 8,
  resourcesCost: [Resource.Strength],
  goldCost: 14,
  victoryPoints: 1,
  bonus: [Bonus.Population, Bonus.Population],
  effects: []
}