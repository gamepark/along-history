/** @jsxImportSource @emotion/react */
import { AlongHistoryRules } from '@gamepark/along-history/AlongHistoryRules'
import { CardId } from '@gamepark/along-history/material/cards/CardId'
import { MaterialType } from '@gamepark/along-history/material/MaterialType'
import { CustomMoveType } from '@gamepark/along-history/rules/CustomMoveType'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const SwapHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<AlongHistoryRules>()!
  const activePlayer = rules.game.rule?.player
  const playerName = usePlayerName(activePlayer)
  const player = usePlayerId()
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))

  const selectedCard = rules.material(MaterialType.Card).selected(true).getItem<CardId>()!
  if (player === activePlayer) {
    return <Trans defaults="header.swap.you" values={{ card: t(`card.name.${selectedCard.id!.front}`) }}>
      <PlayMoveButton move={pass}/>
    </Trans>
  } else {
    return <>{t('header.swap', { player: playerName, card: t(`card.name.${selectedCard.id!.front}`) })}</>
  }
}
