/** @jsxImportSource @emotion/react */
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isDeleteItemType, MaterialMove } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const PiracyHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<AlongHistoryRules>()!
  const activePlayer = rules.game.rule?.player
  const playerName = usePlayerName(activePlayer)
  const player = usePlayerId()
  const pay = useLegalMove<MaterialMove>(isDeleteItemType(MaterialType.Coin))

  if (player === activePlayer) {
    return <Trans defaults="header.piracy.you">
      <PlayMoveButton move={pay}/>
    </Trans>
  } else {
    return <>{t(`header.piracy`, { player: playerName })}</>
  }
}
