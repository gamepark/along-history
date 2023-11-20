/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { getCardAge } from '@gamepark/along-history/material/Age'
import { Card } from '@gamepark/along-history/material/Card'
import { Condition } from '@gamepark/along-history/material/cards/effects/conditions/Condition'
import { ConditionType } from '@gamepark/along-history/material/cards/effects/conditions/ConditionType'
import { OwnCardsCondition } from '@gamepark/along-history/material/cards/effects/conditions/OwnCardsCondition'
import { Effect } from '@gamepark/along-history/material/cards/effects/Effect'
import { EffectType } from '@gamepark/along-history/material/cards/effects/EffectType'
import { LosePopulationEffect } from '@gamepark/along-history/material/cards/effects/LosePopulationEffect'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { linkButtonCss, Picture, PlayMoveButton } from '@gamepark/react-game'
import { displayMaterialHelp } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import populationIcon from '../../images/dices/population/Population1.jpg'
import { round } from './CardHelp'

export const EffectHelp = ({ effect, card }: { effect: Effect, card: Card }) => {
  switch (effect.type) {
    case EffectType.Discount:
      if (effect.population > 0) {
        return <Trans defaults="effect.discount" values={{ population: effect.population }}>
          <Picture src={populationIcon} css={round}/>
          <ConditionHelp condition={effect.condition}/>
        </Trans>
      } else {
        return <Trans defaults="effect.overcost" values={{ population: effect.population }}>
          <Picture src={populationIcon} css={round}/>
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
        <Picture src={populationIcon} css={round}/>
      </Trans>
  }
}

export const LosePopulationHelp = ({ effect, card }: { effect: LosePopulationEffect, card: Card }) => {
  const { t } = useTranslation()
  if (effect.condition) {
    return <Trans defaults="effect.lose-pop-if" values={{ card: t(`card.name.${card}`) }}>
      <Picture src={populationIcon} css={round}/>
      <ConditionHelp condition={effect.condition}/>
    </Trans>
  } else {
    return <Trans defaults="effect.lose-pop">
      <Picture src={populationIcon} css={round}/>
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
      <PlayMoveButton css={cardLinkButton} move={displayMaterialHelp(MaterialType.Card, { id: { front: card, back: getCardAge(card) } })}/>
    </Trans></span>
  } else if (condition.cards.length === 2 && condition.quantity === 1) {
    const card1 = condition.cards[0]
    const card2 = condition.cards[1]
    return <span><Trans defaults="condition.own.1of2" values={{
      card1: t(`card.name.${card1}`),
      card2: t(`card.name.${card2}`)
    }}>
      <PlayMoveButton css={cardLinkButton} move={displayMaterialHelp(MaterialType.Card, { id: { front: card1, back: getCardAge(card1) } })}/>
      <PlayMoveButton css={cardLinkButton} move={displayMaterialHelp(MaterialType.Card, { id: { front: card2, back: getCardAge(card2) } })}/>
    </Trans></span>
  } else if (condition.cards.length === 3 && condition.quantity === 2) {
    const card1 = condition.cards[0]
    const card2 = condition.cards[1]
    const card3 = condition.cards[2]
    return <span><Trans defaults="condition.own.2of3" values={{
      card1: t(`card.name.${card1}`),
      card2: t(`card.name.${card2}`),
      card3: t(`card.name.${card3}`)
    }}>
      <PlayMoveButton css={cardLinkButton} move={displayMaterialHelp(MaterialType.Card, { id: { front: card1, back: getCardAge(card1) } })}/>
      <PlayMoveButton css={cardLinkButton} move={displayMaterialHelp(MaterialType.Card, { id: { front: card2, back: getCardAge(card2) } })}/>
      <PlayMoveButton css={cardLinkButton} move={displayMaterialHelp(MaterialType.Card, { id: { front: card3, back: getCardAge(card3) } })}/>
    </Trans></span>
  }
  return <span>???</span>
}

const cardLinkButton = [linkButtonCss, css`
  color: inherit;
  font-style: italic;
`]
