/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Card } from '@gamepark/along-history/material/Card'
import { Bonus } from '@gamepark/along-history/material/cards/Bonus'
import { CardsInfo } from '@gamepark/along-history/material/cards/CardsInfo'
import { MaterialHelpProps, Picture } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import populationIcon from '../../images/dices/population/Population1.jpg'
import cultureIcon from '../../images/dices/resources/Culture.jpg'
import ingenuityIcon from '../../images/dices/resources/Ingenuity.jpg'
import strengthIcon from '../../images/dices/resources/Strength.jpg'
import { EffectHelp } from './EffectHelp'
import { LinkHelp } from './LinkHelp'

export const CardHelp = ({ item }: MaterialHelpProps) => {
  const { t } = useTranslation()
  const card: Card | undefined = item.id.front
  const info = card && CardsInfo[card]
  return <>
    <h2>{card ? t(`card.name.${card}`) : t(`card.age.${item.id.back}`)}</h2>
    {info && <>
      <p>{t(`card.type.${info.type}`)}</p>
      <p>{t(`card.points`, { points: info.victoryPoints })}</p>

      <p css={alignIcon}><Trans defaults="card.cost" values={{ population: info.populationCost }}>
        <Picture src={populationIcon} css={round}/>
        <>{info.resourcesCost.map((resource, index) => <Picture key={index} src={bonusIcon[resource]} css={round}/>)}</>
      </Trans></p>

      {info.effects.map((effect, index) => <p key={index} css={alignIcon}><EffectHelp effect={effect} card={card}/></p>)}

      {info.bonus.length > 0 && <p css={alignIcon}>
        <Trans defaults="card.bonus">
          <>{info.bonus.map((bonus, index) => <Picture key={index} src={bonusIcon[bonus]}/>)}</>
        </Trans>
      </p>}

      <LinkHelp card={card}/>
    </>}
  </>
}

const bonusIcon: Record<Bonus, string> = {
  [Bonus.Population]: populationIcon,
  [Bonus.Culture]: cultureIcon,
  [Bonus.Ingenuity]: ingenuityIcon,
  [Bonus.Strength]: strengthIcon
}

export const alignIcon = css`
  picture, img {
    vertical-align: middle;
    height: 1.5em;
    margin-right: 0.1em;
  }
`

export const round = css`
  border-radius: 50%;
`