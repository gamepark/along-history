import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const AlluvialPlain: CardInfo = {
  type: CardType.Land,
  populationCost: 3,
  resourcesCost: [Resource.Strength],
  victoryPoints: 1,
  bonus: [Bonus.Population],
  effects: []
}