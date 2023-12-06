import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { cardTypeDiscount } from '../effects/CardTypeDiscountEffect'

export const Writing: CardInfo = {
  type: CardType.Progress,
  populationCost: 6,
  resourcesCost: [Resource.Culture],
  victoryPoints: 2,
  bonus: [],
  effects: [cardTypeDiscount(CardType.Progress, 2)]
}