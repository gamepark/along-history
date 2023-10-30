/** @jsxImportSource @emotion/react */
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { CustomMoveType } from '@gamepark/along-history/rules/CustomMoveType'
import { PlayMoveButton, useLegalMoves, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const UseReRollDieHeader = () => {
  const rules = useRules<AlongHistoryRules>()
  const legalMoves = useLegalMoves()

  const reroll = legalMoves.find(isCustomMoveType(CustomMoveType.Reroll))

  if (reroll) {
    return <Trans defaults="header.reroll.selection" values={{ dices: rules?.material(MaterialType.Dice).selected().length }}>
      <PlayMoveButton move={reroll}/>
    </Trans>
  }

  return <>Hello world!</>
}
