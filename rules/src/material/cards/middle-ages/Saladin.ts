import { Card } from '../../Card'
import { Resource } from '../../Resource'
import { Bonus } from '../Bonus'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { general } from '../effects/GeneralEffect'
import { seize } from '../effects/SeizeEffect'

export const Saladin: CardInfo = {
  type: CardType.Figure,
  populationCost: 5,
  resourcesCost: [Resource.Culture],
  victoryPoints: 2,
  bonus: [Bonus.Population, Bonus.Strength],
  effects: [general, seize(Card.Jerusalem)]
}