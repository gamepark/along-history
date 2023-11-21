/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Trans, useTranslation } from 'react-i18next'

export const DecayHelp = () => {
  const { t } = useTranslation()
  return <>
    <h2>{t('decay.title')}</h2>
    <p css={css`white-space: break-spaces`}>
      <Trans defaults="decay.rules">
        <strong/>
      </Trans>
    </p>
  </>
}
