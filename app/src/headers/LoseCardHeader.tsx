/** @jsxImportSource @emotion/react */
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { CardId } from '@gamepark/along-history/material/cards/CardId'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { Memory } from '@gamepark/along-history/rules/Memory'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const LoseCardHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<AlongHistoryRules>()!
  const activePlayer = rules.game.rule?.player
  const playerName = usePlayerName(activePlayer)
  const player = usePlayerId()
  const calamity = rules.material(MaterialType.Card).index(rules.remind(Memory.Calamity)).getItem<CardId>()
  const card = t(`card.name.${calamity?.id?.front}`)

  if (player === activePlayer) {
    return <>{t('header.lose-card.you', { card })}</>
  } else {
    return <>{t('header.lose-card', { card, player: playerName })}</>
  }
}
