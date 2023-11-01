import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const Australopithecus: CardInfo = {
  type: CardType.Figure,
  populationCost: 3,
  resourcesCost: [Resource.Culture],
  victoryPoints: 1,
  bonus: []
}