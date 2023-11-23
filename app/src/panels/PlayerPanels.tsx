/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { CardType, cardTypes } from '@gamepark/along-history/material/cards/CardType'
import { PlayerColor } from '@gamepark/along-history/PlayerColor'
import { Picture, PlayerPanel, usePlayers, useRules } from '@gamepark/react-game'
import CalamityIcon from '../images/icons/CalamityIcon.png'
import FigureIcon from '../images/icons/FigureIcon.png'
import LandIcon from '../images/icons/LandIcon.png'
import ProgressIcon from '../images/icons/ProgressIcon.png'
import VictoryPointIcon from '../images/icons/VictoryPointIcon.png'
import WonderIcon from '../images/icons/WonderIcon.png'

export const PlayerPanels = () => {
  const players = usePlayers<PlayerColor>({ sortFromMe: true })
  const rules = useRules<AlongHistoryRules>()
  return (
    <>
      {players.map((player, index) =>
        <PlayerPanel key={player.id} playerId={player.id} color={playerColorCode[player.id]} css={panelPosition(index, players.length)}>
          <div css={vpCounter}><span>{rules?.getScore(player.id)!}</span></div>
          <ol css={cardTypesList}>
            {cardTypes.map(type => {
              const quantity = rules?.countCardType(player.id, type) ?? 0
              return quantity > 0 ? <li key={type}><Picture src={cardTypeIcons[type]} css={typeIcon}/>{quantity}</li> : null
            })}
          </ol>
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

const cardTypeIcons: Record<CardType, string> = {
  [CardType.Land]: LandIcon,
  [CardType.Progress]: ProgressIcon,
  [CardType.Figure]: FigureIcon,
  [CardType.Wonder]: WonderIcon,
  [CardType.Calamity]: CalamityIcon
}

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