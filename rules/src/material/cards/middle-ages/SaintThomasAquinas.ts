import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const SaintThomasAquinas: CardInfo = {
  type: CardType.Figure,
  populationCost: 5,
  resourcesCost: [Resource.Culture],
  goldCost: 10,
  victoryPoints: 2,
  bonus: [Bonus.Culture],
  effects: [] // TODO
}