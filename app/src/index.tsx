/** @jsxImportSource @emotion/react */
import { GameOptionsSpec } from '@gamepark/along-history/AlongHistoryOptions'
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { AlongHistorySetup } from '@gamepark/along-history/AlongHistorySetup'
import { GameProvider, MaterialGameAnimations, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import translations from './translations.json'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider game="along-history" Rules={AlongHistoryRules} optionsSpec={GameOptionsSpec} GameSetup={AlongHistorySetup}
                  material={Material} locators={Locators} animations={new MaterialGameAnimations()}>
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
