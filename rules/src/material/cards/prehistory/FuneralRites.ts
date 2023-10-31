import { Resource } from '../../Resource'
import { CardInfo } from '../CardInfo'
import { CardType } from '../CardType'

export const FuneralRites: CardInfo = {
  type: CardType.Progress,
  populationCost: 5,
  resourcesCost: [Resource.Culture]
}