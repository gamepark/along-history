/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { Card } from '@gamepark/along-history/material/Card'
import { Bonus } from '@gamepark/along-history/material/cards/Bonus'
import { CardId } from '@gamepark/along-history/material/cards/CardId'
import { CardsInfo } from '@gamepark/along-history/material/cards/CardsInfo'
import { CardType } from '@gamepark/along-history/material/cards/CardType'
import { goldAmount, isGold } from '@gamepark/along-history/material/DiceSymbol'
import { LocationType } from '@gamepark/along-history/material/LocationType'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { getCalamityFailureRule } from '@gamepark/along-history/rules/CalamitiesRule'
import { buttonCss, MaterialHelpProps, Picture, PlayMoveButton, PlayMoveButtonProps, useLegalMoves, usePlayerName, useRules } from '@gamepark/react-game'
import { displayMaterialHelp, isMoveItemType, isSelectItemType, MaterialMove, MoveItem } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import { playerButtonColor } from '../../headers/WarsHeader'
import populationIcon from '../../images/dices/population/Population1.jpg'
import cultureIcon from '../../images/dices/resources/Culture.jpg'
import ingenuityIcon from '../../images/dices/resources/Ingenuity.jpg'
import strengthIcon from '../../images/dices/resources/Strength.jpg'
import CalamityIcon from '../../images/icons/CalamityIcon.png'
import FigureIcon from '../../images/icons/FigureIcon.png'
import LandIcon from '../../images/icons/LandIcon.png'
import ProgressIcon from '../../images/icons/ProgressIcon.png'
import WonderIcon from '../../images/icons/WonderIcon.png'
import Coin5Head from '../../images/tokens/coins/Coin5Head.png'
import { alignIcon, roundCss, rulesLinkButton } from '../../styles'
import { CalamityFailureHelp } from './CalamityFailureHelp'
import { CardLocationHelp } from './CardLocationHelp'
import { EffectHelp } from './EffectHelp'
import { LinkHelp } from './LinkHelp'

