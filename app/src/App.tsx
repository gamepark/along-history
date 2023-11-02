/** @jsxImportSource @emotion/react */
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { RuleId } from '@gamepark/along-history/rules/RuleId'
import { FailuresDialog, FullscreenDialog, LoadingScreen, MaterialHeader, Menu, useGame } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { useEffect, useState } from 'react'
import GameDisplay from './GameDisplay'
import { AcquireCardsHeader } from './headers/AcquireCardsHeader'
import { PayCardHeader } from './headers/PayCardHeader'
import { RollDiceHeader } from './headers/RollDiceHeader'
import { TradeCardsHeader } from './headers/TradeCardsHeader'
import { ActionsHeader } from './headers/ActionsHeader'
import { UseDiscardedDieHeader } from './headers/UseDiscardedDieHeader'
import { UseReRollDieHeader } from './headers/UseReRollDieHeader'

export default function App() {
  const game = useGame<MaterialGame>()
  const [isJustDisplayed, setJustDisplayed] = useState(true)
  useEffect(() => {
    setTimeout(() => setJustDisplayed(false), 2000)
  }, [])
  const loading = !game || isJustDisplayed
  return (
    <>
      <GameDisplay/>
      <LoadingScreen display={loading} author="François Bachelart" artist={['Antonio Mainez', 'Julie Gruet']} publisher="Nostromo Éditions"
                     developer="Game Park"/>
      <MaterialHeader rulesStepsHeaders={RulesHeaders} loading={loading}/>
      <Menu/>
      <FailuresDialog/>
      <FullscreenDialog/>
    </>
  )
}

const RulesHeaders: Partial<Record<RuleId, () => ReactJSXElement>> = {
  [RuleId.RollDice]: RollDiceHeader,
  [RuleId.Actions]: ActionsHeader,
  [RuleId.UseDiscardedDie]: UseDiscardedDieHeader,
  [RuleId.UseReRollDie]: UseReRollDieHeader,
  [RuleId.TradeCards]: TradeCardsHeader,
  [RuleId.PayCard]: PayCardHeader,
  [RuleId.AcquireCards]: AcquireCardsHeader
}