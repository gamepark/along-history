/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { PlayerColor } from '@gamepark/along-history/PlayerColor'
import { PlayerPanel, usePlayers } from '@gamepark/react-game'
import { FC } from 'react'

export const PlayerPanels: FC<any> = () => {
  const players = usePlayers({ sortFromMe: true })
  return (
    <>
      {players.map((player, index) =>
        <PlayerPanel key={player.id} playerId={player.id} color={playerColorCode[player.id]} css={panelPosition(index, players.length)}/>
      )}
    </>
  )
}
const panelPosition = (index: number, players: number) => css`
  position: absolute;
  right: 1em;
  top: ${panelTop(index, players)}em;
  width: 28em;
  height: 14em;
`

const panelTop = (index: number, players: number) => {
  if (players === 2) {
    return index === 0 ? 80 : 13
  } else {
    return 8.5 + index * 16
  }
}

export const playerColorCode: Record<PlayerColor, string> = {
  [PlayerColor.White]: 'white',
  [PlayerColor.Yellow]: 'yellow',
  [PlayerColor.Blue]: 'blue',
  [PlayerColor.Green]: 'green',
  [PlayerColor.Red]: 'red'
}