import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const BlackDeath: CardInfo = {
  type: CardType.Calamity,
  populationCost: 5,
  resourcesCost: [Resource.Ingenuity, Resource.Culture],
  victoryPoints: 1,
  bonus: [],
  effects: []
}