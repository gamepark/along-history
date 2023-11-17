/** @jsxImportSource @emotion/react */
import { Condition } from '@gamepark/along-history/material/cards/effects/conditions/Condition'
import { ConditionType } from '@gamepark/along-history/material/cards/effects/conditions/ConditionType'
import { OwnCardsCondition } from '@gamepark/along-history/material/cards/effects/conditions/OwnCardsCondition'
import { Effect } from '@gamepark/along-history/material/cards/effects/Effect'
import { EffectType } from '@gamepark/along-history/material/cards/effects/EffectType'
import { Trans, useTranslation } from 'react-i18next'

export const EffectHelp = ({ effect }: { effect: Effect }) => {
  switch (effect.type) {
    case EffectType.Free:
      return <p><Trans defaults="effect.free"><ConditionHelp condition={effect.condition}/></Trans></p>
    case EffectType.NonTransmissible:
      return <p><Trans defaults="effect.non-transmissible"><strong/></Trans></p>
    default:
      return <p></p> // TODO
  }
}

export const ConditionHelp = ({ condition }: { condition: Condition }) => {
  switch (condition.type) {
    case ConditionType.OwnCards:
      return <OwnCardCondition condition={condition}/>
    default:
      return <span></span> // TODO
  }
}

export const OwnCardCondition = ({ condition }: { condition: OwnCardsCondition }) => {
  const { t } = useTranslation()
  if (condition.cards.length === 1 && condition.quantity === 1) {
    return <span><Trans defaults="condition.own-card" values={{ card: t(`card.name.${condition.cards[0]}`) }}><em/></Trans></span>
  }
  return <span></span> // TODO
}