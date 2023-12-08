import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const Chivalry: CardInfo = {
  type: CardType.Progress,
  populationCost: 8,
  resourcesCost: [Resource.Culture],
  victoryPoints: 3,
  bonus: [Bonus.Culture],
  effects: [] // TODO
}