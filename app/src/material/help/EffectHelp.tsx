/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Card } from '@gamepark/along-history/material/Card'
import { CardType } from '@gamepark/along-history/material/cards/CardType'
import { CancelEffect } from '@gamepark/along-history/material/cards/effects/CancelEffect'
import { CardTypeDiscountEffect } from '@gamepark/along-history/material/cards/effects/CardTypeDiscountEffect'
import { Condition } from '@gamepark/along-history/material/cards/effects/conditions/Condition'
import { ConditionType } from '@gamepark/along-history/material/cards/effects/conditions/ConditionType'
import { OrConditions } from '@gamepark/along-history/material/cards/effects/conditions/OrConditions'
import { OwnCardsCondition } from '@gamepark/along-history/material/cards/effects/conditions/OwnCardsCondition'
import { DestroyEffect } from '@gamepark/along-history/material/cards/effects/DestroyEffect'
import { Effect } from '@gamepark/along-history/material/cards/effects/Effect'
import { EffectType } from '@gamepark/along-history/material/cards/effects/EffectType'
import { LosePopulationEffect } from '@gamepark/along-history/material/cards/effects/LosePopulationEffect'
import { SeizeEffect } from '@gamepark/along-history/material/cards/effects/SeizeEffect'
import { TradeCalamityEffect } from '@gamepark/along-history/material/cards/effects/TradeCalamityEffect'
import { TradeOnAcquisitionEffect } from '@gamepark/along-history/material/cards/effects/TradeOnAcquisitionEffect'
import { LocationType } from '@gamepark/along-history/material/LocationType'
import { RuleId } from '@gamepark/along-history/rules/RuleId'
import { Picture, PlayMoveButton } from '@gamepark/react-game'
import { displayLocationHelp, displayRulesHelp } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import populationIcon from '../../images/dices/population/Population1.jpg'
import FigureIcon from '../../images/icons/FigureIcon.png'
import WarIcon from '../../images/icons/WarIcon.png'
import Coin5Head from '../../images/tokens/coins/Coin5Head.png'
import { roundCss, rulesLinkButton } from '../../styles'
import { cardTypeIcons } from './CardHelp'
import { DisplayCardHelpButton } from './LinkHelp'

export const EffectHelp = ({ effect, card }: { effect: Effect, card: Card }) => {
  switch (effect.type) {
    case EffectType.Discount:
      if (effect.population > 0) {
        return <Trans defaults="effect.discount" values={{ population: effect.population }}>
          <Picture src={populationIcon} css={roundCss}/>
          <ConditionHelp condition={effect.condition}/>
        </Trans>
      } else {
        return <Trans defaults="effect.overcost" values={{ population: -effect.population }}>
          <Picture src={populationIcon} css={roundCss}/>
          <ConditionHelp condition={effect.condition}/>
        </Trans>
      }
    case EffectType.Free:
      return <Trans defaults="effect.free"><ConditionHelp condition={effect.condition}/></Trans>
    case EffectType.LosePopulation:
      return <LosePopulationHelp effect={effect} card={card}/>
    case EffectType.Discard:
      return <Trans defaults="effect.discard"><ConditionHelp condition={effect.condition}/></Trans>
    case EffectType.NonTransmissible:
      return <Trans defaults="effect.non-transmissible"><strong/></Trans>
    case EffectType.WarBonus:
      const type = effect.defenseOnly ? 'defense' : effect.attackOnly ? 'attack' : 'bonus'
      const suffix = effect.condition ? '.if' : effect.multiplier ? '.x' : ''
      return <Trans defaults={`effect.war-${type}${suffix}`}
                    values={{ bonus: effect.bonus }}>
        <PlayMoveButton css={rulesLinkButton} move={displayRulesHelp(RuleId.Wars)} local/>
        <Picture src={populationIcon} css={roundCss}/>
        {effect.condition ? <ConditionHelp condition={effect.condition}/>
          : effect.multiplier && <MultiplierHelp multiplier={effect.multiplier}/>}
      </Trans>
    case EffectType.EarnGold:
      return <Trans defaults="effect.earn-gold" values={{ gold: effect.amount }}>
        <Picture src={Coin5Head} css={roundCss}/>
      </Trans>
    case EffectType.GoldCost:
      return <Trans defaults="effect.gold-cost" values={{ gold: effect.cost }}>
        <Picture src={Coin5Head} css={roundCss}/>
        <ConditionHelp condition={effect.condition}/>
      </Trans>
    case EffectType.CardTypeDiscount:
      return <CardTypeDiscountHelp effect={effect}/>
    case EffectType.General:
      return <Trans defaults="effect.general">
        <PlayMoveButton css={rulesLinkButton} move={displayRulesHelp(RuleId.Wars)} local/>
        <strong/>
      </Trans>
    case EffectType.Destroy:
      return <DestroyCardHelp effect={effect}/>
    case EffectType.TradeCalamity:
      return <TradeCalamityHelp effect={effect}/>
    case EffectType.Artillery:
      return <Trans defaults="effect.artillery">
        <PlayMoveButton css={rulesLinkButton} move={displayRulesHelp(RuleId.Wars)} local/>
        <em/>
      </Trans>
    case EffectType.Ransom:
      return <Trans defaults="effect.ransom">
        <Picture src={Coin5Head} css={roundCss}/>
      </Trans>
    case EffectType.Cancel:
      return <CancelEffectHelp effect={effect}/>
    case EffectType.TurnCoat:
      return <TurnCoatEffectHelp card={card}/>
    case EffectType.Seize:
      return <SeizeEffectHelp effect={effect} card={card}/>
    case EffectType.Counterattack:
      return <Trans defaults="effect.counterattack">
        <PlayMoveButton css={[rulesLinkButton, css`font-style: italic`]} move={displayRulesHelp(RuleId.Wars)} local/>
      </Trans>
    case EffectType.RobinHood:
      return <Trans defaults="effect.robin-hood">
        <Picture src={Coin5Head} css={roundCss}/>
      </Trans>
    case EffectType.TradeOnAcquisition:
      return <TradeOnAcquisition effect={effect} card={card}/>
    case EffectType.Swap:
      return <SwapHelp card={card}/>
    case EffectType.Poison:
      return <Trans defaults="effect.poison">
        <Picture src={FigureIcon} css={roundCss}/>
      </Trans>
    case EffectType.CostPerBonus:
      return <Trans defaults="effect.cost-per-bonus">
        <Picture src={populationIcon} css={roundCss}/>
      </Trans>
  }
}

