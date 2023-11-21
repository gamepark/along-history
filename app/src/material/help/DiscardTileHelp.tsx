/** @jsxImportSource @emotion/react */
import { Trans, useTranslation } from 'react-i18next'
import { breakSpaces } from '../../styles'

export const DiscardTileHelp = () => {
  const { t } = useTranslation()
  return <>
    <h2>{t('discard-tile')}</h2>
    <p css={breakSpaces}>
      <Trans defaults="discard-tile.rules"/>
    </p>
  </>
}
