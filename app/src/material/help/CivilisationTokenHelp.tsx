/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialHelpProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { displayLocationHelp } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import { rulesLinkButton } from './EffectHelp'

export const CivilisationTokenHelp = ({ item }: MaterialHelpProps) => {
  const { t } = useTranslation()
  const player = usePlayerName(item.id)
  return <>
    <h2>{t('civ-token', { player })}</h2>
    <p css={css`white-space: break-spaces`}>
      <Trans defaults="achievements.rules">
        <strong/>
        <PlayMoveButton css={rulesLinkButton} move={displayLocationHelp({ type: LocationType.CivilisationArea, x: 0, z: 1 })} local/>
      </Trans>
    </p>
  </>
}