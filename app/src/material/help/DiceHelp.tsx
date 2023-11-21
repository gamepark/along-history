/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { DiceType } from '@gamepark/along-history/material/Dices'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { MaterialHelpProps, Picture, PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isRollItemType } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import Population1 from '../../images/dices/population/Population1.jpg'
import Population2 from '../../images/dices/population/Population2.jpg'
import Population3 from '../../images/dices/population/Population3.jpg'
import Culture from '../../images/dices/resources/Culture.jpg'
import Ingenuity from '../../images/dices/resources/Ingenuity.jpg'
import Strength from '../../images/dices/resources/Strength.jpg'
import GoldenAge from '../../images/dices/special/GoldenAge.jpg'
import Multiplier from '../../images/dices/special/Multiplier.jpg'
import Reroll from '../../images/dices/special/Reroll.jpg'
import War from '../../images/dices/special/War.jpg'
import { alignIcon, breakSpaces } from '../../styles'

export const DiceHelp = ({ item, itemIndex, closeDialog }: MaterialHelpProps) => {
  const { t } = useTranslation()
  const rollDice = useLegalMove(move => isRollItemType(MaterialType.Dice)(move) && move.itemIndex === itemIndex)
  return <>
    <h2>{t(`dice.type.${item.id}`)}</h2>
    {rollDice && <PlayMoveButton move={rollDice} onPlay={closeDialog}>{t('die.reroll')}</PlayMoveButton>}
    <p css={[breakSpaces, alignIcon]}>
      <Trans defaults={`dice.type.${item.id}.rules`}>
        <strong/>
        <Picture src={item.id === DiceType.Population ? Population1 : Ingenuity} css={rounded}/>
        <Picture src={item.id === DiceType.Population ? Population2 : Strength} css={rounded}/>
        <Picture src={item.id === DiceType.Population ? Population3 : Culture} css={rounded}/>
      </Trans>
    </p>
    {item.id === DiceType.Special && <>
      <p css={[breakSpaces, alignIcon]}><Trans defaults="die.reroll.rule">
        <Picture src={Reroll} css={rounded}/>
      </Trans></p>
      <p css={[breakSpaces, alignIcon]}><Trans defaults="die.multiplier.rule">
        <Picture src={Multiplier} css={rounded}/>
      </Trans></p>
      <p css={[breakSpaces, alignIcon]}><Trans defaults="die.war.rule">
        <Picture src={War} css={rounded}/>
      </Trans></p>
      <p css={[breakSpaces, alignIcon]}><Trans defaults="die.golden-age.rule">
        <Picture src={GoldenAge} css={rounded}/>
      </Trans></p>
    </>}
  </>
}

const rounded = css`
  border-radius: 15%;
`
