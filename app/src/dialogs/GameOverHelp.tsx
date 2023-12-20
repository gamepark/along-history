/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { getAchievementValue } from '@gamepark/along-history/material/Achievement'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { PlayerColor } from '@gamepark/along-history/PlayerColor'
import { Avatar, MaterialComponent, usePlayerName, useRankedPlayers, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import VictoryPointIcon from '../images/icons/VictoryPointIcon.png'

export const GameOverHelp = () => {
  const { t } = useTranslation()
  const rankedPlayers = useRankedPlayers()
  return (
    <div css={rulesCss}>
      <h2>{t('rules.end')}</h2>
      <p>{t('rules.winner')}</p>
      <ol css={list}>
        {rankedPlayers.map(player =>
          <PlayerResult key={player.id} {...player}/>
        )}
      </ol>
    </div>
  )
}

const PlayerResult = ({ id, rank }: { id: PlayerColor, rank: number }) => {
  const rules = useRules<AlongHistoryRules>()!
  const playerName = usePlayerName(id)
  const tokens = rules.material(MaterialType.AchievementToken).player(id).sort(token => -getAchievementValue(token.id))
  return <li>
    <span css={playerInfo}>{rank}. <Avatar css={avatarCss} playerId={id}/> <span css={nameCss}>{playerName}</span></span>
    <span>
      <span css={vpCounter}><span>{rules.getScore(id)!}</span></span>
      {tokens.getItems().map(item =>
        <MaterialComponent css={inlineToken} type={MaterialType.AchievementToken} itemId={item.id}/>
      )}
    </span>
  </li>
}

const rulesCss = css`
  margin: 1em;
  font-size: 3em;

  > h2 {
    margin-right: 2em;
  }

  > p {
    white-space: break-spaces;
  }
`

const list = css`
  list-style-type: none;
  padding: 0;

  > li {
    margin: 0.5em 0;
  }
`

const playerInfo = css`
  display: inline-block;
  width: 12em;
`

const nameCss = css`
  vertical-align: middle;
  display: inline-block;
  overflow: hidden;
  max-width: 8em;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const avatarCss = css`
  display: inline-block;
  vertical-align: middle;
  position: relative;
  width: 2em;
  height: 2em;
`

const vpCounter = css`
  display: inline-block;
  vertical-align: middle;
  position: relative;
  background-image: url("${VictoryPointIcon}");
  background-size: cover;
  width: 2em;
  height: 1.82em;
  margin-right: 1em;
  transform: translateY(0.2em) scale(1.3);

  > span {
    position: absolute;
    left: 50%;
    top: 42%;
    transform: translate(-50%, -50%);
    font-weight: bold;
  }
`

const inlineToken = css`
  font-size: 0.9em;
  display: inline-block;
  transform: rotateY(180deg);
  margin-left: 0.5em;
  vertical-align: middle;
`