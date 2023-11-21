/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/along-history/material/LocationType'
import { LocationHelpProps, PlayMoveButton, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { displayLocationHelp } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import { rulesLinkButton } from '../../material/help/EffectHelp'
import { DecayHelp } from './DecayHelp'

export const CivilisationAreaHelp = ({ location }: LocationHelpProps) => {
  const { t } = useTranslation()
  const player = usePlayerName(location.player)
  const playerId = usePlayerId()
  if (location.z) {
    return <DecayHelp/>
  }
  return <>
    <h2>{location.player === playerId ? t('civ-area.you') : t('civ-area', { player })}</h2>
    <p css={css`white-space: break-spaces`}>
      <Trans defaults="civ-area.rules">
        <PlayMoveButton css={rulesLinkButton} move={displayLocationHelp({ type: LocationType.CivilisationArea, x: 0, z: 1 })} local/>
      </Trans>
    </p>
  </>
}
