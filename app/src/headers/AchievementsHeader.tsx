/** @jsxImportSource @emotion/react */
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isStartRule } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const AchievementsHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<AlongHistoryRules>()!
  const playerId = usePlayerId()
  const pass = useLegalMove(isStartRule)
  const playerName = usePlayerName(rules.game.rule?.player)

  if (rules.game.rule?.player === playerId) {
    return <Trans defaults="header.achievements.you"><PlayMoveButton move={pass}/></Trans>
  } else {
    return <>{t('header.achievements', { player: playerName })}</>
  }
}
