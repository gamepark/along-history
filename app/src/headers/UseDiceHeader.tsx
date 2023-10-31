/** @jsxImportSource @emotion/react */
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { CustomMoveType } from '@gamepark/along-history/rules/CustomMoveType'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const UseDiceHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<AlongHistoryRules>()!
  const activePlayer = rules.game.rule?.player
  const playerName = usePlayerName(activePlayer)
  const player = usePlayerId()
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))

  if (player === activePlayer) {
    return <Trans defaults="header.use-dice.you"><PlayMoveButton move={pass}/></Trans>
  } else {
    return <>{t('header.use-dice', { player: playerName })}</>
  }
}
