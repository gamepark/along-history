/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { Card } from '@gamepark/along-history/material/Card'
import { PlayerColor } from '@gamepark/along-history/PlayerColor'
import { CustomMoveType } from '@gamepark/along-history/rules/CustomMoveType'
import { Avatar, buttonCss, Picture, PlayMoveButton, RulesDialog, ThemeButton, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { CustomMove, isCustomMoveType } from '@gamepark/rules-api'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import FigureIcon from '../images/icons/FigureIcon.png'

export const PoisonHeader = () => {
  const rules = useRules<AlongHistoryRules>()!
  const playerId = usePlayerId()
  if (playerId === rules.game.rule!.player) {
    return <PlayerPoisonHeader/>
  } else {
    return <DefaultPoisonHeader player={rules.game.rule!.player!}/>
  }
}

const PlayerPoisonHeader = () => {
  const { t } = useTranslation()
  const legalMoves = useLegalMoves()
  const [warDialogOpen, setDialogOpen] = useState(true)
  return <>
    <Trans defaults="header.poison.you">
      <ThemeButton onClick={() => setDialogOpen(true)}/>
      <Picture src={FigureIcon} css={iconCss}/>
    </Trans>
    <RulesDialog open={warDialogOpen} close={() => setDialogOpen(false)}>
      <div css={dialogCss}>
        <h2>{t(`card.name.${Card.Poison}`)}</h2>
        {legalMoves.filter(isCustomMoveType(CustomMoveType.ChoosePlayer)).map(move => <PoisonButton key={move.data} move={move}/>)}
      </div>
    </RulesDialog>
  </>
}

const PoisonButton = ({ move }: { move: CustomMove }) => {
  const player = usePlayerName(move.data)
  return <PlayMoveButton move={move} css={buttonCss(playerButtonColor[move.data], '', '')}>
    <Trans defaults="poison.button" values={{ player }}>
      <Avatar playerId={move.data} css={avatarCss}/>
    </Trans>
  </PlayMoveButton>
}

const DefaultPoisonHeader = ({ player }: { player: PlayerColor }) => {
  const playerName = usePlayerName(player)
  return <Trans defaults="header.poison" values={{ player: playerName }}>
    <Picture src={FigureIcon} css={iconCss}/>
  </Trans>
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

const avatarCss = css`
  display: inline-block;
  position: relative;
  width: 1em;
  height: 1em;
  top: 0.2em;
  margin: 0 0.2em;
  box-shadow: none;
  transform: scale(1.4);
`

export const playerButtonColor: Record<PlayerColor, string> = {
  [PlayerColor.White]: 'black',
  [PlayerColor.Yellow]: 'darkgoldenrod',
  [PlayerColor.Blue]: 'blue',
  [PlayerColor.Green]: 'green',
  [PlayerColor.Red]: 'red'
}

const iconCss = css`
  height: 1.2em;
  width: 1.2em;
  vertical-align: bottom;
  filter: invert(1);
`