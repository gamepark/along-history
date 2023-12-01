/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { CustomMoveType } from '@gamepark/along-history/rules/CustomMoveType'
import { Memory } from '@gamepark/along-history/rules/Memory'
import { PlayMoveButton, RulesDialog, ThemeButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { useState } from 'react'
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
  return <>
    <Trans defaults="header.war.prepare" values={{ bonus: rules.remind(Memory.Strength, playerId) }}>
      <span/>
      <PlayMoveButton move={pass}/>
    </Trans>
    {rules.remind(Memory.Defender) === playerId && <AttackedInfoDialog/>}
  </>
}

const AttackedInfoDialog = () => {
  const { t } = useTranslation()
  const rules = useRules<AlongHistoryRules>()!
  const [open, setOpen] = useState(true)
  const attacker = rules.remind(Memory.Attacker)
  const player = usePlayerName(attacker)
  const strength = rules.remind(Memory.Strength, attacker)
  return <RulesDialog open={open} close={() => setOpen(false)}>
    <div css={dialogCss}>
      <h2>{t('attacked')}</h2>
      <p><Trans defaults="attacked.detail" values={{ player, strength }}><strong/></Trans></p>
      <p><ThemeButton onClick={() => setOpen(false)}>{t('OK')}</ThemeButton></p>
    </div>
  </RulesDialog>
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

const dialogCss = css`
  max-width: 40em;
  margin: 1em 2em;
  font-size: 3em;

  > h2 {
    margin-right: 2em;
  }

  > button {
    display: block;
    margin: 1em 0;
  }
`