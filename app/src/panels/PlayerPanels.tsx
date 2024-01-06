/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { cardTypes } from '@gamepark/along-history/material/cards/CardType'
import { PlayerColor } from '@gamepark/along-history/PlayerColor'
import { Memory } from '@gamepark/along-history/rules/Memory'
import { RuleId } from '@gamepark/along-history/rules/RuleId'
import { Picture, PlayerPanel, usePlay, usePlayers, useRules } from '@gamepark/react-game'
import { displayRulesHelp } from '@gamepark/rules-api'
import { useState } from 'react'
import VictoryPointIcon from '../images/icons/VictoryPointIcon.png'
import WarIconRed from '../images/icons/WarIconRed.png'
import { cardTypeIcons } from '../material/help/CardHelp'
import { PlayerDialog } from './PlayerDialog'

export const PlayerPanels = () => {
  const players = usePlayers<PlayerColor>({ sortFromMe: true })
  const rules = useRules<AlongHistoryRules>()
  const attacker = rules?.remind<PlayerColor>(Memory.Attacker)
  const defender = rules?.remind<PlayerColor>(Memory.Defender)
  const play = usePlay()
  const [playerDialog, setPlayerDialog] = useState<PlayerColor | undefined>()
  return (
    <>
      {players.map((player, index) => {
          const score = rules?.getScore(player.id)
          return <PlayerPanel key={player.id} playerId={player.id} color={playerColorCode[player.id]} css={panelPosition(index, players.length)}
                              onClick={() => setPlayerDialog(player.id)}>
            <div css={vpCounter}><span css={vpText(score)}>{score}</span></div>
            <ol css={cardTypesList}>
              {cardTypes.map(type => {
                const quantity = rules?.countCardType(player.id, type) ?? 0
                return quantity > 0 ? <li key={type}><Picture src={cardTypeIcons[type]} css={typeIcon}/>{quantity}</li> : null
              })}
            </ol>
            {(player.id === attacker || player.id === defender) &&
              <div css={warIcon} onClick={() => play(displayRulesHelp(RuleId.Wars), { local: true })}>
                <span>{rules?.remind(Memory.Strength, player.id)}</span>
              </div>
            }
          </PlayerPanel>
        }
      )}
      <PlayerDialog open={playerDialog !== undefined} player={playerDialog} close={() => setPlayerDialog(undefined)}/>
    </>
  )
}
const panelPosition = (index: number, players: number) => css`
  position: absolute;
  right: 1em;
  top: ${panelTop(index, players)}em;
  width: 28em;
  height: 16em;
  cursor: pointer;
`

const panelTop = (index: number, players: number) => {
  if (players === 2) {
    return index === 0 ? 80 : 15
  } else {
    return 15 + index * (players === 5 ? 17 : 18)
  }
}

export const playerColorCode: Record<PlayerColor, string> = {
  [PlayerColor.White]: 'white',
  [PlayerColor.Yellow]: 'yellow',
  [PlayerColor.Blue]: 'blue',
  [PlayerColor.Green]: 'green',
  [PlayerColor.Red]: 'red'
}

const vpCounter = css`
  position: absolute;
  top: 8em;
  left: 1em;
  background-image: url("${VictoryPointIcon}");
  background-size: cover;
  width: 6em;
  height: 5.46em;
`

const vpText = (score = 0) => css`
  font-size: ${score < 100 ? 3 : 2.4}em;
  position: absolute;
  left: 50%;
  top: 42%;
  transform: translate(-50%, -50%);
  font-weight: bold;
`

const cardTypesList = css`
  position: absolute;
  top: 6em;
  left: 9em;
  display: grid;
  grid-template-columns: auto auto auto;
  list-style-type: none;
  gap: 1em;
  width: 17em;
  padding: 0;

  li {
    white-space: nowrap;
    font-size: 2.5em;
  }
`

const typeIcon = css`
  height: 1.2em;
  vertical-align: bottom;
`

const warIcon = css`
  position: absolute;
  top: 3.6em;
  left: -6.4em;
  height: 9em;
  width: 9em;
  background-image: url("${WarIconRed}");
  background-size: cover;
  cursor: help;

  > span {
    color: white;
    font-size: 3em;
    position: absolute;
    left: 52%;
    top: 52%;
    transform: translate(-50%, -50%);
    font-weight: bold;
  }
`