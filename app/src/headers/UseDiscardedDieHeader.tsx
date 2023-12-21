/** @jsxImportSource @emotion/react */
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const UseDiscardedDieHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<AlongHistoryRules>()!
  const activePlayer = rules.game.rule?.player
  const playerName = usePlayerName(activePlayer)
  const player = usePlayerId()
  const canReroll = rules.material(MaterialType.Dice).player(activePlayer).length > 0

  if (player === activePlayer) {
    return <>{t(canReroll ? 'header.use-die.you' : 'header.trade.you')}</>
  } else {
    return <>{t(canReroll ? 'header.use-die' : 'header.trade', { player: playerName })}</>
  }
}
