/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { RuleId } from '@gamepark/along-history/rules/RuleId'
import { MaterialHelpProps, Picture, PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { displayRulesHelp, isMoveItemType, MaterialMove } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import population3Icon from '../../images/dices/population/Population3.jpg'
import cultureIcon from '../../images/dices/resources/Culture.jpg'
import ingenuityIcon from '../../images/dices/resources/Ingenuity.jpg'
import strengthIcon from '../../images/dices/resources/Strength.jpg'
import { alignIcon, breakSpaces, rulesLinkButton } from '../../styles'

export const UniversalResourceHelp = ({ itemIndex, closeDialog }: MaterialHelpProps) => {
  const { t } = useTranslation()
  const spend = useLegalMove<MaterialMove>(move => isMoveItemType(MaterialType.UniversalResource)(move) && move.itemIndex === itemIndex
    && move.location.type === LocationType.UniversalResourceStock)
  return <>
    <h2>{t('universal-resource')}</h2>
    {spend && <p><PlayMoveButton move={spend} onPlay={closeDialog}>{t('token.spend')}</PlayMoveButton></p>}
    <p css={[alignIcon, breakSpaces]}>
      <Trans defaults="universal-resource.rules">
        <Picture src={population3Icon} css={radius}/>
        <Picture src={ingenuityIcon} css={radius}/>
        <Picture src={cultureIcon} css={radius}/>
        <Picture src={strengthIcon} css={radius}/>
        <strong/>
        <PlayMoveButton css={rulesLinkButton} move={displayRulesHelp(RuleId.Wars)} local/>
      </Trans>
    </p>
  </>
}

const radius = css`
  border-radius: 25%
`
