/** @jsxImportSource @emotion/react */
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { CustomMoveType } from '@gamepark/along-history/rules/CustomMoveType'
import { Memory } from '@gamepark/along-history/rules/Memory'
import { PlayMoveButton, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const GeneralReRollHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<AlongHistoryRules>()!
  const legalMoves = useLegalMoves()
  const activePlayer = rules.game.rule?.player
  const playerName = usePlayerName(activePlayer)
  const player = usePlayerId()

  if (player === activePlayer) {
    const reroll = legalMoves.find(isCustomMoveType(CustomMoveType.Reroll))
    if (reroll) {
      return <Trans defaults="header.reroll.selection" values={{ dices: rules?.material(MaterialType.Dice).selected().length }}>
        <PlayMoveButton move={reroll}/>
      </Trans>
    } else {
      const pass = legalMoves.find(isCustomMoveType(CustomMoveType.Pass))
      return <Trans defaults="header.war.reroll.you" values={{ number: rules?.remind(Memory.GeneralsLeft) }}>
        <PlayMoveButton move={pass}/>
      </Trans>
    }
  } else {
    return <>{t('header.war.reroll', { player: playerName })}</>
  }
}
