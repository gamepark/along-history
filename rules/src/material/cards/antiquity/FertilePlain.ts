import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const FertilePlain: CardInfo = {
  type: CardType.Land,
  populationCost: 3,
  resourcesCost: [Resource.Strength],
  goldCost: 6,
  victoryPoints: 1,
  bonus: [Bonus.Population],
  effects: []
}