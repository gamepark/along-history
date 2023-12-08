import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { ownOneOfCards } from '../effects/conditions/OwnCardsCondition'
import { defenseBonus } from '../effects/WarBonusEffect'

export const Crossbow: CardInfo = {
  type: CardType.Progress,
  populationCost: 6,
  resourcesCost: [Resource.Ingenuity],
  victoryPoints: 2,
  bonus: [],
  effects: [defenseBonus(1, ownOneOfCards(Card.Camelot, Card.Castle, Card.Jerusalem))]
}