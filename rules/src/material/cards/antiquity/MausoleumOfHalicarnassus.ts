import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const MausoleumOfHalicarnassus: CardInfo = {
  type: CardType.Wonder,
  populationCost: 6,
  resourcesCost: [Resource.Ingenuity],
  goldCost: 12,
  victoryPoints: 2,
  bonus: [Bonus.Gold2],
  effects: []
}