/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Picture } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import population3Icon from '../../images/dices/population/Population3.jpg'
import cultureIcon from '../../images/dices/resources/Culture.jpg'
import ingenuityIcon from '../../images/dices/resources/Ingenuity.jpg'
import strengthIcon from '../../images/dices/resources/Strength.jpg'
import { alignIcon, breakSpaces } from '../../styles'

export const UniversalResourceHelp = () => {
  const { t } = useTranslation()
  return <>
    <h2>{t('universal-resource')}</h2>
    <p css={[alignIcon, breakSpaces]}>
      <Trans defaults="universal-resource.rules">
        <Picture src={population3Icon} css={radius}/>
        <Picture src={ingenuityIcon} css={radius}/>
        <Picture src={cultureIcon} css={radius}/>
        <Picture src={strengthIcon} css={radius}/>
        <strong/>
      </Trans>
    </p>
  </>
}

const radius = css`
  border-radius: 25%
`
