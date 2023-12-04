import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { ownCard } from '../effects/conditions/OwnCardsCondition'
import { free } from '../effects/FreeEffect'

export const HorsebackRiding: CardInfo = {
  type: CardType.Progress,
  populationCost: 4,
  resourcesCost: [Resource.Ingenuity],
  victoryPoints: 2,
  bonus: [],
  effects: [free(ownCard(Card.Steppes))]
}