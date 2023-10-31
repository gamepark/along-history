import { Resource } from '../Resource'
import { CardType } from './CardType'

export type CardInfo = {
  type: CardType
  populationCost?: number
  resourcesCost?: Resource[]
}