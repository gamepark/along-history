import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { ownCard } from '../effects/conditions/OwnCardsCondition'
import { free } from '../effects/FreeEffect'

export const Artillery: CardInfo = {
  type: CardType.Progress,
  populationCost: 7,
  resourcesCost: [Resource.Ingenuity, Resource.Ingenuity],
  victoryPoints: 2,
  bonus: [],
  effects: [free(ownCard(Card.MarcoPolo))] // TODO
}