export const CardHelp = ({ item, itemIndex, closeDialog }: MaterialHelpProps) => {
  const { t, i18n } = useTranslation()
  const rules = useRules<AlongHistoryRules>()!
  const card: Card | undefined = item.id.front
  const info = card && CardsInfo[card]
  const legalMoves = useLegalMoves<MaterialMove>()
  const selectCard = legalMoves.find(move => isSelectItemType(MaterialType.Card)(move) && move.itemIndex === itemIndex)
  const cardMoves = legalMoves.filter(isMoveItemType(MaterialType.Card)).filter(move => move.itemIndex === itemIndex)
  const acquireCard = cardMoves.find(move => move.location.type === LocationType.CivilisationArea && move.location.x === undefined)
  const discardCard = legalMoves.find(move => isMoveItemType(MaterialType.Card)(move) && move.itemIndex === itemIndex
    && move.location.type === LocationType.Discard)
  const decayMoves = cardMoves.filter(move => move.location.type === LocationType.CivilisationArea && move.location.x !== undefined && move.location.z === 1)
  const giveMoves = cardMoves.filter(move => move.location.type === LocationType.EventArea)
  const tilt = cardMoves.find(move => move.location.type === LocationType.CivilisationArea && move.location.rotation)
  return <>
    <h2>{card ? t(`card.name.${card}`) : t(`card.age.${item.id.back}`)}</h2>
    {selectCard && <p><PlayMoveButton move={selectCard} onPlay={closeDialog}>{t('card.trade')}</PlayMoveButton></p>}
    {acquireCard && <p><PlayMoveButton move={acquireCard} onPlay={closeDialog}>{t('card.acquire')}</PlayMoveButton></p>}
    {tilt && <p><PlayMoveButton move={tilt} onPlay={closeDialog}>{t('card.tilt')}</PlayMoveButton></p>}
    {discardCard && <p><PlayMoveButton move={discardCard} onPlay={closeDialog}>{t('card.discard')}</PlayMoveButton></p>}
    {decayMoves.map(move =>
      <p key={move.location.x}><PlayMoveButton move={move} onPlay={closeDialog}>
        {t('card.decay', {
          card: t(`card.name.${rules.material(MaterialType.Card).location(l =>
            l.type === move.location.type && l.player === move.location.player && l.x === move.location.x && l.z === 0
          ).getItem<CardId>()?.id?.front}`)
        })}
      </PlayMoveButton></p>
    )}
    {giveMoves.length > 0 &&
      <p>{giveMoves.map(move => <GiveToPlayerButton key={move.location.player} move={move} onPlay={closeDialog}/>)}</p>
    }
    {item.location && <CardLocationHelp location={item.location}/>}
    {info && <>
      <p css={alignIcon}><Picture src={cardTypeIcons[info.type]} css={roundCss}/>{t(`card.type.${info.type}`)}</p>

      {info.type === CardType.Wonder &&
        <p css={alignIcon}>
          <Trans defaults="wonders.bonus">
            <Picture src={cardTypeIcons[CardType.Wonder]} css={roundCss}/>
            <PlayMoveButton css={rulesLinkButton} move={displayMaterialHelp(MaterialType.UniversalResource)} local/>
          </Trans>
        </p>
      }

      <p>{t(`card.points`, { points: info.victoryPoints })}</p>

      <p css={alignIcon}><Trans defaults={info.goldCost ? 'card.cost.gold' : 'card.cost'}
                                values={{ population: isNaN(info.populationCost) ? 'X' : info.populationCost, gold: info.goldCost }}>
        <Picture src={populationIcon} css={roundCss}/>
        <>{info.resourcesCost.map((resource, index) => <Picture key={index} src={bonusIcon[resource]} css={roundCss}/>)}</>
        <Picture src={Coin5Head} css={roundCss}/>
      </Trans></p>

      {info.effects.map((effect, index) => <p key={index} css={alignIcon}><EffectHelp effect={effect} card={card}/></p>)}

      {info.type === CardType.Calamity && <>
        <p>{t('calamity.failure')}</p>
        <ul css={alignIcon}><CalamityFailureHelp ruleId={getCalamityFailureRule(card)} card={card}/></ul>
      </>}

      {info.bonus.length > 0 && <p css={alignIcon}>
        <Trans defaults="card.bonus">
          <>{info.bonus.map((bonus, index) => {
            if (isGold(bonus)) {
              return <span key={index}>{goldAmount(bonus)} <Picture key={index} src={Coin5Head}/></span>
            } else {
              return <Picture key={index} src={bonusIcon[bonus]}/>
            }
          })}</>
        </Trans>
      </p>}

      <LinkHelp card={card}/>

      {i18n.exists(`card.history.${card}`) && <p><em>{t(`card.history.${card}`)}</em></p>}
    </>}
  </>
}

const GiveToPlayerButton = ({ move, ...props }: { move: MoveItem } & PlayMoveButtonProps) => {
  const { t } = useTranslation()
  const player = usePlayerName(move.location.player)
  return <PlayMoveButton move={move} css={[inlineButtonMargin, buttonCss(playerButtonColor[move.location.player], '', '')]} {...props}>
    {t('card.give', { player })}
  </PlayMoveButton>
}

const bonusIcon: Record<Bonus, string> = {
  [Bonus.Population]: populationIcon,
  [Bonus.Culture]: cultureIcon,
  [Bonus.Ingenuity]: ingenuityIcon,
  [Bonus.Strength]: strengthIcon
}

export const cardTypeIcons: Record<CardType, string> = {
  [CardType.Land]: LandIcon,
  [CardType.Progress]: ProgressIcon,
  [CardType.Figure]: FigureIcon,
  [CardType.Wonder]: WonderIcon,
  [CardType.Calamity]: CalamityIcon
}

const inlineButtonMargin = css`
  margin-top: 0.5em;
  margin-left: 0.5em;
`