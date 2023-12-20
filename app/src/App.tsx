/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react'
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { Age } from '@gamepark/along-history/material/Age'
import { Memory } from '@gamepark/along-history/rules/Memory'
import { FailuresDialog, FullscreenDialog, LoadingScreen, MaterialHeader, Menu, useRules } from '@gamepark/react-game'
import { useEffect, useState } from 'react'
import { GameOverHelp } from './dialogs/GameOverHelp'
import GameDisplay from './GameDisplay'
import { Headers } from './headers/Headers'
import AntiquityBackground from './images/background/AntiquityBackground.jpg'
import MiddleAgesBackground from './images/background/MiddleAgesBackground.jpg'
import PrehistoryBackground from './images/background/PrehistoryBackground.jpg'

export default function App() {
  const rules = useRules<AlongHistoryRules>()
  const [isJustDisplayed, setJustDisplayed] = useState(true)
  useEffect(() => {
    setTimeout(() => setJustDisplayed(false), 2000)
  }, [])
  const loading = !rules || isJustDisplayed
  return (
    <>
      {rules && <GameDisplay players={rules.players.length}/>}
      <LoadingScreen display={loading} author="François Bachelart" artist="Antonio Mainez" graphicDesigner="Julie Gruet"
                     publisher="Nostromo Éditions" developer="Game Park"/>
      <MaterialHeader rulesStepsHeaders={Headers} loading={loading} GameOverRule={GameOverHelp}/>
      <Menu/>
      <FailuresDialog/>
      <FullscreenDialog/>
      <Global styles={rootBackground(rules?.remind(Memory.CurrentAge))}/>
    </>
  )
}

const rootBackground = (age = Age.Prehistory) => css`
  #root {
    background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${backgroundImage[age]}) center / cover, black;
  }
`

const backgroundImage: Record<Age, string> = {
  [Age.Prehistory]: PrehistoryBackground,
  [Age.Antiquity]: AntiquityBackground,
  [Age.MiddleAges]: MiddleAgesBackground
}
