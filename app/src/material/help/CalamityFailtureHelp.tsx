/** @jsxImportSource @emotion/react */
import { CardType } from '@gamepark/along-history/material/cards/CardType'
import { RuleId } from '@gamepark/along-history/rules/RuleId'
import { Picture } from '@gamepark/react-game'
import { Trans } from 'react-i18next'
import { roundCss } from '../../styles'
import { cardTypeIcons } from './CardHelp'

export const CalamityFailureHelp = ({ ruleId }: { ruleId: RuleId }) => {
  switch (ruleId) {
    case RuleId.LoseBonusCard:
      return <>
        <li>
          <Trans defaults="calamity.lose-card"><strong/></Trans>
          <br/>
          <Trans defaults="calamity.lose-bonus"><strong/></Trans>
        </li>
        <li><Trans defaults="calamity.replace-events"><strong/></Trans></li>
      </>
    case RuleId.CannibalsFailure:
      return <li>
        <Trans defaults="calamity.lose-card"><strong/></Trans>
        <br/>
        <Trans defaults="calamity.lose-pop-bonus"><strong/></Trans>
      </li>
    case RuleId.EarthquakeFailure:
      return <>
        <li><Trans defaults="calamity.lose-card"><strong/></Trans></li>
        <li><Trans defaults="calamity.replace-events"><strong/></Trans></li>
      </>
    case RuleId.HarshWinterFailure:
      return <li><strong><Trans defaults="calamity.pass-turn"/></strong></li>
    case RuleId.StarvingFailure:
      return <li>
        <Trans defaults="calamity.lose-card"><strong/></Trans>
        <br/>
        <Trans defaults="calamity.lose-pop-or-bonus"><strong/></Trans>
      </li>
    case RuleId.CivilWarFailure:
      return <li>
        <Trans defaults="calamity.lose-card"><strong/></Trans>
        <br/>
        <Trans defaults="calamity.civil-war">
          <strong/>
          <Picture src={cardTypeIcons[CardType.Wonder]} css={roundCss}/>
          <Picture src={cardTypeIcons[CardType.Figure]} css={roundCss}/>
        </Trans>
      </li>
    default:
      return <li><Trans defaults="calamity.lose-card"><strong/></Trans></li>
  }
}
