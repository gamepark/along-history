import { Card } from '../../Card'
import { EffectType } from './EffectType'

export type SeizeEffect = {
  type: EffectType.Seize
  card: Card
}

export const seize = (card: Card): SeizeEffect => ({ type: EffectType.Seize, card })