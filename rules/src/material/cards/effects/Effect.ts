import { DiscardEffect } from './DiscardEffect'
import { DiscountEffect } from './DiscountEffect'
import { FreeEffect } from './FreeEffect'
import { LosePopulationEffect } from './LosePopulationEffect'
import { NonTransmissibleEffect } from './NonTransmissibleEffect'
import { WarBonusEffect } from './WarBonusEffect'

export type Effect = DiscountEffect | FreeEffect | LosePopulationEffect | DiscardEffect | NonTransmissibleEffect | WarBonusEffect