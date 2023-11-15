/** @jsxImportSource @emotion/react */
import { AlongHistoryOptionsSpec } from '@gamepark/along-history/AlongHistoryOptions'
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { AlongHistorySetup } from '@gamepark/along-history/AlongHistorySetup'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { AlongHistoryAnimations } from './animations/AlongHistoryAnimations'
import App from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import translations from './translations.json'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider game="along-history" Rules={AlongHistoryRules} optionsSpec={AlongHistoryOptionsSpec} GameSetup={AlongHistorySetup}
                  material={Material} locators={Locators} animations={new AlongHistoryAnimations()}>
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
