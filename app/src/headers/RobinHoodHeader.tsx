/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { Memory } from '@gamepark/along-history/rules/Memory'
import { Picture, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import Coin5Head from '../images/tokens/coins/Coin5Head.png'

export const RobinHoodHeader = () => {
  const rules = useRules<AlongHistoryRules>()!
  const activePlayer = rules.game.rule!.player!
  const player = usePlayerId()
  if (player === activePlayer) {
    return <RobinHoodChoiceHeader/>
  } else {
    return <RobinHoodPlayerHeader/>
  }
}

const RobinHoodChoiceHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<AlongHistoryRules>()!
  const gold = rules.remind(Memory.GoldCost)
  if (!gold) {
    return <>{t('header.robin-hood.tie.you')}</>
  }
  return <Trans defaults="header.robin-hood.you" values={{ gold }}>
    <Picture src={Coin5Head} css={iconCss}/>
  </Trans>
}

const RobinHoodPlayerHeader = () => {
  const rules = useRules<AlongHistoryRules>()!
  const gold = rules.remind(Memory.GoldCost)
  const player = usePlayerName(rules.game.rule!.player!)
  return <Trans defaults={`header.robin-hood${!gold ? '.tie' : ''}`} values={{ player, gold }}>
    <Picture src={Coin5Head} css={iconCss}/>
  </Trans>
}

const iconCss = css`
  height: 1.2em;
  width: 1.2em;
  vertical-align: bottom;
  border-radius: 50%;
`