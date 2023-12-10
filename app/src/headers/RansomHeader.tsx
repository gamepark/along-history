/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { Picture, PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isMoveItemType, MaterialMove } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import Gold from '../images/tokens/coins/Coin5Head.png'

export const RansomHeader = () => {
  const rules = useRules<AlongHistoryRules>()!
  const playerId = usePlayerId()
  const ransomedPlayers = rules.game.rule!.players!
  const ransomer = rules.game.rule!.player!
  const playerName = usePlayerName(ransomer)

  if (ransomer === playerId) {
    return <Trans defaults="header.ransom.to-you">
      <Picture src={Gold} css={iconCss}/>
    </Trans>
  } else if (ransomedPlayers.includes(playerId)) {
    return <RansomedHeader player={playerName}/>
  } else {
    return <Trans defaults="header.ransom" values={{ player: playerName }}>
      <Picture src={Gold} css={iconCss}/>
    </Trans>
  }
}

const RansomedHeader = ({ player }: { player: string }) => {
  const giveGold = useLegalMove<MaterialMove>(isMoveItemType(MaterialType.Coin))
  return <Trans defaults="header.ransom.you" values={{ player }}>
    <PlayMoveButton move={giveGold}/>
  </Trans>
}

const iconCss = css`
  height: 1.2em;
  width: 1.2em;
  vertical-align: bottom;
  border-radius: 50%;
`
