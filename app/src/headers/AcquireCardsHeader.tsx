/** @jsxImportSource @emotion/react */
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { CustomMoveType } from '@gamepark/along-history/rules/CustomMoveType'
import { PlayMoveButton, useLegalMoves, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const AcquireCardsHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<AlongHistoryRules>()!
  const legalMoves = useLegalMoves()
  const pass = legalMoves.find(isCustomMoveType(CustomMoveType.Pass))
  const player = usePlayerName(rules.game.rule!.player)

  switch (legalMoves.length) {
    case 0:
      return <>{t('header.acquire', { player })}</>
    case 1:
      return <Trans defaults="header.acquire.pass"><PlayMoveButton move={pass}/></Trans>
    default:
      return <Trans defaults="header.acquire.you"><PlayMoveButton move={pass}/></Trans>
  }
}
