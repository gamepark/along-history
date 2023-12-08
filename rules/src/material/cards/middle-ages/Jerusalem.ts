import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { ownOneOfCards } from '../effects/conditions/OwnCardsCondition'
import { free } from '../effects/FreeEffect'

export const Jerusalem: CardInfo = {
  type: CardType.Land,
  populationCost: 7,
  resourcesCost: [Resource.Ingenuity],
  goldCost: 12,
  victoryPoints: 3,
  bonus: [Bonus.Culture],
  effects: [free(ownOneOfCards(Card.TheCrusades, Card.TemplarOrder))]
}