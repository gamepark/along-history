/** @jsxImportSource @emotion/react */
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { PlayerColor } from '@gamepark/along-history/PlayerColor'
import { CustomMoveType } from '@gamepark/along-history/rules/CustomMoveType'
import { Memory } from '@gamepark/along-history/rules/Memory'
import { PlayMoveButton, RulesDialog, ThemeButton, useLegalMove, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'

export const WarsHeader = () => {
  const rules = useRules<AlongHistoryRules>()!
  const playerId = usePlayerId()
  if (playerId === rules.game.rule!.player) {
    return <PlayerWarsHeader/>
  } else {
    return <DefaultWarsHeader player={rules.game.rule!.player!}/>
  }
}

const PlayerWarsHeader = () => useRules<AlongHistoryRules>()!.remind(Memory.Wars) ? <PlayerDeclareWarHeader/> : <PlayerPayWarHeader/>

const PlayerDeclareWarHeader = () => {
  const rules = useRules<AlongHistoryRules>()!
  return rules.players.length === 2 ? <PlayerDeclareWarDuelHeader/> : <PlayerDeclareWarDialogHeader/>
}

const PlayerDeclareWarDuelHeader = () => {
  const legalMoves = useLegalMoves()
  const pass = legalMoves.find(isCustomMoveType(CustomMoveType.Pass))
  const declareWar = legalMoves.find(isCustomMoveType(CustomMoveType.ChoosePlayer))
  const player = usePlayerName(declareWar?.data)
  return <>
    <Trans defaults="header.wars.duel" values={{ player }}>
      <PlayMoveButton move={declareWar}/>
      <PlayMoveButton move={pass}/>
    </Trans>
  </>
}

const PlayerDeclareWarDialogHeader = () => {
  const { t } = useTranslation()
  const legalMoves = useLegalMoves()
  const pass = legalMoves.find(isCustomMoveType(CustomMoveType.Pass))
  const [warDialogOpen, setWarDialogOpen] = useState(false)
  return <>
    <Trans defaults="header.wars.you">
      <ThemeButton onClick={() => setWarDialogOpen(true)}/>
      <PlayMoveButton move={pass}/>
    </Trans>
    <RulesDialog open={warDialogOpen} close={() => setWarDialogOpen(false)}>
      <h2>{t('war.title')}</h2>
      {/*TODO: choix du joueur à qui déclarer la guerre*/}
    </RulesDialog>
  </>
}

const PlayerPayWarHeader = () => {
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  return <Trans defaults="header.wars.pay"><PlayMoveButton move={pass}/></Trans>
}

const DefaultWarsHeader = ({ player }: { player: PlayerColor }) => {
  const { t } = useTranslation()
  const playerName = usePlayerName(player)
  return <>{t('header.wars', { player: playerName })}</>
}