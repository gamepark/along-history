import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { ownCard } from '../effects/conditions/OwnCardsCondition'
import { earnGold } from '../effects/EarnGoldEffect'
import { free } from '../effects/FreeEffect'
import { warBonus } from '../effects/WarBonusEffect'

export const HorsebackRiding: CardInfo = {
  type: CardType.Progress,
  populationCost: 4,
  resourcesCost: [Resource.Ingenuity],
  victoryPoints: 2,
  bonus: [],
  effects: [earnGold(2), free(ownCard(Card.Steppes)), warBonus(1)]
}