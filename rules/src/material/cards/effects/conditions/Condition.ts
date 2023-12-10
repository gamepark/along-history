import { AndConditions } from './AndConditions'
import { OpponentCondition } from './OpponentCondition'
import { OrConditions } from './OrConditions'
import { OwnCardsCondition } from './OwnCardsCondition'
import { OwnCardTypeCondition } from './OwnCardTypeCondition'

export type Condition = OrConditions | AndConditions | OwnCardsCondition | OwnCardTypeCondition | OpponentCondition