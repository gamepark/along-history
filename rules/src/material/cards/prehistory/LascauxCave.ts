import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const LascauxCave: CardInfo = {
  type: CardType.Wonder,
  populationCost: 6,
  resourcesCost: [Resource.Culture],
  victoryPoints: 3,
  bonus: []
}