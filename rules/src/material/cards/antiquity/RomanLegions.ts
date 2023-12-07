import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { ownCard } from '../effects/conditions/OwnCardsCondition'
import { warBonus } from '../effects/WarBonusEffect'

export const RomanLegions: CardInfo = {
  type: CardType.Progress,
  populationCost: 6,
  resourcesCost: [Resource.Ingenuity],
  victoryPoints: 1,
  bonus: [Bonus.Culture],
  effects: [warBonus(1), warBonus(1, ownCard(Card.JuliusCaesar))]
}