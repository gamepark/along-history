/** @jsxImportSource @emotion/react */
import { Card } from '@gamepark/along-history/material/Card'
import { Condition } from '@gamepark/along-history/material/cards/effects/conditions/Condition'
import { ConditionType } from '@gamepark/along-history/material/cards/effects/conditions/ConditionType'
import { OwnCardsCondition } from '@gamepark/along-history/material/cards/effects/conditions/OwnCardsCondition'
import { Effect } from '@gamepark/along-history/material/cards/effects/Effect'
import { EffectType } from '@gamepark/along-history/material/cards/effects/EffectType'
import { LosePopulationEffect } from '@gamepark/along-history/material/cards/effects/LosePopulationEffect'
import { RuleId } from '@gamepark/along-history/rules/RuleId'
import { Picture, PlayMoveButton } from '@gamepark/react-game'
import { displayRulesHelp } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import populationIcon from '../../images/dices/population/Population1.jpg'
import { roundCss, rulesLinkButton } from '../../styles'
import { DisplayCardHelpButton } from './LinkHelp'

export const EffectHelp = ({ effect, card }: { effect: Effect, card: Card }) => {
  switch (effect.type) {
    case EffectType.Discount:
      if (effect.population > 0) {
        return <Trans defaults="effect.discount" values={{ population: effect.population }}>
          <Picture src={populationIcon} css={roundCss}/>
          <ConditionHelp condition={effect.condition}/>
        </Trans>
      } else {
        return <Trans defaults="effect.overcost" values={{ population: -effect.population }}>
          <Picture src={populationIcon} css={roundCss}/>
          <ConditionHelp condition={effect.condition}/>
        </Trans>
      }
    case EffectType.Free:
      return <Trans defaults="effect.free"><ConditionHelp condition={effect.condition}/></Trans>
    case EffectType.LosePopulation:
      return <LosePopulationHelp effect={effect} card={card}/>
    case EffectType.Discard:
      return <Trans defaults="effect.discard"><ConditionHelp condition={effect.condition}/></Trans>
    case EffectType.NonTransmissible:
      return <Trans defaults="effect.non-transmissible"><strong/></Trans>
    case EffectType.WarBonus:
      return <Trans defaults="effect.war-bonus">
        <PlayMoveButton css={rulesLinkButton} move={displayRulesHelp(RuleId.Wars)} local/>
        <Picture src={populationIcon} css={roundCss}/>
      </Trans>
  }
}

export const LosePopulationHelp = ({ effect, card }: { effect: LosePopulationEffect, card: Card }) => {
  const { t } = useTranslation()
  if (effect.condition) {
    return <Trans defaults="effect.lose-pop-if" values={{ card: t(`card.name.${card}`) }}>
      <em/>
      <Picture src={populationIcon} css={roundCss}/>
      <ConditionHelp condition={effect.condition}/>
    </Trans>
  } else {
    return <Trans defaults="effect.lose-pop" values={{ card: t(`card.name.${card}`) }}>
      <em/>
      <Picture src={populationIcon} css={roundCss}/>
    </Trans>
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
    const card = condition.cards[0]
    return <span><Trans defaults="condition.own.card" values={{ card: t(`card.name.${card}`) }}>
      <DisplayCardHelpButton card={card}/>
    </Trans></span>
  } else if (condition.cards.length === 2 && condition.quantity === 1) {
    return <span><Trans defaults="condition.own.1of2" values={{
      card1: t(`card.name.${condition.cards[0]}`),
      card2: t(`card.name.${condition.cards[1]}`)
    }}>
      {condition.cards.map(card => <DisplayCardHelpButton key={card} card={card}/>)}
    </Trans></span>
  } else if (condition.cards.length === 3 && condition.quantity === 2) {
    return <span><Trans defaults="condition.own.2of3" values={{
      card1: t(`card.name.${condition.cards[0]}`),
      card2: t(`card.name.${condition.cards[1]}`),
      card3: t(`card.name.${condition.cards[2]}`)
    }}>
      {condition.cards.map(card => <DisplayCardHelpButton key={card} card={card}/>)}
    </Trans></span>
  }
  return <span>???</span>
}
