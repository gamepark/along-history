import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { ownCard } from '../effects/conditions/OwnCardsCondition'
import { free } from '../effects/FreeEffect'

export const HangingGardensOfBabylon: CardInfo = {
  type: CardType.Wonder,
  populationCost: 7,
  resourcesCost: [Resource.Ingenuity],
  goldCost: 12,
  victoryPoints: 3,
  bonus: [],
  effects: [free(ownCard(Card.NebuchadnezzarII))]
}