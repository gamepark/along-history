import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { ownCard } from '../effects/conditions/OwnCardsCondition'
import { discard } from '../effects/DiscardEffect'

export const Poison: CardInfo = {
  type: CardType.Calamity,
  populationCost: 6,
  resourcesCost: [Resource.Ingenuity, Resource.Strength],
  victoryPoints: 1,
  bonus: [],
  effects: [discard(ownCard(Card.Avicenna))] // TODO: target player destroy figure
}