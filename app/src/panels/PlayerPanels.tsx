/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { PlayerColor } from '@gamepark/along-history/PlayerColor'
import { PlayerPanel, usePlayers, useRules } from '@gamepark/react-game'
import { PlayerPanelCounter } from './PlayerPanelCounter'

export const PlayerPanels = () => {
  const players = usePlayers<PlayerColor>({ sortFromMe: true })
  const rules = useRules<AlongHistoryRules>()
  return (
    <>
      {players.map((player, index) =>
        <PlayerPanel key={player.id} playerId={player.id} color={playerColorCode[player.id]} css={panelPosition(index, players.length)}>
          <div css={indicators}>
            <PlayerPanelCounter
              width={3}
              icon={faStar}
              value={rules?.getScore(player.id)!}/>
          </div>
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

const indicators = css`
  width: 100%;
  padding: 1em;
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 6em;
  flex-wrap: wrap;
`
