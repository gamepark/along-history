/** @jsxImportSource @emotion/react */
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { Memory } from '@gamepark/along-history/rules/Memory'
import { UseGoldDieRule } from '@gamepark/along-history/rules/UseGoldDieRule'
import { PlayMoveButton, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCreateItemType } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const UseGoldDieHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<AlongHistoryRules>()!
  const legalMoves = useLegalMoves()
  const activePlayer = rules.game.rule?.player
  const playerName = usePlayerName(activePlayer)
  const player = usePlayerId()
  const gold = new UseGoldDieRule(rules.game).goldAmount
  const takeGold = legalMoves.find(isCreateItemType(MaterialType.Coin))
  const multiplied = rules.remind(Memory.Multiplier) !== undefined

  if (player === activePlayer) {
    return <Trans defaults={multiplied ? 'header.gold.multiplied.you' : 'header.gold.you'} values={{ gold }}>
      <PlayMoveButton move={takeGold}/>
    </Trans>
  } else {
    return <>{t(multiplied ? 'header.gold.multiplied' : 'header.gold', { player: playerName, gold })}</>
  }
}
