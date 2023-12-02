/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { MaterialHelpProps, PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isMoveItemType, MaterialMove } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import { breakSpaces } from '../../styles'

export const ResultTokenHelp = ({ item, itemIndex, closeDialog }: MaterialHelpProps) => {
  const { t } = useTranslation()
  const use = useLegalMove<MaterialMove>(move => isMoveItemType(MaterialType.ResultToken)(move) && move.itemIndex === itemIndex)
  return <>
    <h2>{t('result-token')}</h2>
    {use && <p><PlayMoveButton move={use} onPlay={closeDialog}>{t('result-token.use')}</PlayMoveButton></p>}
    {item.location?.rotation && <p>{t('result-token.flipped')}</p>}
    <p css={breakSpaces}>
      <Trans defaults="result-token.rules"/>
    </p>
  </>
}
