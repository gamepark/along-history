import { Card } from '../../Card'
import { Effect } from './Effect'
import { EffectType } from './EffectType'

export type CancelEffect = {
  type: EffectType.Cancel
  card: Card
}

export const cancel = (card: Card): CancelEffect => ({ type: EffectType.Cancel, card })

export const isCancelEffect = (effect: Effect): effect is CancelEffect => effect.type === EffectType.Cancel