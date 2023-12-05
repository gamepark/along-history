import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const WildIsland: CardInfo = {
  type: CardType.Land,
  populationCost: 6,
  resourcesCost: [Resource.Strength],
  goldCost: 6,
  victoryPoints: 1,
  bonus: [Bonus.Population],
  effects: []
}