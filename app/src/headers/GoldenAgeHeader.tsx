/** @jsxImportSource @emotion/react */
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { PlayMoveButton, useLegalMove, usePlayerName, useRules } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const GoldenAgeHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<AlongHistoryRules>()!
  const activePlayer = rules.game.rule?.player
  const playerName = usePlayerName(activePlayer)
  const move = useLegalMove(move => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.CivilisationArea)

  if (move) {
    return <Trans defaults="header.golden-age.you"><PlayMoveButton move={move}/></Trans>
  } else {
    return <>{t('header.golden-age', { player: playerName })}</>
  }
}
