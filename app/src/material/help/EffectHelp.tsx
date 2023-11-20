/** @jsxImportSource @emotion/react */
import { Condition } from '@gamepark/along-history/material/cards/effects/conditions/Condition'
import { ConditionType } from '@gamepark/along-history/material/cards/effects/conditions/ConditionType'
import { OwnCardsCondition } from '@gamepark/along-history/material/cards/effects/conditions/OwnCardsCondition'
import { Effect } from '@gamepark/along-history/material/cards/effects/Effect'
import { EffectType } from '@gamepark/along-history/material/cards/effects/EffectType'
import { Picture } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import populationIcon from '../../images/dices/population/Population1.jpg'
import { alignIcon, round } from './CardHelp'

export const EffectHelp = ({ effect }: { effect: Effect }) => {
  switch (effect.type) {
    case EffectType.Discount:
      if (effect.population > 0) {
        return <p css={alignIcon}><Trans defaults="effect.discount" values={{ population: effect.population }}>
          <Picture src={populationIcon} css={round}/>
          <ConditionHelp condition={effect.condition}/>
        </Trans></p>
      } else {
        return <p css={alignIcon}><Trans defaults="effect.overcost" values={{ population: effect.population }}>
          <Picture src={populationIcon} css={round}/>
          <ConditionHelp condition={effect.condition}/>
        </Trans></p>
      }
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
      return <></>
  }
}

export const OwnCardCondition = ({ condition }: { condition: OwnCardsCondition }) => {
  const { t } = useTranslation()
  if (condition.cards.length === 1 && condition.quantity === 1) {
    return <span><Trans defaults="condition.own.card" values={{ card: t(`card.name.${condition.cards[0]}`) }}><em/></Trans></span>
  } else if (condition.cards.length === 2 && condition.quantity === 1) {
    return <span><Trans defaults="condition.own.1of2" values={{
      card1: t(`card.name.${condition.cards[0]}`),
      card2: t(`card.name.${condition.cards[1]}`)
    }}><em/></Trans></span>
  } else if (condition.cards.length === 3 && condition.quantity === 2) {
    return <span><Trans defaults="condition.own.2of3" values={{
      card1: t(`card.name.${condition.cards[0]}`),
      card2: t(`card.name.${condition.cards[1]}`),
      card3: t(`card.name.${condition.cards[2]}`)
    }}><em/></Trans></span>
  }
  return <span>???</span>
}
