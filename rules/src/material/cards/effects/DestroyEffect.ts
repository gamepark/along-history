import { Card } from '../../Card'
import { EffectType } from './EffectType'

export type DestroyEffect = {
  type: EffectType.Destroy
  card: Card
}

export const destroy = (card: Card): DestroyEffect => ({ type: EffectType.Destroy, card })