/** @jsxImportSource @emotion/react */
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { CustomMoveType } from '@gamepark/along-history/rules/CustomMoveType'
import { PlayMoveButton, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const UseReRollDieHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<AlongHistoryRules>()!
  const legalMoves = useLegalMoves()
  const activePlayer = rules.game.rule?.player
  const playerName = usePlayerName(activePlayer)
  const player = usePlayerId()

  const reroll = legalMoves.find(isCustomMoveType(CustomMoveType.Reroll))

  if (reroll) {
    return <Trans defaults="header.reroll.selection" values={{ dices: rules?.material(MaterialType.Dice).selected().length }}>
      <PlayMoveButton move={reroll}/>
    </Trans>
  } else if (player === activePlayer) {
    return <>{t('header.reroll.you')}</>
  } else {
    return <>{t('header.reroll', { player: playerName })}</>
  }
}
