/** @jsxImportSource @emotion/react */
import { Trans, useTranslation } from 'react-i18next'
import { breakSpaces } from '../../styles'

export const DecayHelp = () => {
  const { t } = useTranslation()
  return <>
    <h2>{t('decay.title')}</h2>
    <p css={breakSpaces}>
      <Trans defaults="decay.rules">
        <strong/>
      </Trans>
    </p>
  </>
}
