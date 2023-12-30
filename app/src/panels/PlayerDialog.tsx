/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { cardTypes } from '@gamepark/along-history/material/cards/CardType'
import { PlayerColor } from '@gamepark/along-history/PlayerColor'
import { Memory } from '@gamepark/along-history/rules/Memory'
import { Avatar, RulesDialog, usePlayerName, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import VictoryPointIcon from '../images/icons/VictoryPointIcon.png'
import { cardTypeIcons } from '../material/help/CardHelp'
import { PlayerDialogIndicator } from './PlayerDialogIndicator'

type PlayerDialogProps = {
  player?: PlayerColor
  close: () => void
  open: boolean
}

export const PlayerDialog: FC<PlayerDialogProps> = ({ close, player }) => {
  const { t } = useTranslation()
  const rules = useRules<AlongHistoryRules>()!
  const name = usePlayerName(player)
  if (player === undefined) return null
  const score = rules.getScore(player)
  const prehistory = rules.remind(Memory.PrehistoryScore, player)
  const antiquity = rules.remind(Memory.AntiquityScore, player)
  const middleAges = rules.remind(Memory.MiddleAgesScore, player)
  const gameOver = rules.isOver()
  const cards = !gameOver && rules.getCivilisationCardsScore(player)
  const achievements = !gameOver && rules.getAchievementsScore(player)
  const decay = !gameOver && -rules.getDecayMalus(player)
  return (
    <RulesDialog open close={close}>
      <div css={container}>
        <div css={header}>
          <Avatar playerId={player} css={avatar}/>
          <h2>{name}</h2>
        </div>
        <div css={content}>
          <PlayerDialogIndicator
            width={2} ratio={112 / 102}
            image={VictoryPointIcon}
            value={t('player.dialog.score', { player: name, score })}/>
          {!!prehistory && <PlayerDialogIndicator
            width={1.4} ratio={112 / 102}
            image={VictoryPointIcon}
            value={t('player.dialog.score.prehistory', { score: prehistory })}
          />}
          {!!antiquity && <PlayerDialogIndicator
            width={1.4} ratio={112 / 102}
            image={VictoryPointIcon}
            value={t('player.dialog.score.antiquity', { score: antiquity })}
          />}
          {!!middleAges && <PlayerDialogIndicator
            width={1.4} ratio={112 / 102}
            image={VictoryPointIcon}
            value={t('player.dialog.score.middle-ages', { score: middleAges })}
          />}
          {!!cards && <PlayerDialogIndicator
            width={1.4} ratio={112 / 102}
            image={VictoryPointIcon}
            value={t('player.dialog.score.cards', { score: cards })}
          />}
          {!!achievements && <PlayerDialogIndicator
            width={1.4} ratio={112 / 102}
            image={VictoryPointIcon}
            value={t('player.dialog.score.achievements', { score: achievements })}
          />}
          {!!decay && <PlayerDialogIndicator
            width={1.4} ratio={112 / 102}
            image={VictoryPointIcon}
            value={t('player.dialog.score.decay', { score: decay })}
            description={t('player.dialog.score.decay.help')}
          />}
          {cardTypes.map(type => {
            const cards = rules.countCardType(player, type)
            if (!cards) return null
            return <PlayerDialogIndicator key={type} width={2} image={cardTypeIcons[type]}
                                          value={t('player.dialog.card-type', { player: name, cards, type: t(`card.type.${type}`) })}
            />
          })}
        </div>
      </div>
    </RulesDialog>
  )
}

const container = css`
  padding: 3em;
  max-width: 90vw;
  max-height: 90vh;
`

const header = css`
  display: flex;
  margin: 0 0.7em 0 0.7em;
  padding-bottom: 1em;
  font-size: 3em;
  border-bottom: 0.1em solid lightgray;

  > h2 {
    margin: 0 0.7em;
    text-align: center;
    line-height: 1.3;
  }
`

const avatar = css`
  position: relative;
  border-radius: 100%;
  height: 3em;
  width: 3em;

  > svg {
    width: 112.3%;
    height: 117%;
  }
`

const content = css`
  margin: 0 0.7em 0 0.7em;
  font-size: 3em;

  > p {
    white-space: break-spaces;
  }
`