export const LosePopulationHelp = ({ effect, card }: { effect: LosePopulationEffect, card: Card }) => {
  const { t } = useTranslation()
  if (effect.condition) {
    return <Trans defaults="effect.lose-pop-if" values={{ card: t(`card.name.${card}`) }}>
      <em/>
      <Picture src={populationIcon} css={roundCss}/>
      <ConditionHelp condition={effect.condition}/>
    </Trans>
  } else {
    return <Trans defaults="effect.lose-pop" values={{ card: t(`card.name.${card}`) }}>
      <em/>
      <Picture src={populationIcon} css={roundCss}/>
    </Trans>
  }
}


export const CardTypeDiscountHelp = ({ effect }: { effect: CardTypeDiscountEffect }) => {
  const { t } = useTranslation()
  return <Trans defaults="effect.card-type-discount" values={{ type: t(`card.type.${effect.cardType}`), discount: effect.discount }}>
    <Picture src={cardTypeIcons[effect.cardType]} css={roundCss}/>
    <Picture src={populationIcon} css={roundCss}/>
  </Trans>
}

export const DestroyCardHelp = ({ effect }: { effect: DestroyEffect }) => {
  const { t } = useTranslation()
  return <Trans defaults="effect.destroy" values={{ card: t(`card.name.${effect.card}`) }}>
    <em/>
    <DisplayCardHelpButton card={effect.card}/>
  </Trans>
}

export const TradeCalamityHelp = ({ effect }: { effect: TradeCalamityEffect }) => {
  const { t } = useTranslation()
  return <Trans defaults="effect.trade-calamity" values={{ card: t(`card.name.${effect.card}`) }}>
    <DisplayCardHelpButton card={effect.card}/>
  </Trans>
}

export const CancelEffectHelp = ({ effect }: { effect: CancelEffect }) => {
  const { t } = useTranslation()
  return <Trans defaults="effect.cancel" values={{ card: t(`card.name.${effect.card}`) }}>
    <DisplayCardHelpButton card={effect.card}/>
  </Trans>
}

export const TurnCoatEffectHelp = ({ card }: { card: Card }) => {
  const { t } = useTranslation()
  return <Trans defaults="effect.turn-coat" values={{ card: t(`card.name.${card}`) }}>
    <Picture src={WarIcon} css={roundCss}/>
    <PlayMoveButton css={rulesLinkButton} move={displayRulesHelp(RuleId.Wars)} local/>
  </Trans>
}

