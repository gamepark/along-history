/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { DiceType } from '@gamepark/along-history/material/Dices'
import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { RuleId } from '@gamepark/along-history/rules/RuleId'
import { MaterialHelpProps, Picture, PlayMoveButton, useLegalMoves } from '@gamepark/react-game'
import { isMoveItemType, isRollItemType, isSelectItemType, MaterialMove, MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import Gold3 from '../../images/dices/gold/Gold3.jpg'
import Gold4 from '../../images/dices/gold/Gold4.jpg'
import Gold5 from '../../images/dices/gold/Gold5.jpg'
import Gold6 from '../../images/dices/gold/Gold6.jpg'
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
import { alignIcon, breakSpaces, rulesLinkButton } from '../../styles'
import displayRulesHelp = MaterialMoveBuilder.displayRulesHelp

export const DiceHelp = ({ item, itemIndex, closeDialog }: MaterialHelpProps) => {
  const { t } = useTranslation()
  const legalMoves = useLegalMoves<MaterialMove>()
  const rollDie = legalMoves.find(move => isRollItemType(MaterialType.Dice)(move) && move.itemIndex === itemIndex)
  const discardDie = legalMoves.find(move => isMoveItemType(MaterialType.Dice)(move)
    && move.itemIndex === itemIndex && move.location.type === LocationType.DiscardTile)
  const selectDie = legalMoves.find(move => isSelectItemType(MaterialType.Dice)(move) && move.itemIndex === itemIndex)
  return <>
    <h2>{t(`dice.type.${item.id}`)}</h2>
    {rollDie && <p><PlayMoveButton move={rollDie} onPlay={closeDialog}>{t('die.reroll')}</PlayMoveButton></p>}
    {discardDie && <p><PlayMoveButton move={discardDie} onPlay={closeDialog}>{t('die.discard')}</PlayMoveButton></p>}
    {selectDie && <p><PlayMoveButton move={selectDie} onPlay={closeDialog}>{t('die.select')}</PlayMoveButton></p>}
    <p css={[breakSpaces, alignIcon]}>
      <Trans defaults={`dice.type.${item.id}.rules`}>
        <strong/>
        <Picture src={item.id === DiceType.Population ? Population1 : item.id === DiceType.Resource ? Ingenuity : Gold3} css={rounded}/>
        <Picture src={item.id === DiceType.Population ? Population2 : item.id === DiceType.Resource ? Strength : Gold4} css={rounded}/>
        <Picture src={item.id === DiceType.Population ? Population3 : item.id === DiceType.Resource ? Culture : Gold5} css={rounded}/>
        {item.id === DiceType.Gold && <Picture src={Gold6} css={rounded}/>}
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
        <PlayMoveButton css={rulesLinkButton} move={displayRulesHelp(RuleId.Wars)} local/>
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
