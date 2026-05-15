/** @jsxImportSource @emotion/react */
import { Card } from '@gamepark/along-history/material/Card'
import { CardType } from '@gamepark/along-history/material/cards/CardType'
import { RuleId } from '@gamepark/along-history/rules/RuleId'
import { Picture } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import VictoryPointIcon from '../../images/icons/VictoryPointIcon.png'
import Coin from '../../images/tokens/coins/Coin1Head.png'
import { roundCss } from '../../styles'
import { cardTypeIcons } from './CardHelp'
import { DisplayCardHelpButton } from './LinkHelp'

export const CalamityFailureHelp = ({ ruleId, card }: { ruleId: RuleId, card: Card }) => {
  switch (ruleId) {
    case RuleId.EarthquakeFailure:
      return <>
        <li><Trans i18nKey="calamity.lose-card"><strong/></Trans></li>
        <li><Trans i18nKey="calamity.replace-events"><strong/></Trans></li>
      </>
    case RuleId.HarshWinterFailure:
      return <li><strong><Trans i18nKey="calamity.pass-turn"/></strong></li>
    case RuleId.SpartacusUprisingFailure:
      return <>
        <li>
          <Trans i18nKey="calamity.lose-half-gold">
            <Picture src={Coin} css={roundCss}/>
          </Trans>
        </li>
        <li>
          <Trans i18nKey="calamity.lose-card"><strong/></Trans>
          <br/>
          <LoseCardPriority ruleId={ruleId}/>
        </li>
      </>
    case RuleId.PiracyFailure:
      return <li>
        <Trans i18nKey="calamity.piracy">
          <Picture src={Coin} css={roundCss}/>
          <strong/>
          <em/>
        </Trans>
      </li>
    case RuleId.BarbarianInvasionsFailure:
    case RuleId.BlackDeathFailure:
      return <>
        <li>
          <Trans i18nKey="calamity.lose-card"><strong/></Trans>
          <br/>
          <LoseCardPriority ruleId={ruleId}/>
        </li>
        <TransmitCalamity card={card}/>
      </>
    case RuleId.SaxonsFailure:
      return <>
        <li>
          <Trans i18nKey="calamity.saxons">
            <DisplayCardHelpButton card={Card.Charlemagne}/>
          </Trans>&nbsp;
          <Trans i18nKey="calamity.lose-card"><strong/></Trans>
        </li>
        <TransmitCalamity card={card}/>
      </>
    case RuleId.VikingsFailure:
      return <>
        <li>
          <Trans i18nKey="calamity.lose-card"><strong/></Trans>
        </li>
        <li>
          <Trans i18nKey="calamity.lose-gold"><Picture src={Coin} css={roundCss}/></Trans>
        </li>
        <TransmitCalamity card={card}/>
      </>
    case RuleId.TitheFailure:
      return <li><Trans i18nKey="calamity.tithe"><Picture src={Coin} css={roundCss}/></Trans></li>
    default:
      return <li>
        <Trans i18nKey="calamity.lose-card"><strong/></Trans>
        <br/>
        <LoseCardPriority ruleId={ruleId}/>
      </li>
  }
}

const TransmitCalamity = ({ card }: { card: Card }) => {
  const { t } = useTranslation()
  return (
    <li>
      <Trans i18nKey="calamity.transmit" values={{ card: t(`card.name.${card}`) }}><em/></Trans>
    </li>
  )
}

const LoseCardPriority = ({ ruleId }: { ruleId: RuleId }) => {
  switch (ruleId) {
    case RuleId.LoseBonusCard:
    case RuleId.BarbarianInvasionsFailure:
      return <Trans i18nKey="calamity.lose-bonus"><strong/></Trans>
    case RuleId.LosePopulationBonus:
      return <Trans i18nKey="calamity.lose-pop-bonus"><strong/></Trans>
    case RuleId.Famine1Failure:
      return <Trans i18nKey="calamity.lose-pop-or-bonus"><strong/></Trans>
    case RuleId.CivilWarFailure:
      return <Trans i18nKey="calamity.civil-war">
        <strong/>
        <Picture src={cardTypeIcons[CardType.Wonder]} css={roundCss}/>
        <Picture src={cardTypeIcons[CardType.Figure]} css={roundCss}/>
      </Trans>
    case RuleId.LoseFigure:
      return <Trans i18nKey="calamity.lose-type">
        <Picture src={cardTypeIcons[CardType.Figure]} css={roundCss}/>
      </Trans>
    case RuleId.LoseProgress:
      return <Trans i18nKey="calamity.lose-type">
        <Picture src={cardTypeIcons[CardType.Progress]} css={roundCss}/>
      </Trans>
    case RuleId.SpartacusUprisingFailure:
      return <Trans i18nKey="calamity.lose-most-vp">
        <Picture src={VictoryPointIcon} css={roundCss}/>
      </Trans>
    case RuleId.CholeraFailure:
      return <Trans i18nKey="calamity.cholera">
        <DisplayCardHelpButton card={Card.Avicenna}/>
        <Picture src={cardTypeIcons[CardType.Figure]} css={roundCss}/>
      </Trans>
    case RuleId.BlackDeathFailure:
      return <Trans i18nKey="calamity.black-death">
        <DisplayCardHelpButton card={Card.Avicenna}/>
        <Picture src={cardTypeIcons[CardType.Figure]} css={roundCss}/>
      </Trans>
    default:
      return null
  }
}