export const SwapHelp = ({ card }: { card: Card }) => {
  const { t } = useTranslation()
  return <>{t('effect.swap', { card: t(`card.name.${card}`) })}</>
}

export const SeizeEffectHelp = ({ effect, card }: { effect: SeizeEffect, card: Card }) => {
  const { t } = useTranslation()
  return <Trans defaults="effect.seize" values={{ card1: t(`card.name.${effect.card}`), card2: t(`card.name.${card}`) }}>
    <DisplayCardHelpButton card={effect.card}/>
    <PlayMoveButton css={rulesLinkButton} move={displayLocationHelp({ type: LocationType.CivilisationArea, x: 0, z: 1 })} local/>
  </Trans>
}

export const TradeOnAcquisition = ({ effect, card }: { effect: TradeOnAcquisitionEffect, card: Card }) => {
  const { t } = useTranslation()
  return <Trans defaults="effect.acquire-trade" values={{ card1: t(`card.name.${effect.card}`), card2: t(`card.name.${card}`) }}>
    <DisplayCardHelpButton card={effect.card}/>
    <PlayMoveButton css={rulesLinkButton} move={displayLocationHelp({ type: LocationType.CivilisationArea, x: 0, z: 1 })} local/>
  </Trans>
}

export const ConditionHelp = ({ condition, opponent }: { condition: Condition, opponent?: boolean }) => {
  switch (condition.type) {
    case ConditionType.OwnCards:
      return <OwnCardCondition condition={condition}/>
    case ConditionType.Or:
      return <OrCondition condition={condition} opponent={opponent}/>
    case ConditionType.Opponent:
      return <ConditionHelp condition={condition.condition} opponent={!opponent}/>
    default:
      return <>???</>
  }
}

export const OwnCardCondition = ({ condition }: { condition: OwnCardsCondition }) => {
  const { t } = useTranslation()
  if (condition.cards.length === 1 && condition.quantity === 1) {
    const card = condition.cards[0]
    return <Trans defaults="condition.own.card" values={{ card: t(`card.name.${card}`) }}>
      <DisplayCardHelpButton card={card}/>
    </Trans>
  } else if (condition.cards.length === 2 && condition.quantity === 1) {
    return <Trans defaults="condition.own.1of2" values={{
      card1: t(`card.name.${condition.cards[0]}`),
      card2: t(`card.name.${condition.cards[1]}`)
    }}>
      {condition.cards.map(card => <DisplayCardHelpButton key={card} card={card}/>)}
    </Trans>
  } else if (condition.cards.length === 3 && condition.quantity === 1) {
    return <Trans defaults="condition.own.1of3" values={{
      card1: t(`card.name.${condition.cards[0]}`),
      card2: t(`card.name.${condition.cards[1]}`),
      card3: t(`card.name.${condition.cards[2]}`)
    }}>
      {condition.cards.map(card => <DisplayCardHelpButton key={card} card={card}/>)}
    </Trans>
  } else if (condition.cards.length === 3 && condition.quantity === 2) {
    return <Trans defaults="condition.own.2of3" values={{
      card1: t(`card.name.${condition.cards[0]}`),
      card2: t(`card.name.${condition.cards[1]}`),
      card3: t(`card.name.${condition.cards[2]}`)
    }}>
      {condition.cards.map(card => <DisplayCardHelpButton key={card} card={card}/>)}
    </Trans>
  }
  return <>???</>
}

export const OrCondition = (_: { condition: OrConditions, opponent?: boolean }) => {
  const { t } = useTranslation()
  return <Trans defaults={`condition.mangonel`} values={{
    card1: t(`card.name.${Card.Camelot}`),
    card2: t(`card.name.${Card.Jerusalem}`)
  }}>
    <Picture src={cardTypeIcons[CardType.Land]} css={roundCss}/>
    <DisplayCardHelpButton card={Card.Camelot}/>
    <DisplayCardHelpButton card={Card.Jerusalem}/>
  </Trans>
}


export const MultiplierHelp = ({ multiplier }: { multiplier: Condition }) => {
  switch (multiplier.type) {
    case ConditionType.OwnCardType:
      return <>
        {multiplier.quantity > 1 && <>{multiplier.quantity}&nbsp;</>}
        <Trans defaults="multiplier.type">
          <Picture src={cardTypeIcons[multiplier.cardType]} css={roundCss}/>
        </Trans>
      </>
    default:
      return <>???</>
  }
}