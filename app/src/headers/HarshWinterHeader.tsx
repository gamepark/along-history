/** @jsxImportSource @emotion/react */
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { CardId } from '@gamepark/along-history/material/cards/CardId'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { Memory } from '@gamepark/along-history/rules/Memory'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const HarshWinterHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<AlongHistoryRules>()!
  const activePlayer = rules.game.rule?.player
  const playerName = usePlayerName(activePlayer)
  const player = usePlayerId()
  const calamity = rules.material(MaterialType.Card).index(rules.remind(Memory.Calamity)).getItem<CardId>()?.id?.front
  const card = t(`card.name.${calamity}`)

  if (player === activePlayer) {
    return <>{t('header.skip-turn.you', { card })}</>
  } else {
    return <>{t('header.skip-turn', { card, player: playerName })}</>
  }
}
