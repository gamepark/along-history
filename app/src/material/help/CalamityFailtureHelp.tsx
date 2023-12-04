/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/along-history/rules/RuleId'
import { Trans } from 'react-i18next'

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
    default:
      return <li><Trans defaults="calamity.lose-card"><strong/></Trans></li>
  }
}
