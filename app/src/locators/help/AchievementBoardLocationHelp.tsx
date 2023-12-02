/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { LocationHelpProps, PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isMoveItemType, MaterialMove } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'
import { shallowEqual } from 'react-redux'
import { BoardHelp } from '../../material/help/BoardHelp'

export const AchievementBoardLocationHelp = ({ location, closeDialog }: LocationHelpProps) => {
  const { t } = useTranslation()
  const moveBack = useLegalMove<MaterialMove>(move => isMoveItemType(MaterialType.CivilisationToken)(move) && shallowEqual(move.location, location))
  return <>
    <BoardHelp/>
    {moveBack && <p><PlayMoveButton move={moveBack} onPlay={closeDialog}>{t('civ-token.move-back')}</PlayMoveButton></p>}
  </>
}
