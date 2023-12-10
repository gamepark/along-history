import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { ownCardType } from '../effects/conditions/OwnCardTypeCondition'
import { warBonusMultiplier } from '../effects/WarBonusEffect'

export const Chivalry: CardInfo = {
  type: CardType.Progress,
  populationCost: 8,
  resourcesCost: [Resource.Culture],
  victoryPoints: 3,
  bonus: [Bonus.Culture],
  effects: [warBonusMultiplier(1, ownCardType(CardType.Land, 2))]
}