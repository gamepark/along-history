/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { PlayerColor } from '@gamepark/along-history/PlayerColor'
import { PlayerPanel, usePlayers, useRules } from '@gamepark/react-game'
import VictoryPointIcon from '../images/icons/VictoryPointIcon.png'

export const PlayerPanels = () => {
  const players = usePlayers<PlayerColor>({ sortFromMe: true })
  const rules = useRules<AlongHistoryRules>()
  return (
    <>
      {players.map((player, index) =>
        <PlayerPanel key={player.id} playerId={player.id} color={playerColorCode[player.id]} css={panelPosition(index, players.length)}>
          <div css={vpCounter}><span>{rules?.getScore(player.id)!}</span></div>

        </PlayerPanel>
      )}
    </>
  )
}
const panelPosition = (index: number, players: number) => css`
  position: absolute;
  right: 1em;
  top: ${panelTop(index, players)}em;
  width: 28em;
  height: 16em;
`

const panelTop = (index: number, players: number) => {
  if (players === 2) {
    return index === 0 ? 80 : 13
  } else {
    return 9 + index * 18
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

  > span {
    font-size: 3em;
    position: absolute;
    left: 50%;
    top: 42%;
    transform: translate(-50%, -50%);
    font-weight: bold;
  }
`
