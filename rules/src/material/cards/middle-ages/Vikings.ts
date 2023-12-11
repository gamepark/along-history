import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const Vikings: CardInfo = {
  type: CardType.Calamity,
  populationCost: 7,
  resourcesCost: [Resource.Strength],
  victoryPoints: 1,
  bonus: [Bonus.Population],
  effects: []
}