import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { cancel } from '../effects/CancelEffect'
import { warBonus } from '../effects/WarBonusEffect'

export const Longbow: CardInfo = {
  type: CardType.Progress,
  populationCost: 6,
  resourcesCost: [Resource.Ingenuity],
  victoryPoints: 2,
  bonus: [],
  effects: [warBonus(1), cancel(Card.Chivalry)]
}