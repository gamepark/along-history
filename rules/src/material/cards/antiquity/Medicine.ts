import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { ownCard } from '../effects/conditions/OwnCardsCondition'
import { free } from '../effects/FreeEffect'

export const Medicine: CardInfo = {
  type: CardType.Progress,
  populationCost: 6,
  resourcesCost: [Resource.Culture],
  victoryPoints: 2,
  bonus: [Bonus.Population],
  effects: [free(ownCard(Card.Hippocrates))]
}