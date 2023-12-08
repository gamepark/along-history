/** @jsxImportSource @emotion/react */
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { UseGoldResultTokenRule } from '@gamepark/along-history/rules/UseGoldResultTokenRule'
import { PlayMoveButton, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCreateItemType } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const UseGoldResultTokenHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<AlongHistoryRules>()!
  const legalMoves = useLegalMoves()
  const activePlayer = rules.game.rule?.player
  const playerName = usePlayerName(activePlayer)
  const player = usePlayerId()
  const gold = new UseGoldResultTokenRule(rules.game).gold
  const takeGold = legalMoves.find(isCreateItemType(MaterialType.Coin))

  if (player === activePlayer) {
    return <Trans defaults="header.gold.you" values={{ gold }}>
      <PlayMoveButton move={takeGold}/>
    </Trans>
  } else {
    return <>{t('header.gold', { player: playerName, gold })}</>
  }
}
