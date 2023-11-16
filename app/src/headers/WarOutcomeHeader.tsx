/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { Memory } from '@gamepark/along-history/rules/Memory'
import { MaterialComponent, useAnimation, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const WarOutcomeHeader = () => {
  const rules = useRules<AlongHistoryRules>()!
  const attackerId = rules.remind(Memory.Attacker)
  const defenderId = rules.remind(Memory.Defender)
  const attacker = usePlayerName(attackerId)
  const defender = usePlayerName(defenderId)
  const animation = useAnimation(animation => isMoveItemType(MaterialType.AchievementToken)(animation.move))
  const player = usePlayerId()

  if (!animation || !isMoveItemType(MaterialType.AchievementToken)(animation.move)) return null

  return <Trans defaults={player === attackerId ? 'header.war.win' : player === defenderId ? 'header.war.lose' : 'header.war.outcome'}
                values={{ attacker, defender }}>
    <MaterialComponent type={MaterialType.AchievementToken} itemId={rules.material(MaterialType.AchievementToken).getItem(animation.move.itemIndex)!.id}
                       css={inlineToken}/>
  </Trans>
}

const inlineToken = css`
  display: inline-block;
  font-size: 0.5em;
  vertical-align: bottom;
  transform: rotateY(180deg);
`