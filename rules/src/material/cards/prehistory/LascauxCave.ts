import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { ownCard } from '../effects/conditions/OwnCardsCondition'
import { free } from '../effects/FreeEffect'

export const LascauxCave: CardInfo = {
  type: CardType.Wonder,
  populationCost: 6,
  resourcesCost: [Resource.Culture],
  victoryPoints: 3,
  bonus: [],
  effects: [free(ownCard(Card.CroMagnon))]
}