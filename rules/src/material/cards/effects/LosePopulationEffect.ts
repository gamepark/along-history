import { Condition } from './conditions/Condition'
import { EffectType } from './EffectType'

export type LosePopulationEffect = {
  type: EffectType.LosePopulation
  condition?: Condition
}

export const losePopulation = (condition?: Condition): LosePopulationEffect => ({ type: EffectType.LosePopulation, condition })
