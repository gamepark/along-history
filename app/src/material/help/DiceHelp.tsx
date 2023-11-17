/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { MaterialHelpProps, PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isRollItemType } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'

export const DiceHelp = ({ itemIndex, closeDialog }: MaterialHelpProps) => {
  const { t } = useTranslation()
  const chooseCard = useLegalMove(move => isRollItemType(MaterialType.Dice)(move) && move.itemIndex === itemIndex)
  return <>
    <h2>&nbsp;</h2>
    {chooseCard && <PlayMoveButton move={chooseCard} onPlay={closeDialog}>{t('die.reroll')}</PlayMoveButton>}
  </>
}