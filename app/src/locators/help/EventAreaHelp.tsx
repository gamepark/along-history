/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/along-history/material/LocationType'
import { LocationHelpProps, PlayMoveButton } from '@gamepark/react-game'
import { displayLocationHelp } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import { rulesLinkButton } from '../../material/help/EffectHelp'

export const EventAreaHelp = ({ location }: LocationHelpProps) => {
  const { t } = useTranslation()
  return <>
    <h2>{t('event-area')}</h2>
    <p css={css`white-space: break-spaces`}>
      <Trans defaults="event-area.rules">
        <PlayMoveButton css={rulesLinkButton} move={displayLocationHelp({ type: LocationType.CivilisationArea, player: location.player })} local/>
      </Trans>
    </p>
  </>
}
