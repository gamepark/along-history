import { AndConditions } from './AndConditions'
import { OrConditions } from './OrConditions'
import { OwnCardsCondition } from './OwnCardsCondition'

export type Condition = OrConditions | AndConditions | OwnCardsCondition