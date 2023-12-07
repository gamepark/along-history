import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { ownCard } from '../effects/conditions/OwnCardsCondition'
import { warBonus } from '../effects/WarBonusEffect'

export const MacedonianPhalanx: CardInfo = {
  type: CardType.Progress,
  populationCost: 6,
  resourcesCost: [Resource.Ingenuity],
  victoryPoints: 1,
  bonus: [],
  effects: [warBonus(1), warBonus(1, ownCard(Card.AlexanderTheGreat))]
}