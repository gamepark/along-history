/** @jsxImportSource @emotion/react */
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const DeckHelp = () => {
  const { t } = useTranslation()
  const rules = useRules<AlongHistoryRules>()
  if (!rules) return null
  return <>
    <p>{t('deck.count', { cards: rules.material(MaterialType.Card).location(LocationType.Deck).length })}</p>
    <p>{t('deck.rules')}</p>
  </>
}