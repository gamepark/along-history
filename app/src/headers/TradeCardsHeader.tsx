/** @jsxImportSource @emotion/react */
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { CardId } from '@gamepark/along-history/material/cards/CardId'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const TradeCardsHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<AlongHistoryRules>()!
  const activePlayer = rules.game.rule?.player
  const playerName = usePlayerName(activePlayer)
  const player = usePlayerId()

  const selectedCard = rules.material(MaterialType.Card).selected(true).getItem<CardId>()
  if (player === activePlayer) {
    if (!selectedCard) {
      return <>{t('header.trade.you')}</>
    } else {
      return <>{t('header.trade.card.you', { card: t(`card.name.${selectedCard.id!.front}`) })}</>
    }
  } else {
    if (!selectedCard) {
      return <>{t('header.trade', { player: playerName })}</>
    } else {
      return <>{t('header.trade.card', { player: playerName, card: t(`card.name.${selectedCard.id!.front}`) })}</>
    }
  }
}
