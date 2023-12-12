/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { AgesCards, getCardAge } from '@gamepark/along-history/material/Age'
import { Card } from '@gamepark/along-history/material/Card'
import { CardsInfo } from '@gamepark/along-history/material/cards/CardsInfo'
import { Condition } from '@gamepark/along-history/material/cards/effects/conditions/Condition'
import { ConditionType } from '@gamepark/along-history/material/cards/effects/conditions/ConditionType'
import { Effect, isCardEffect, isEffectWithCondition } from '@gamepark/along-history/material/cards/effects/Effect'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { PlayMoveButton } from '@gamepark/react-game'
import { displayMaterialHelp } from '@gamepark/rules-api'
import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { rulesLinkButton } from '../../styles'

export const LinkHelp = ({ card }: { card: Card }) => {
  const { t } = useTranslation()
  const links = useMemo(() => AgesCards[getCardAge(card)].filter(otherCard =>
    CardsInfo[otherCard].effects.some(effect => isEffectAboutCard(effect, card))
    || (card === Card.Avicenna && (otherCard === Card.BlackDeath || otherCard === Card.Cholera))
    || (card === Card.Charlemagne && otherCard === Card.Saxons)
  ), [card])
  if (!links.length) return null
  return <>
    <p>{t('card.links')}</p>
    <ul>
      {links.map(linkedCard => <li key={linkedCard}>
        <DisplayCardHelpButton card={linkedCard}>
          {t(`card.name.${linkedCard}`)}
        </DisplayCardHelpButton>
      </li>)}
    </ul>
  </>
}

export const DisplayCardHelpButton: FC<{ card: Card }> = ({ card, children }) => {
  return <PlayMoveButton css={cardLinkButton} move={displayMaterialHelp(MaterialType.Card, { id: { front: card, back: getCardAge(card) } })} local>
    {children}
  </PlayMoveButton>
}

const cardLinkButton = [rulesLinkButton, css`
  font-style: italic;
`]

function isEffectAboutCard(effect: Effect, card: Card): boolean {
  return (isEffectWithCondition(effect) && isConditionAboutCard(effect.condition, card))
    || (isCardEffect(effect) && effect.card === card)
}

function isConditionAboutCard(condition: Condition, card: Card): boolean {
  switch (condition.type) {
    case ConditionType.And:
    case ConditionType.Or:
      return condition.conditions.some(condition => isConditionAboutCard(condition, card))
    case ConditionType.Opponent:
      return isConditionAboutCard(condition.condition, card)
    case ConditionType.OwnCards:
      return condition.cards.includes(card)
    default:
      return false
  }
}
