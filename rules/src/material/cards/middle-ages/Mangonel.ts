import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { opponent } from '../effects/conditions/OpponentCondition'
import { or } from '../effects/conditions/OrConditions'
import { ownOneOfCards } from '../effects/conditions/OwnCardsCondition'
import { ownCardType } from '../effects/conditions/OwnCardTypeCondition'
import { attackBonus } from '../effects/WarBonusEffect'

export const Mangonel: CardInfo = {
  type: CardType.Progress,
  populationCost: 5,
  resourcesCost: [Resource.Ingenuity],
  victoryPoints: 2,
  bonus: [],
  effects: [attackBonus(1, opponent(or(ownCardType(CardType.Land), ownOneOfCards(Card.Camelot, Card.Jerusalem))))]
}