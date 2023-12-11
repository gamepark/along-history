import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { robinHood } from '../effects/RobinHoodEffect'

export const RobinHood: CardInfo = {
  type: CardType.Figure,
  populationCost: 4,
  resourcesCost: [Resource.Culture],
  victoryPoints: 2,
  bonus: [Bonus.Gold1],
  effects: [robinHood]
}