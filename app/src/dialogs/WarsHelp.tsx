/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Picture } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import Multiplier from '../images/dices/special/Multiplier.jpg'
import War from '../images/dices/special/War.jpg'
import WarIcon from '../images/icons/WarIcon.png'

export function WarsHelp() {
  const { t } = useTranslation()
  return <>
    <h2>{t('war.rules.title')}</h2>
    <p>
      <Trans defaults="war.rules.1">
        <strong/><em/>
      </Trans>
    </p>
    <p>
      <Trans defaults="war.rules.2">
        <strong/><em/>
        <Picture src={WarIcon} css={iconCss}/>
        <Picture src={Multiplier} css={diceFaceCss}/>
        <Picture src={War} css={diceFaceCss}/>
      </Trans>
    </p>
    <p>
      <Trans defaults="war.rules.3">
        <strong/><em/>
      </Trans>
    </p>
  </>
}

const iconCss = css`
  height: 1.2em;
  width: 1.2em;
  vertical-align: bottom;
  border-radius: 50%;
`

const diceFaceCss = css`
  height: 1.2em;
  width: 1.2em;
  vertical-align: bottom;
  border-radius: 15%;
`