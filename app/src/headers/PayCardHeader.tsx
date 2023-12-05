/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { Resource } from '@gamepark/along-history/material/Resource'
import { Memory } from '@gamepark/along-history/rules/Memory'
import { Picture, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans } from 'react-i18next'
import Population from '../images/dices/population/Population1.jpg'
import Culture from '../images/dices/resources/Culture.jpg'
import Ingenuity from '../images/dices/resources/Ingenuity.jpg'
import Strength from '../images/dices/resources/Strength.jpg'
import Gold from '../images/tokens/coins/Coin5Head.png'

export const PayCardHeader = () => {
  const rules = useRules<AlongHistoryRules>()!
  const population = rules.remind<number>(Memory.PopulationCost)
  const resources = rules.remind<Resource[]>(Memory.ResourcesCost)
  const gold = rules.remind<Resource[]>(Memory.GoldCost)
  const playerName = usePlayerName(rules.game.rule?.player)
  const player = usePlayerId()

  let key = 'header.pay'
  if (resources.length && population && gold) key += '.choice'
  else if (gold) key += '.gold'
  else if (!resources.length) key += '.pop'
  else if (!population) key += '.resources'
  if (player === rules.game.rule?.player) key += '.you'

  return <Trans defaults={key} values={{ population, gold, player: playerName }}>
    <Picture src={Population} css={iconCss}/>
    <>{resources.map((resource, index) => <Picture key={index} src={ResourceImages[resource]} css={iconCss}/>)}</>
    <Picture src={Gold} css={iconCss}/>
  </Trans>
}

const ResourceImages: Record<Resource, string> = {
  [Resource.Culture]: Culture,
  [Resource.Ingenuity]: Ingenuity,
  [Resource.Strength]: Strength
}

const iconCss = css`
  height: 1.2em;
  width: 1.2em;
  vertical-align: bottom;
  border-radius: 50%;
`
