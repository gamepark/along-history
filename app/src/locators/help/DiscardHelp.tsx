/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { MaterialComponent, pointerCursorCss, usePlay, useRules } from '@gamepark/react-game'
import { displayMaterialHelp } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'

export const DiscardHelp = () => {
  const { t } = useTranslation()
  const rules = useRules<AlongHistoryRules>()
  const play = usePlay()
  if (!rules) return null
  const cards = rules.material(MaterialType.Card).location(LocationType.Discard).sort(item => -item.location.x!)
  return <>
    <h2>{t('discard-pile')}</h2>
    <ol css={grid}>
      {cards?.entries.map(([index, card]) =>
        <li key={index}>
          <MaterialComponent type={MaterialType.Card} itemId={card.id} css={pointerCursorCss}
                             onClick={() => play(displayMaterialHelp(MaterialType.Card, card, index), { local: true })}/>
        </li>
      )}
    </ol>
  </>
}

const grid = css`
  display: grid;
  grid-template-columns: auto auto auto;
  list-style-type: none;
  gap: 1em;
  padding: 0 0.5em 0.5em 0;
  margin: 1em 0 0;
  font-size: 1.5em;
`
