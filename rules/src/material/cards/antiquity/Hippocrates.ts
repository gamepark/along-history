import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const Hippocrates: CardInfo = {
  type: CardType.Figure,
  populationCost: 5,
  resourcesCost: [Resource.Culture],
  goldCost: 10,
  victoryPoints: 2,
  bonus: [Bonus.Population],
  effects: []
}