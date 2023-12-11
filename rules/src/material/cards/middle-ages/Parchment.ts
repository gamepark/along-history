import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'
import { swapEffect } from '../effects/SwapEffect'

export const Parchment: CardInfo = {
  type: CardType.Progress,
  populationCost: 5,
  resourcesCost: [Resource.Ingenuity, Resource.Culture],
  victoryPoints: 1,
  bonus: [],
  effects: [swapEffect]
}