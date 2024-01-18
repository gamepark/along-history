import { Resource } from '../Resource'
import { Bonus } from './Bonus'
import { CardType } from './CardType'
import { Effect } from './effects/Effect'

export type CardInfo = {
  type: CardType
  populationCost: number
  resourcesCost: Resource[]
  goldCost?: number,
  victoryPoints?: number,
  bonus: Bonus[],
  effects: Effect[]
}