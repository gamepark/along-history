/** @jsxImportSource @emotion/react */
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { CustomMoveType } from '@gamepark/along-history/rules/CustomMoveType'
import { Memory } from '@gamepark/along-history/rules/Memory'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const PrepareArmyHeader = () => {
  const rules = useRules<AlongHistoryRules>()!
  const activePlayer = rules.game.rule!.player!
  const player = usePlayerId()
  if (player === activePlayer) {
    return <PrepareYourArmyHeader/>
  } else {
    return <PlayerPreparesArmyHeader/>
  }
}

const PrepareYourArmyHeader = () => {
  const rules = useRules<AlongHistoryRules>()!
  const playerId = usePlayerId()
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  return <Trans defaults="header.war.prepare" values={{ bonus: rules.remind(Memory.Strength, playerId) }}>
    <span/>
    <PlayMoveButton move={pass}/>
  </Trans>
}

const PlayerPreparesArmyHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<AlongHistoryRules>()!
  const activePlayer = rules.game.rule!.player!
  const playerId = usePlayerId()
  const attackerId = rules.remind(Memory.Attacker)
  const defenderId = rules.remind(Memory.Defender)
  const attacker = usePlayerName(attackerId)
  const defender = usePlayerName(defenderId)
  if (defenderId === activePlayer) {
    const strength = rules.remind(Memory.Strength, attackerId)
    return <>{t('header.war.defense', { defender, strength })}</>
  } else if (defender === playerId) {
    return <>{t('header.war.attacked', { attacker })}</>
  } else {
    return <>{t('header.war', { attacker, defender })}</>
  }
}
