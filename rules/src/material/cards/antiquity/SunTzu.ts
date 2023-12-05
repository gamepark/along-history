import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const SunTzu: CardInfo = {
  type: CardType.Figure,
  populationCost: 6,
  resourcesCost: [Resource.Culture],
  goldCost: 14,
  victoryPoints: 2,
  bonus: [Bonus.Population, Bonus.Strength],
  effects: []
}