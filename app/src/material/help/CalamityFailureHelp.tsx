/** @jsxImportSource @emotion/react */
import { Card } from '@gamepark/along-history/material/Card'
import { CardType } from '@gamepark/along-history/material/cards/CardType'
import { RuleId } from '@gamepark/along-history/rules/RuleId'
import { Picture } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import VictoryPointIcon from '../../images/icons/VictoryPointIcon.png'
import Coin5Head from '../../images/tokens/coins/Coin5Head.png'
import { roundCss } from '../../styles'
import { cardTypeIcons } from './CardHelp'
import { DisplayCardHelpButton } from './LinkHelp'

export const CalamityFailureHelp = ({ ruleId, card }: { ruleId: RuleId, card: Card }) => {
  switch (ruleId) {
    case RuleId.EarthquakeFailure:
      return <>
        <li><Trans defaults="calamity.lose-card"><strong/></Trans></li>
        <li><Trans defaults="calamity.replace-events"><strong/></Trans></li>
      </>
    case RuleId.HarshWinterFailure:
      return <li><strong><Trans defaults="calamity.pass-turn"/></strong></li>
    case RuleId.SpartacusUprisingFailure:
      return <>
        <li>
          <Trans defaults="calamity.lose-half-gold">
            <Picture src={Coin5Head} css={roundCss}/>
          </Trans>
        </li>
        <li>
          <Trans defaults="calamity.lose-card"><strong/></Trans>
          <br/>
          <LoseCardPriority ruleId={ruleId}/>
        </li>
      </>
    case RuleId.PiracyFailure:
      return <li>
        <Trans defaults="calamity.piracy">
          <Picture src={Coin5Head} css={roundCss}/>
          <strong/>
          <em/>
        </Trans>
      </li>
    case RuleId.BarbarianInvasionsFailure:
    case RuleId.BlackDeathFailure:
      return <>
        <li>
          <Trans defaults="calamity.lose-card"><strong/></Trans>
          <br/>
          <LoseCardPriority ruleId={ruleId}/>
        </li>
        <TransmitCalamity card={card}/>
      </>
    case RuleId.SaxonsFailure:
      return <>
        <li>
          <Trans defaults="calamity.saxons">
            <DisplayCardHelpButton card={Card.Charlemagne}/>
          </Trans>&nbsp;
          <Trans defaults="calamity.lose-card"><strong/></Trans>
        </li>
        <TransmitCalamity card={card}/>
      </>
    case RuleId.VikingsFailure:
      return <>
        <li>
          <Trans defaults="calamity.lose-card"><strong/></Trans>
        </li>
        <li>
          <Trans defaults="calamity.lose-gold"><Picture src={Coin5Head} css={roundCss}/></Trans>
        </li>
        <TransmitCalamity card={card}/>
      </>
    case RuleId.TitheFailure:
      return <li><Trans defaults="calamity.tithe"><Picture src={Coin5Head} css={roundCss}/></Trans></li>
    default:
      return <li>
        <Trans defaults="calamity.lose-card"><strong/></Trans>
        <br/>
        <LoseCardPriority ruleId={ruleId}/>
      </li>
  }
}

const TransmitCalamity = ({ card }: { card: Card }) => {
  const { t } = useTranslation()
  return (
    <li>
      <Trans defaults="calamity.transmit" values={{ card: t(`card.name.${card}`) }}><em/></Trans>
    </li>
  )
}

const LoseCardPriority = ({ ruleId }: { ruleId: RuleId }) => {
  switch (ruleId) {
    case RuleId.LoseBonusCard:
    case RuleId.BarbarianInvasionsFailure:
      return <Trans defaults="calamity.lose-bonus"><strong/></Trans>
    case RuleId.LosePopulationBonus:
      return <Trans defaults="calamity.lose-pop-bonus"><strong/></Trans>
    case RuleId.Famine1Failure:
      return <Trans defaults="calamity.lose-pop-or-bonus"><strong/></Trans>
    case RuleId.CivilWarFailure:
      return <Trans defaults="calamity.civil-war">
        <strong/>
        <Picture src={cardTypeIcons[CardType.Wonder]} css={roundCss}/>
        <Picture src={cardTypeIcons[CardType.Figure]} css={roundCss}/>
      </Trans>
    case RuleId.LoseFigure:
      return <Trans defaults="calamity.lose-type">
        <Picture src={cardTypeIcons[CardType.Figure]} css={roundCss}/>
      </Trans>
    case RuleId.LoseProgress:
      return <Trans defaults="calamity.lose-type">
        <Picture src={cardTypeIcons[CardType.Progress]} css={roundCss}/>
      </Trans>
    case RuleId.SpartacusUprisingFailure:
      return <Trans defaults="calamity.lose-most-vp">
        <Picture src={VictoryPointIcon} css={roundCss}/>
      </Trans>
    case RuleId.CholeraFailure:
      return <Trans defaults="calamity.cholera">
        <DisplayCardHelpButton card={Card.Avicenna}/>
        <Picture src={cardTypeIcons[CardType.Figure]} css={roundCss}/>
      </Trans>
    case RuleId.BlackDeathFailure:
      return <Trans defaults="calamity.black-death">
        <DisplayCardHelpButton card={Card.Avicenna}/>
        <Picture src={cardTypeIcons[CardType.Figure]} css={roundCss}/>
      </Trans>
    default:
      return null
  }
}
