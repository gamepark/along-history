/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/along-history/material/LocationType'
import { RuleId } from '@gamepark/along-history/rules/RuleId'
import { MaterialHelpProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { displayLocationHelp, displayRulesHelp } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import { breakSpaces, rulesLinkButton } from '../../styles'

export const CivilisationTokenHelp = ({ item }: MaterialHelpProps) => {
  const { t } = useTranslation()
  const player = usePlayerName(item.id)
  return <>
    <h2>{t('civ-token', { player })}</h2>
    <p css={breakSpaces}>
      <Trans defaults="achievements.rules">
        <strong/>
        <PlayMoveButton css={rulesLinkButton} move={displayLocationHelp({ type: LocationType.CivilisationArea, x: 0, z: 1 })} local/>
        <PlayMoveButton css={rulesLinkButton} move={displayRulesHelp(RuleId.Wars)} local/>
      </Trans>
    </p>
  </>
}
