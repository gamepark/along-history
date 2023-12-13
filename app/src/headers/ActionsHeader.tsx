/** @jsxImportSource @emotion/react */
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { DiceType } from '@gamepark/along-history/material/Dices'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { ActionsRule } from '@gamepark/along-history/rules/ActionsRule'
import { CustomMoveType } from '@gamepark/along-history/rules/CustomMoveType'
import { PlayMoveButton, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType, MaterialMove } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const ActionsHeader = () => {
  const rules = useRules<AlongHistoryRules>()!
  const activePlayer = rules.game.rule?.player
  const player = usePlayerId()
  if (player === activePlayer) {
    return <MyActionsHeader/>
  } else {
    return <OtherPlayerActionsHeader/>
  }
}

const MyActionsHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<AlongHistoryRules>()!
  const activePlayer = rules.game.rule?.player
  const legalMoves = useLegalMoves<MaterialMove>()
  const pass = legalMoves.find(isCustomMoveType(CustomMoveType.Pass))
  const isActivePlayerTurn = rules.material(MaterialType.DiscardTile).getItem()?.location.player === activePlayer
  const canGainGold = new ActionsRule(rules.game).tiltGoldBonusCards.length > 0
    || legalMoves.some(isMoveItemType(MaterialType.ResultToken)) || rules.material(MaterialType.Dice).player(activePlayer).id(DiceType.Gold).length > 0
  const confirmation = canGainGold ? { text: t('confirm.miss.gold') } : undefined
  console.log(canGainGold)
  if (isActivePlayerTurn) {
    return <Trans defaults="header.actions.you"><PlayMoveButton move={pass} confirmation={confirmation}/></Trans>
  } else {
    return <Trans defaults="header.actions.other.you"><PlayMoveButton move={pass} confirmation={confirmation}/></Trans>
  }
}

const OtherPlayerActionsHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<AlongHistoryRules>()!
  const activePlayer = rules.game.rule?.player
  const playerName = usePlayerName(activePlayer)
  const isActivePlayerTurn = rules.material(MaterialType.DiscardTile).getItem()?.location.player === activePlayer
  if (isActivePlayerTurn) {
    return <>{t('header.actions', { player: playerName })}</>
  } else {
    return <>{t('header.actions.other', { player: playerName })}</>
  }
}
