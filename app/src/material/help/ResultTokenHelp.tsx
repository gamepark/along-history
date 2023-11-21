/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import { breakSpaces } from '../../styles'

export const ResultTokenHelp = ({ item }: MaterialHelpProps) => {
  const { t } = useTranslation()
  return <>
    <h2>{t('result-token')}</h2>
    {item.location?.rotation && <p>{t('result-token.flipped')}</p>}
    <p css={breakSpaces}>
      <Trans defaults="result-token.rules"/>
    </p>
  </>
}
