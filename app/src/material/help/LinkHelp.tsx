/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { AgesCards, getCardAge } from '@gamepark/along-history/material/Age'
import { Card } from '@gamepark/along-history/material/Card'
import { CardsInfo } from '@gamepark/along-history/material/cards/CardsInfo'
import { ConditionType } from '@gamepark/along-history/material/cards/effects/conditions/ConditionType'
import { isEffectWithCondition } from '@gamepark/along-history/material/cards/effects/Effect'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { linkButtonCss, PlayMoveButton } from '@gamepark/react-game'
import { displayMaterialHelp } from '@gamepark/rules-api'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export const LinkHelp = ({ card }: { card: Card }) => {
  const { t } = useTranslation()
  const links = useMemo(() => AgesCards[getCardAge(card)].filter(otherCard =>
    CardsInfo[otherCard].effects.some(effect =>
      isEffectWithCondition(effect) && effect.condition.type === ConditionType.OwnCards && effect.condition.cards.includes(card)
    )
  ), [card])
  if (!links.length) return null
  return <>
    <p>{t('card.links')}</p>
    <ul>
      {links.map(linkedCard => <li key={linkedCard}>
        <PlayMoveButton css={cardLinkButton}
                        move={displayMaterialHelp(MaterialType.Card, { id: { front: linkedCard, back: getCardAge(linkedCard) } })}>
          {t(`card.name.${linkedCard}`)}
        </PlayMoveButton>
      </li>)}
    </ul>
  </>
}

const cardLinkButton = [linkButtonCss, css`
  color: inherit;
  font-style: italic;
`]
