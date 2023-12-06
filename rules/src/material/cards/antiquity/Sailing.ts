import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { ownOneOfCards } from '../effects/conditions/OwnCardsCondition'
import { earnGold } from '../effects/EarnGoldEffect'
import { free } from '../effects/FreeEffect'

export const Sailing: CardInfo = {
  type: CardType.Progress,
  populationCost: 7,
  resourcesCost: [Resource.Ingenuity],
  victoryPoints: 2,
  bonus: [],
  effects: [earnGold(2), free(ownOneOfCards(Card.Astronomy, Card.LighthouseOfAlexandria))]
}