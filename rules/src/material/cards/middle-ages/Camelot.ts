import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { ownCard } from '../effects/conditions/OwnCardsCondition'
import { free } from '../effects/FreeEffect'

export const Camelot: CardInfo = {
  type: CardType.Wonder,
  populationCost: 7,
  resourcesCost: [Resource.Ingenuity, Resource.Ingenuity],
  victoryPoints: 1,
  bonus: [Bonus.Strength],
  effects: [free(ownCard(Card.KingArthur))]
}