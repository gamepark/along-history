/** @jsxImportSource @emotion/react */
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { Card } from '@gamepark/along-history/material/Card'
import { CustomMoveType } from '@gamepark/along-history/rules/CustomMoveType'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType, isStartRule } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const CounterattackHeader = () => {
  const rules = useRules<AlongHistoryRules>()!
  const activePlayer = rules.game.rule!.player!
  const player = usePlayerId()
  if (player === activePlayer) {
    return <CounterattackChoiceHeader/>
  } else {
    return <CounterattackPlayerHeader/>
  }
}

const CounterattackChoiceHeader = () => {
  const { t } = useTranslation()
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  const counterattack = useLegalMove(isStartRule)
  return <Trans defaults="header.counterattack.you" values={{ card: t(`card.name.${Card.WilliamWallace}`) }}>
    <PlayMoveButton move={counterattack}/>
    <PlayMoveButton move={pass}/>
  </Trans>
}

const CounterattackPlayerHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<AlongHistoryRules>()!
  const player = usePlayerName(rules.game.rule!.player!)
  return <>{t('header.counterattack', { card: t(`card.name.${Card.WilliamWallace}`), player })}</>
}
