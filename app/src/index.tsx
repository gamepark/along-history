/** @jsxImportSource @emotion/react */
import { AlongHistoryOptionsSpec } from '@gamepark/along-history/AlongHistoryOptions'
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { AlongHistorySetup } from '@gamepark/along-history/AlongHistorySetup'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { AlongHistoryAnimations } from './animations/AlongHistoryAnimations'
import App from './App'
import background from './images/background/avalon.jpg'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import translations from './translations.json'
import { Tutorial } from './tutorial/Tutorial'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider game="along-history" Rules={AlongHistoryRules} optionsSpec={AlongHistoryOptionsSpec} GameSetup={AlongHistorySetup}
                  material={Material} locators={Locators} animations={new AlongHistoryAnimations()} tutorial={new Tutorial()}
                  theme={{
                    root: {
                      background: {
                        image: background,
                        overlay: 'rgba(0, 0, 0, 0.8)'
                      }
                    },
                    dialog: {
                      color: '#6C502B',
                      backgroundColor: '#FCF8EF'
                    }
                  }}>
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
