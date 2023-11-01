import { Resource } from '../Resource'
import { Bonus } from './Bonus'
import { CardType } from './CardType'

export type CardInfo = {
  type: CardType
  populationCost: number
  resourcesCost: Resource[]
  victoryPoints: number,
  bonus: Bonus[]
}