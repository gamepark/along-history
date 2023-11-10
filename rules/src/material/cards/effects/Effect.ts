import { DiscardEffect } from './DiscardEffect'
import { DiscountEffect } from './DiscountEffect'
import { FreeEffect } from './FreeEffect'
import { LosePopulationEffect } from './LosePopulationEffect'
import { NonTransmissibleEffect } from './NonTransmissibleEffect'

export type Effect = DiscountEffect | FreeEffect | LosePopulationEffect | DiscardEffect | NonTransmissibleEffect