/** @jsxImportSource @emotion/react */
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { RollDiceRule } from '@gamepark/along-history/rules/RollDiceRule'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const RollDiceHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<AlongHistoryRules>()!
  const activePlayer = new RollDiceRule(rules.game).activePlayer
  const playerName = usePlayerName(activePlayer)
  const player = usePlayerId()

  if (player === activePlayer) {
    return <>{t('header.roll.you')}</>
  } else {
    return <>{t('header.roll', { player: playerName })}</>
  }
}
