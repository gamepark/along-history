import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const Barony: CardInfo = {
  type: CardType.Land,
  populationCost: 4,
  resourcesCost: [Resource.Strength],
  goldCost: 10,
  victoryPoints: 1,
  bonus: [Bonus.Gold1],
  effects: []
}