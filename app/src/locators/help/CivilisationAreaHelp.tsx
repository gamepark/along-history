/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/along-history/material/LocationType'
import { LocationHelpProps, PlayMoveButton, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import { breakSpaces, rulesLinkButton } from '../../styles'
import { DecayHelp } from './DecayHelp'
import displayLocationHelp = MaterialMoveBuilder.displayLocationHelp

export const CivilisationAreaHelp = ({ location }: LocationHelpProps) => {
  const { t } = useTranslation()
  const player = usePlayerName(location.player)
  const playerId = usePlayerId()
  if (location.z) {
    return <DecayHelp/>
  }
  return <>
    <h2>{location.player === playerId ? t('civ-area.you') : t('civ-area', { player })}</h2>
    <p css={breakSpaces}>
      <Trans defaults="civ-area.rules">
        <PlayMoveButton css={rulesLinkButton}
                        move={displayLocationHelp({ type: LocationType.CivilisationArea, x: 0, z: 1, player: location.player })} local/>
      </Trans>
    </p>
  </>
}
