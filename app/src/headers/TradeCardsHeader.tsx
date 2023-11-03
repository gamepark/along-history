/** @jsxImportSource @emotion/react */
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const TradeCardsHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<AlongHistoryRules>()!
  const activePlayer = rules.game.rule?.player
  const playerName = usePlayerName(activePlayer)
  const player = usePlayerId()

  if (player === activePlayer) {
    if (!rules.material(MaterialType.Card).selected(true).length) {
      return <>{t('header.trade.you')}</>
    } else {
      return <>{t('header.trade.card2')}</>
    }
  } else {
    return <>{t('header.trade', { player: playerName })}</>
  }
}
