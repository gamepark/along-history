import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const Steppes: CardInfo = {
  type: CardType.Land,
  populationCost: 4,
  resourcesCost: [Resource.Strength],
  victoryPoints: 1,
  bonus: [],
  effects: []
}