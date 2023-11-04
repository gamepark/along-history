import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { losePopulation } from '../effects/LosePopulationEffect'

export const Tiger: CardInfo = {
  type: CardType.Figure,
  populationCost: 4,
  resourcesCost: [Resource.Strength],
  victoryPoints: 2,
  bonus: [],
  effects: [losePopulation()]
}