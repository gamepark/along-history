import { AlongHistoryOptionsSpec } from '@gamepark/along-history/AlongHistoryOptions'
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { AlongHistorySetup } from '@gamepark/along-history/AlongHistorySetup'
import { GameProvider } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { alongHistoryAnimations } from './animations/AlongHistoryAnimations'
import App from './App'
import { RulesHelp } from './dialogs/RulesHelp'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import { theme } from './theme'
import { Tutorial } from './tutorial/Tutorial'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider game="along-history" Rules={AlongHistoryRules} optionsSpec={AlongHistoryOptionsSpec} GameSetup={AlongHistorySetup}
                  material={Material} locators={Locators} animations={alongHistoryAnimations} tutorial={new Tutorial()}
                  rulesHelp={RulesHelp} theme={theme}>
      <App/>
    </GameProvider>
  </StrictMode>
)
