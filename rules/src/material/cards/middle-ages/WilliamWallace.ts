import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { counterattack } from '../effects/CounterattackEffect'
import { general } from '../effects/GeneralEffect'

export const WilliamWallace: CardInfo = {
  type: CardType.Figure,
  populationCost: 5,
  resourcesCost: [Resource.Culture],
  goldCost: 12,
  victoryPoints: 2,
  bonus: [Bonus.Population, Bonus.Strength],
  effects: [general, counterattack]
}