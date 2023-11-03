/** @jsxImportSource @emotion/react */
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const RollDiceHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<AlongHistoryRules>()!
  const playerName = usePlayerName(rules.game.rule?.player)
  const player = usePlayerId()

  if (player === rules.game.rule?.player) {
    return <>{t('header.roll.you')}</>
  } else {
    return <>{t('header.roll', { player: playerName })}</>
  }
}
