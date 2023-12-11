import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { tradeCalamity } from '../effects/TradeCalamityEffect'
import { defenseBonus } from '../effects/WarBonusEffect'

export const GreatWallOfChina: CardInfo = {
  type: CardType.Wonder,
  populationCost: 9,
  resourcesCost: [Resource.Ingenuity],
  victoryPoints: 3,
  bonus: [],
  effects: [tradeCalamity(Card.BarbarianInvasions), defenseBonus(2)]
}